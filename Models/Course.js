const { ObjectId } = require('bson');
const mongoose = require('mongoose');

//----------------------------------------------------------------Course
const courseSchema = new mongoose.Schema({
    Nombre: String,
    Codigo: String
})
courseSchema.findById = function (id) {
    return this.model('courses').find({ _id: id });
};
const Course = mongoose.model('courses', courseSchema);

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Course.find()
            .select({ "Nombre": 1, "Codigo": 1, _id: 1 })
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, course) {
                if (err) {
                    reject(err);
                } else {
                    resolve(course);
                }
            })
    });
};

exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Course.deleteOne({ _id: id }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
}

exports.insert = (cData) => {
    const c = new Course(cData);
    return c.save();
};

exports.patchCourse = (id, courseData) => {
    return Course.findOneAndUpdate({
        _id: id
    }, courseData);
};