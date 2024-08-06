// coursesController.js
const connection = require("../config/database");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const ErrorHandler = require("../utils/errorHandler");
const path = require('path')
const fs = require('fs');


const buildInsertQuery = (tableName, data) => {
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data)
    .map(() => "?")
    .join(", ");
  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
  return { query, values: Object.values(data) };
};

const buildUpdateQuery = (tableName, data, idColumn, idValue) => {
  const setClause = Object.keys(data)
    .map((column) => `${column}=?`)
    .join(", ");
  const query = `UPDATE ${tableName} SET ${setClause} WHERE ${idColumn}=?`;
  const values = [...Object.values(data), idValue];
  return { query, values };
};

// Create a new course
exports.createCourse = catchAsyncErrors(async (req, res, next) => {
  const courseData = req.body;

  // Check if a file is uploaded
  // if (!req.files || !req.files.course_image) {
  //   return next(new ErrorHandler("No file uploaded", 400));
  // }

  const file = req.files.course_image;

  // Validate file type and size if needed
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    return next(new ErrorHandler("Invalid file type", 400));
  }

  // Generate a unique name for the file
  const fileName = `${Date.now()}-${file.name}`;
 
  // Define the path to save the file
  const uploadPath = path.join(__dirname,'..', '..','frontend', 'public', 'courses', fileName);
  console.log(uploadPath);
  // Save the file to the specified directory
  file.mv(uploadPath, (err) => {
    if (err) {
      console.error("Error saving file: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }

    // Add the file name to the courseData
    courseData.course_image = fileName;

    // Build the insert query
    const { query, values } = buildInsertQuery("courses", courseData);

    // Insert the course data into the database
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error creating course: " + err.stack);
        return next(new ErrorHandler("Server Error", 500));
      }
      res.status(201).json({
        message: "Course created successfully",
        courseId: results.insertId,
      });
    });
  });
});


// Get all courses
exports.getAllCourses = catchAsyncErrors(async (req, res, next) => {
  const query = "SELECT * FROM courses";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching courses: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }
    res.status(200).json(results);
  });
});

// Get a single course by ID
exports.getCourseById = catchAsyncErrors(async (req, res, next) => {
  const courseId = req.params.id;
  const query = "SELECT * FROM courses WHERE course_id=?";

  connection.query(query, [courseId], (err, results) => {
    if (err) {
      console.error("Error fetching course: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }
    if (results.length === 0) {
      return next(new ErrorHandler("Course not found", 404));
    }
    res.status(200).json(results[0]);
  });
});

// Update a course
// exports.updateCourse = catchAsyncErrors(async (req, res, next) => {
//   const courseId = req.params.id;
//   const courseData = req.body;

//   const { query, values } = buildUpdateQuery(
//     "courses",
//     courseData,
//     "course_id",
//     courseId
//   );

//   connection.query(query, values, (err, results) => {
//     if (err) {
//       console.error("Error updating course: " + err.stack);
//       return next(new ErrorHandler("Server Error", 500));
//     }
//     res.status(200).json({ message: "Course updated successfully" });
//   });
// });


exports.updateCourse = catchAsyncErrors(async (req, res, next) => {
  const courseId = req.params.id;
  const courseData = req.body;

  // Check if a file is uploaded
  if (req.files && req.files.course_image) {
    const file = req.files.course_image;

    // Validate file type and size if needed
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return next(new ErrorHandler("Invalid file type", 400));
    }

    // Generate a unique name for the file
    const fileName = `${Date.now()}-${file.name}`;

    // Define the path to save the file
    const uploadPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'courses', fileName);
    console.log(uploadPath);

    // Save the file to the specified directory
    file.mv(uploadPath, (err) => {
      if (err) {
        console.error("Error saving file: " + err.stack);
        return next(new ErrorHandler("Server Error", 500));
      }

      // Add the file name to the courseData
      courseData.course_image = fileName;

      // Proceed with updating the course data in the database
      const { query, values } = buildUpdateQuery(
        "courses",
        courseData,
        "course_id",
        courseId
      );

      connection.query(query, values, (err, results) => {
        if (err) {
          console.error("Error updating course: " + err.stack);
          return next(new ErrorHandler("Server Error", 500));
        }
        res.status(200).json({ message: "Course updated successfully" });
      });
    });
  } else {
    // If no file is uploaded, proceed with updating the course data without changing the image
    const { query, values } = buildUpdateQuery(
      "courses",
      courseData,
      "course_id",
      courseId
    );

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error updating course: " + err.stack);
        return next(new ErrorHandler("Server Error", 500));
      }
      res.status(200).json({ message: "Course updated successfully" });
    });
  }
});

// Delete a course
exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const courseId = req.params.id;
  const query = "DELETE FROM courses WHERE course_id=?";

  connection.query(query, [courseId], (err, results) => {
    if (err) {
      console.error("Error deleting course: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }
    res.status(200).json({ message: "Course deleted successfully" });
  });
});
