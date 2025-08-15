"use strict";
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
    `;
    }
    buyCourse(course) {
        const courseIndex = manager.courses.findIndex((c) => c.courseId == course);
        if (courseIndex >= 0) {
            manager.courses[courseIndex].students++;
            this.purchasedCourses.push(course);
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
        return ``;
    }
}
class FreeCourse extends Course {
    getCertificate() {
        console.log(`
        Miễn phí, không có chứng chỉ.
        Chính sách hoàn tiền: Không có chính sách hoàn tiền.
        `);
    }
    getRefundPolicy() { }
}
class PaidCourse extends Course {
    getCertificate() { }
    getRefundPolicy() {
        console.log(`
        Phải trả phí, có cấp chứng chỉ.
        Chính sách hoàn tiền: Hoàn lại tiền nếu như thời gian học dưới 2 giờ.
        `);
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
        if (type == "free") {
            courseValue = new FreeCourse(courseName, coursePrice, courseDuration);
        }
        else {
            courseValue = new FreeCourse(courseName, coursePrice, courseDuration);
        }
        this.courses.push(courseValue);
    }
    createUser(name, email, phone) {
        this.users.push(new User(name, email, phone));
    }
    createNewDiscount(discountCode, discountValue) {
        const discountInput = {
            code: discountCode,
            Value: discountValue,
        };
        this.discounts.push(discountInput);
    }
    handleBuyCourse(userId, courseId) {
        const user = this.users.find((u) => u.id == userId);
        if (user) {
            return user.buyCourse(courseId);
        }
        return `Mua không thành công`;
    }
    handleRefundCourse(userId, courseId) {
        const user = this.users.find((u) => u.id == userId);
        if (user) {
            user.purchasedCourses;
        }
        return ``;
    }
    listCourses(numOfStudents) {
        for (let v of this.courses) {
            console.log(v);
        }
    }
    showUserInformation(email) {
        const userSearch = this.users.find((u) => u.email == email);
        console.log(userSearch);
    }
    calculateTotalRevenue() {
        const total = this.courses.reduce((t, p) => {
            return (t = p.price);
        }, 0);
        return total;
    }
    giftDiscount(userId, discountCode) { }
    getCertificate(userId) { }
    getRefundPolicy(courseId) { }
}
const manager = new CourseManager();
//1. Thêm người dùng.
manager.createUser("Nguyễn Văn A", "A14441@gmail.com", "09131313144");
manager.createUser("Nguyễn Pô", "Pô1100@gmail.com", "01134242424");
//2. Thêm khóa học.
manager.addCourse("free", "JS", 100000, 10);
manager.addCourse("paid", "HTML/CSS", 50000, 6);
//3. Thêm mã giảm giá.
manager.createNewDiscount("MUV40HANG", 10);
//4 . Mua khóa học.
console.log(manager.handleBuyCourse("U2", "KH1"));
//5. Hoàn tiền khóa học.
console.log(manager.handleRefundCourse("U3", "KH1"));
//6. Hiển thị danh sách khóa học (sử dụng map).
manager.listCourses(1);
//7. Hiển thị thông tin người dùng (sử dụng find).
manager.showUserInformation("Pô1100@gmail.com");
//8. Tính tổng doanh thu từ các khóa học đã bán (sử dụng reduce).
console.log(manager.calculateTotalRevenue());
//9. Tặng mã giảm giá cho người dùng (sử dụng find).
//10. Hiển thị toàn bộ chứng chỉ của người dùng (sử dụng find).
//11. Hiển thị chính sách hoàn tiền (sử dụng find).
//12. Thoát
console.log("Thoát chương trình");
