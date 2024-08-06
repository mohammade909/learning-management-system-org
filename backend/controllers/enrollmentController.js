const db = require("../config/database");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");

exports.getAllEnrollments = catchAsyncErrors(async (req, res, next) => {
  const [enrollments] = await db.query("SELECT * FROM enrollments");
  res.json(enrollments);
});

exports.getEnrollmentById = catchAsyncErrors(async (req, res, next) => {
  const [enrollment] = await db.query(
    "SELECT * FROM enrollments WHERE child_id = ?",
    [req.params.id]
  );
  if (enrollment.length === 0) {
    return next(new ErrorHandler("Enrollment not found", 404));
  }
  res.json(enrollment[0]);
});

exports.createEnrollment = catchAsyncErrors(async (req, res, next) => {
  const { course_id, child_id } = req.body;
  const [result] = await db.query(
    "INSERT INTO enrollments (course_id, child_id) VALUES (?, ?)",
    [course_id, child_id]
  );
  res.status(201).json({ enrollment_id: result.insertId });
});

exports.updateEnrollment = catchAsyncErrors(async (req, res, next) => {
  const { course_id, child_id } = req.body;
  const [result] = await db.query(
    "UPDATE enrollments SET course_id = ?, child_id = ? WHERE enrollment_id = ?",
    [course_id, child_id, req.params.id]
  );
  if (result.affectedRows === 0) {
    return next(new ErrorHandler("Enrollment not found", 404));
  }
  res.json({ message: "Enrollment updated successfully" });
});

exports.deleteEnrollment = catchAsyncErrors(async (req, res, next) => {
  const [result] = await db.query(
    "DELETE FROM enrollments WHERE enrollment_id = ?",
    [req.params.id]
  );
  if (result.affectedRows === 0) {
    return next(new ErrorHandler("Enrollment not found", 404));
  }
  res.json({ message: "Enrollment deleted successfully" });
});

exports.getEnrollmentCourseFeeDetailsByChildId = catchAsyncErrors(
  async (req, res, next) => {
    const child_id = req.params.user_id;

    // Fetch data based on child_id
    const [results] = await db.query(
      `
    SELECT
      e.enrollment_id,
      e.course_id,
      e.child_id,
      e.enrollment_date,
      f.fee_id,
      f.fee_amount,
      f.due,
      f.paid,
      c.course_name,
      c.course_code,
      c.course_type,
      c.course_duration,
      c.course_price,
      c.course_description,
      c.course_image,
      c.course_category,
      c.course_level,
      c.course_language,
      c.course_author,
      c.course_status,
      c.course_video,
      c.course_pdf,
      c.course_video_url,
      c.course_pdf_url,
      ch.date_of_birth,
      ch.grade_level,
      p.parent_id,
      p.phone_number,
      p.address
    FROM
      enrollments e
    JOIN
      courses c ON e.course_id = c.course_id
    JOIN
      fees f ON e.course_id = f.course_id AND e.child_id = f.child_id
    JOIN
      children ch ON e.child_id = ch.child_id
    JOIN
      parents p ON ch.parent_id = p.parent_id
    WHERE
      e.child_id = ?
  `,
      [child_id]
    );

    if (results.length === 0) {
      return next(
        new ErrorHandler("No data found for the given child_id", 404)
      );
    }

    res.json(results);
  }
);


// exports.getChildReport = catchAsyncErrors(async (req, res, next) => {
//   const { child_id } = req.params;
//   console.log(child_id);
//   if (!child_id) {
//     return res.status(400).json({ message: "child_id is required" });
//   }

//   const feesQuery = `SELECT * FROM fees WHERE child_id = ${child_id}`;
//   const coursesQuery = `
//     SELECT courses.* 
//     FROM courses 
//     JOIN fees ON courses.course_id = fees.course_id 
//     WHERE fees.child_id = ?`;
//   const enrollmentsQuery = `SELECT * FROM enrollments WHERE child_id = ?`;

//   try {
//     // Function to wrap db.query in a promise
//     const queryAsync = (query, params) => {
//       return new Promise((resolve, reject) => {
//         db.query(query, params, (err, results) => {
//           if (err) reject(err);
//           else resolve(results);
//         });
//       });
//     };

//     // Fetch results using promises
//     const [feesResults, coursesResults, enrollmentsResults] = await Promise.all([
//       queryAsync(feesQuery, [child_id]),
//       queryAsync(coursesQuery, [child_id]),
//       queryAsync(enrollmentsQuery, [child_id])
//     ]);

//     return res.json({
//       fees: feesResults,
//       courses: coursesResults,
//       enrollments: enrollmentsResults,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "An error occurred", error });
//   }
// });

// exports.getChildReport = catchAsyncErrors(async (req, res, next) => {
//   const { child_id } = req.params;
//   console.log(child_id);
//   if (!child_id) {
//     return res.status(400).json({ message: "child_id is required" });
//   }

//   const query = `
//     SELECT 
//       enrollments.enrollment_id,
//       enrollments.enrollment_date,
//       enrollments.child_id AS enrollment_child_id,
//       courses.course_id,
//       courses.instructor_id,
//       courses.course_name,
//       courses.course_code,
//       courses.course_type,
//       courses.course_duration,
//       courses.course_price,
//       courses.course_description,
//       courses.course_image,
//       courses.course_category,
//       courses.course_level,
//       courses.course_language,
//       courses.course_author,
//       courses.course_status,
//       courses.course_video,
//       courses.course_pdf,
//       courses.course_video_url,
//       courses.course_pdf_url,
//       courses.created_at AS course_created_at,
//       fees.fee_id,
//       fees.child_id AS fee_child_id,
//       fees.fee_amount,
//       fees.due,
//       fees.paid,
//       fees.status,
//       fees.payment_date,
//       fees.payment_method,
//       fees.created_at AS fee_created_at,
//       fees.updated_at AS fee_updated_at
//     FROM enrollments
//     JOIN courses ON enrollments.course_id = courses.course_id
//     JOIN fees ON enrollments.course_id = fees.course_id
//     WHERE enrollments.child_id = ? AND fees.child_id = ?
//   `;

//   try {
//     const queryAsync = (query, params) => {
//       return new Promise((resolve, reject) => {
//         db.query(query, params, (err, results) => {
//           if (err) reject(err);
//           else resolve(results);
//         });
//       });
//     };

//     const results = await queryAsync(query, [child_id, child_id]);

//     // Process the results into the desired structure
//     const processedResults = results.map(result => ({
//       course: {
//         course_id: result.course_id,
//         instructor_id: result.instructor_id,
//         course_name: result.course_name,
//         course_code: result.course_code,
//         course_type: result.course_type,
//         course_duration: result.course_duration,
//         course_price: result.course_price,
//         course_description: result.course_description,
//         course_image: result.course_image,
//         course_category: result.course_category,
//         course_level: result.course_level,
//         course_language: result.course_language,
//         course_author: result.course_author,
//         course_status: result.course_status,
//         course_video: result.course_video,
//         course_pdf: result.course_pdf,
//         course_video_url: result.course_video_url,
//         course_pdf_url: result.course_pdf_url,
//         created_at: result.course_created_at,
//       },
//       fee: {
//         fee_id: result.fee_id,
//         child_id: result.fee_child_id,
//         course_id: result.course_id,
//         fee_amount: result.fee_amount,
//         due: result.due,
//         paid: result.paid,
//         status: result.status,
//         payment_date: result.payment_date,
//         payment_method: result.payment_method,
//         created_at: result.fee_created_at,
//         updated_at: result.fee_updated_at,
//       },
//       enrollment: {
//         enrollment_id: result.enrollment_id,
//         course_id: result.course_id,
//         child_id: result.enrollment_child_id,
//         enrollment_date: result.enrollment_date,
//       }
//     }));

//     return res.json({
//       courses: processedResults,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "An error occurred", error });
//   }
// });

exports.getChildReport = catchAsyncErrors(async (req, res, next) => {
  const { child_id } = req.params;
  console.log(child_id);
  if (!child_id) {
    return res.status(400).json({ message: "child_id is required" });
  }

  const query = `
    SELECT 
      enrollments.enrollment_id,
      enrollments.enrollment_date,
      enrollments.child_id AS enrollment_child_id,
      courses.course_id,
      courses.instructor_id,
      courses.course_name,
      courses.course_code,
      courses.course_type,
      courses.course_duration,
      courses.course_price,
      courses.course_description,
      courses.course_image,
      courses.course_category,
      courses.course_level,
      courses.course_language,
      courses.course_author,
      courses.course_status,
      courses.course_video,
      courses.course_pdf,
      courses.course_video_url,
      courses.course_pdf_url,
      courses.created_at AS course_created_at,
      fees.fee_id,
      fees.child_id AS fee_child_id,
      fees.fee_amount,
      fees.due,
      fees.paid,
      fees.status,
      fees.payment_date,
      fees.payment_method,
      fees.created_at AS fee_created_at,
      fees.updated_at AS fee_updated_at
    FROM enrollments
    JOIN courses ON enrollments.course_id = courses.course_id
    JOIN fees ON enrollments.course_id = fees.course_id
    WHERE enrollments.child_id = ? AND fees.child_id = ?
  `;

  try {
    const queryAsync = (query, params) => {
      return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
    };

    const results = await queryAsync(query, [child_id, child_id]);

    // Process the results into the desired structure
    const processedResults = results.reduce((acc, curr) => {
      // Find if the course and enrollment already exist in the accumulator
      const courseEnrollment = acc.find(item => item.course.course_id === curr.course_id && item.enrollment.enrollment_id === curr.enrollment_id);

      if (courseEnrollment) {
        // If the course and enrollment exist, add the fee to the existing fees array
        courseEnrollment.fees.push({
          fee_id: curr.fee_id,
          child_id: curr.fee_child_id,
          course_id: curr.course_id,
          fee_amount: curr.fee_amount,
          due: curr.due,
          paid: curr.paid,
          status: curr.status,
          payment_date: curr.payment_date,
          payment_method: curr.payment_method,
          created_at: curr.fee_created_at,
          updated_at: curr.fee_updated_at,
        });
      } else {
        // If the course and enrollment do not exist, create a new entry
        acc.push({
          course: {
            course_id: curr.course_id,
            instructor_id: curr.instructor_id,
            course_name: curr.course_name,
            course_code: curr.course_code,
            course_type: curr.course_type,
            course_duration: curr.course_duration,
            course_price: curr.course_price,
            course_description: curr.course_description,
            course_image: curr.course_image,
            course_category: curr.course_category,
            course_level: curr.course_level,
            course_language: curr.course_language,
            course_author: curr.course_author,
            course_status: curr.course_status,
            course_video: curr.course_video,
            course_pdf: curr.course_pdf,
            course_video_url: curr.course_video_url,
            course_pdf_url: curr.course_pdf_url,
            created_at: curr.course_created_at,
          },
          enrollment: {
            enrollment_id: curr.enrollment_id,
            course_id: curr.course_id,
            child_id: curr.enrollment_child_id,
            enrollment_date: curr.enrollment_date,
          },
          fees: [
            {
              fee_id: curr.fee_id,
              child_id: curr.fee_child_id,
              course_id: curr.course_id,
              fee_amount: curr.fee_amount,
              due: curr.due,
              paid: curr.paid,
              status: curr.status,
              payment_date: curr.payment_date,
              payment_method: curr.payment_method,
              created_at: curr.fee_created_at,
              updated_at: curr.fee_updated_at,
            }
          ]
        });
      }

      return acc;
    }, []);

    return res.json({
      courses: processedResults,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred", error });
  }
});

