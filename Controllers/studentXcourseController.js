const StudentXCourse = require('../Models/StudentXCourse');
const Student = require('../Models/Student');


exports.list = async (req, res) => {

    const studentsIds = await StudentXCourse.list(req.params.courseId, 30, 0)
    var students = []
    for (let index = 0; index < studentsIds.length; index++) {
        await Student.findById(studentsIds[index].Estudiante, 30, 0).then((result1) => {
            students.push(result1[0])
        });
    }
    res.status(200).send(students);

};

exports.deletebyCourse = (req, res) => {
    StudentXCourse.removeByCourse(req.params.courseId).then((result) => {
        res.status(200).send({});
    });
};
exports.deletebyStudent = (req, res) => {
    StudentXCourse.removeByStudent(req.params.studentId, req.params.courseId).then((result) => {
        res.status(200).send({});
    });
};
/*exports.insert = (req, res) => {
    StudentXCourse.insert(req.body)
        .then((result) => {
            res.status(201).send({ g: result.body });
        });
};*/
exports.insert = (req, res) => {
    console.log(req.body);
    StudentXCourse.insert({ Estudiante: req.body.studentId, Curso: req.body.courseId })
        .then((result) => {
            res.status(201).send({ g: result.body });
        })
}