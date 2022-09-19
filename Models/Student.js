const { ObjectId } = require('bson');
const mongoose = require('mongoose');

//----------------------------------------------------------------Student
const studentSchema = new mongoose.Schema({
    Nombre: String,
    Carnet: String
}, { versionKey: false });

studentSchema.findById = function (id) {
    return this.model('students').find({ _id: id });
};

//modelo
const Student = mongoose.model('students', studentSchema);

exports.findById = (studentId, perPage, page) => {
    return new Promise((resolve, reject) => {
        Student.find({ _id: studentId })
            .select({ "Nombre": 1, _id: 1 })
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, student) {
                if (err) {
                    reject(err);
                } else {
                    resolve(student);
                }
            })
    });
};
exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Student.find()
            .select({ "Nombre": 1, Carnet: 1, _id: 1 })
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, student) {
                if (err) {
                    reject(err);
                } else {
                    resolve(student);
                }
            })
    });
};

exports.removeById = (id) => {
    console.log(id);
    return new Promise((resolve, reject) => {
        Student.deleteOne({ _id: id }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
}

exports.insert = (cData) => {
    const c = new Student(cData);
    return c.save();
};

exports.patchStudent = (id, studentData) => {
    return Student.findOneAndUpdate({
        _id: id
    }, studentData);
};