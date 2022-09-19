const Student = require('../Models/Student');

exports.list = (req, res) => {
    Student.list(30, 0)
        .then((result) => {
            console.log(result);
            res.status(200).send(result);
        })
};

exports.deleteStudentbyId = (req, res) => {
    Student.removeById(req.params.studentId).then((result) => {
        res.status(200).send({});
    });
};
exports.insert = (req, res) => {
    Student.insert(req.body)
        .then((result) => {
            res.status(201).send({ g: result.body });
        });
};
exports.patchStudent = (req, res) => {
    Student.patchStudent(req.params.studentId, req.body).then((result) => {
        res.status(200).send({});
    });
};