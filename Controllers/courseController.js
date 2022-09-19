const Course = require('../Models/Course');

exports.list = (req, res) => {
    Course.list(30, 0)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.deleteCoursebyId = (req, res) => {
    Course.removeById(req.params.userId).then((result) => {
        res.status(200).send({});
    });
};
exports.insert = (req, res) => {
    Course.insert(req.body)
        .then((result) => {
            res.status(201).send({ g: result.body });
        });
};
exports.patchCourse = (req, res) => {
    Course.patchCourse(req.params.courseId, req.body).then((result) => {
        res.status(200).send({});
    });
};