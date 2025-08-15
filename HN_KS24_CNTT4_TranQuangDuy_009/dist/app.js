let idUser = 1;
let idCourse = 1;
class User {
    constructor(name, email, phone) {
        this.id = "U" + idUser++;
        this.purchasedCourses = [];
        this.discounts = [];
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    getDetails() {
        return `
        ID: ${this.id}
        Name: ${this.name}
        Email: ${this.email}
        Phone: ${this.phone}
        Purchased: ${this.purchasedCourses.join(", ") || "None"}
        Discounts: ${this.discounts.join(", ") || "None"}
    `;
    }
    buyCourse(courseId) {
        const courseIndex = manager.courses.findIndex((c) => c.courseId === courseId);
        if (courseIndex >= 0) {
            manager.courses[courseIndex].students++;
            this.purchasedCourses.push(courseId);
            return `Mua thành công`;
        }
        return `Mua không thành công`;
    }
}
class Course {
    constructor(courseName, price, duration) {
        this.courseId = "KH" + idCourse++;
        this.students = 0;
        this.courseName = courseName;
        this.price = price;
        this.duration = duration;
    }
    displayCourse() {
        return `
        ID: ${this.courseId}
        Name: ${this.courseName}
        Price: ${this.price}
        Duration: ${this.duration}
        Students: ${this.students}
    `;
    }
    getCourse(discount) {
        let finalPrice = this.price;
        if (discount) {
            finalPrice = this.price - (this.price * discount) / 100;
        }
        return `Khóa học: ${this.courseName}, Giá sau giảm: ${finalPrice}`;
    }
}
class FreeCourse extends Course {
    getCertificate() {
        console.log(`Miễn phí, không có chứng chỉ.`);
    }
    getRefundPolicy() {
        console.log(`Không có chính sách hoàn tiền.`);
    }
}
class PaidCourse extends Course {
    getCertificate() {
        console.log(`Khóa học ${this.courseName} có cấp chứng chỉ khi hoàn thành.`);
    }
    getRefundPolicy() {
        console.log(`Hoàn lại tiền nếu thời gian học dưới 2 giờ.`);
    }
}
class CourseManager {
    constructor() {
        this.courses = [];
        this.users = [];
        this.discounts = [];
    }
    addCourse(type, courseName, coursePrice, courseDuration) {
        let courseValue;
        if (type === "free") {
            courseValue = new FreeCourse(courseName, 0, courseDuration);
        }
        else {
            courseValue = new PaidCourse(courseName, coursePrice, courseDuration);
        }
        this.courses.push(courseValue);
    }
    createUser(name, email, phone) {
        this.users.push(new User(name, email, phone));
    }
    createNewDiscount(discountCode, discountValue) {
        const discountInput = { code: discountCode, value: discountValue };
        this.discounts.push(discountInput);
    }
    handleBuyCourse(userId, courseId) {
        const user = this.users.find((u) => u.id === userId);
        if (user) {
            return user.buyCourse(courseId);
        }
        return `Mua không thành công`;
    }
    handleRefundCourse(userId, courseId) {
        const user = this.users.find((u) => u.id === userId);
        if (user) {
            const idx = user.purchasedCourses.indexOf(courseId);
            if (idx >= 0) {
                user.purchasedCourses.splice(idx, 1);
                const course = this.courses.find((c) => c.courseId === courseId);
                if (course)
                    course.students--;
                return `Hoàn tiền thành công cho khóa ${courseId}`;
            }
        }
        return `Không tìm thấy khóa học để hoàn tiền`;
    }
    listCourses(numOfStudents) {
        this.courses
            .filter((c) => (numOfStudents ? c.students >= numOfStudents : true))
            .forEach((c) => console.log(c.displayCourse()));
    }
    showUserInformation(email) {
        const userSearch = this.users.find((u) => u.email === email);
        console.log((userSearch === null || userSearch === void 0 ? void 0 : userSearch.getDetails()) || "Không tìm thấy người dùng");
    }
    calculateTotalRevenue() {
        return this.courses.reduce((total, course) => {
            if (course instanceof PaidCourse) {
                total += course.students * course.price;
            }
            return total;
        }, 0);
    }
}
const manager = new CourseManager();
// 1. Thêm người dùng
manager.createUser("Nguyễn Văn A", "A14441@gmail.com", "09131313144");
manager.createUser("Nguyễn Pô", "Pô1100@gmail.com", "01134242424");
// 2. Thêm khóa học
manager.addCourse("free", "JS", 100000, 10);
manager.addCourse("paid", "HTML/CSS", 50000, 6);
// 3. Thêm mã giảm giá
manager.createNewDiscount("MUV40HANG", 10);
// 4. Mua khóa học
console.log(manager.handleBuyCourse("U2", "KH1"));
// 5. Hoàn tiền khóa học
console.log(manager.handleRefundCourse("U2", "KH1"));
// 6. Hiển thị danh sách khóa học
manager.listCourses(0);
// 7. Hiển thị thông tin người dùng
manager.showUserInformation("Pô1100@gmail.com");
// 8. Tính tổng doanh thu
console.log("Tổng doanh thu:", manager.calculateTotalRevenue());
console.log("Thoát chương trình");
