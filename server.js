const express = require('express');

const app = express();
const PORT = 3000;
// TASK-1//


app.use(express.json());

// TASK-2//

let students = [];


app.post('/api/students', (req, res) => {

    const { id, name, email, course, age } = req.body;


    if (
        id === undefined || id === null ||
        name === undefined || typeof name !== 'string' || !name.trim() ||
        email === undefined || typeof email !== 'string' || !email.trim() ||
        course === undefined || typeof course !== 'string' || !course.trim() ||
        age === undefined || age === null || age === ''
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    
    const existingStudent = students.find(student => student.id === id);

    if (existingStudent) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    
    const student = {
        id,
        name,
        email,
        course,
        age
    };

    
    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student: student
    });

});
// TASK 3: RETRIEVE STUDENT RECORDS

app.get('/api/students', (req, res) => {

    res.status(200).json({
        message: "All student records retrieved successfully",
        students: students
    });

});


app.get('/api/students/:id', (req, res) => {

    const studentId = Number(req.params.id);

    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json({
        message: "Student record retrieved successfully",
        student: student
    });

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});