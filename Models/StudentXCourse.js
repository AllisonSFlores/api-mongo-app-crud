const mongoose = require('mongoose');

//----------------------------------------------------------------Course
const studentXCourseSchema = new mongoose.Schema({
    Estudiante: String,
    Curso: String
})
studentXCourseSchema.findById = function (id) {
    return this.model('studentXcourse').find({ _id: id });
};
const StudentXCourseSchema = mongoose.model('studentXcourse', studentXCourseSchema);

exports.list = function (courseId, perPage, page) {
    return new Promise((resolve, reject) => {
        StudentXCourseSchema.find({ Curso: courseId })
            .select({ "Estudiante": 1, _id: 1 })
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, course) {
                if (err) {
                    reject(err);
                } else {
                    resolve(course);
                }
            })


    })
};

exports.removeByStudent = (studentId, courseId) => {
    return new Promise((resolve, reject) => {
        StudentXCourseSchema.deleteOne({ Estudiante: studentId, Curso: courseId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
}

exports.removeByCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        StudentXCourseSchema.deleteOne({ Curso: courseId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
}

exports.insert = (data) => {
    const r = new StudentXCourseSchema(data);
    return r.save();
};