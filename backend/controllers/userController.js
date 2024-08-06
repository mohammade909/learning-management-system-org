const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const bcrypt = require('bcrypt')
const dotenv = require("dotenv");
const db = require("../config/database");

dotenv.config();



const generateUniqueChildId = async () => {
  const prefix = 'STU';
  const digits = 6;
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    const randomNumber = Math.floor(Math.random() * 10 ** digits).toString().padStart(digits, '0');
    uniqueId = `${prefix}${randomNumber}`;

    // Check if the generated ID already exists in the `children` table
    const query = `SELECT COUNT(*) AS count FROM children WHERE _id = ?`;
    const [result] = await executeQuery(query, [uniqueId]);
    if (result.count === 0) {
      isUnique = true;
    }
  }

  return uniqueId;
};

const generateUniqueUsername = async (baseUsername) => {
  let username = baseUsername;
  let isUnique = false;
  let counter = 1;

  while (!isUnique) {
    const query = `SELECT COUNT(*) AS count FROM users WHERE username = ?`;
    const result = await executeQuery(query, [username]);
    const count = result[0].count;

    if (count === 0) {
      isUnique = true;
    } else {
      username = `${baseUsername}${counter}`;
      counter++;
    }
  }

  return username;
};

exports.addUser = catchAsyncErrors(async (request, response, next) => {
  const {
    username: baseUsername,
    email,
    first_name,
    last_name,
    user_type,
    password,
    parent_id,
    date_of_birth,
    grade_level,
    phone_number,
    address,
    department,
    qualifications,
    course_id,
    course_amount,
    fee_deposit
  } = request.body;
  console.log(user_type);
  try {
    const username = await generateUniqueUsername(baseUsername);

    const finalUserData = { 
      username, 
      email, 
      first_name, 
      last_name, 
      user_type, 
      password
    };
    const columns = Object.keys(finalUserData).join(", ");
    const placeholders = Object.keys(finalUserData)
      .map(() => "?")
      .join(", ");
    const values = Object.values(finalUserData);

    const query = `INSERT INTO users (${columns}) VALUES (${placeholders})`;
    const rows = await executeQuery(query, values);

    if (rows.affectedRows === 1) {
      const newUserId = rows.insertId;

      switch (user_type) {
        case 'parent':
          await executeQuery(
            `INSERT INTO parents (parent_id, phone_number, address) VALUES (?, ?, ?)`,
            [newUserId, phone_number, address]
          );
          break;
        case 'child':
          // Check if parent_id exists in users table
          const parentExists = await executeQuery(
            `SELECT user_id FROM users WHERE user_id = ?`,
            [parent_id]
          );

          if (parentExists.length === 0) {
            return response.status(400).json({ message: "Parent ID does not exist" });
          }

          const uniqueChildId = await generateUniqueChildId();
          await executeQuery(
            `INSERT INTO children (child_id, parent_id, date_of_birth, grade_level, _id) VALUES (?, ?, ?, ?, ?)`,
            [newUserId, parent_id, date_of_birth, grade_level, uniqueChildId]
          );
          // Insert into enrollments table
          await executeQuery(
            `INSERT INTO enrollments (course_id, child_id) VALUES (?, ?)`,
            [course_id, newUserId]
          );
          // Insert into fees table
          await executeQuery(
            `INSERT INTO fees (child_id, course_id, fee_amount, paid) VALUES (?, ?, ?, ?)`,
            [newUserId, course_id, course_amount, fee_deposit] // Initial paid amount is 0
          );
          break; 
        case 'instructor':
          await executeQuery(
            `INSERT INTO instructors (instructor_id, department, qualifications) VALUES (?, ?, ?)`,
            [newUserId, department, qualifications]
          );
          break;
        case 'admin':
          await executeQuery(
            `INSERT INTO instructors (instructor_id, department, qualifications) VALUES (?, ?, ?)`,
            [newUserId, department, qualifications]
          );
          break;
        default:
          return response.status(400).json({ message: "Invalid user type" });
      }

      return response
        .status(201)
        .json({ message: "User registered successfully" });
    } else {
      return response.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    console.error(error);

    if (error.code === 'ER_DUP_ENTRY') {
      return response.status(400).json({ message: "Username or email already exists" });
    }

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return response.status(400).json({ message: "Parent ID does not exist or is invalid" });
    }

    response.status(500).json({ message: "Internal server error" });
  }
});
// const executeQuery = (query, values) => {
//   return new Promise((resolve, reject) => {
//     db.query(query, values, (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

exports.getUsers = catchAsyncErrors(async (req, res, next) => {
  const { user_type } = req.query;
  let query = "";
  let values = [];

  if (user_type === 'child') {
    query = `
      SELECT u.*, c.*
      FROM users u
      LEFT JOIN children c ON u.user_id = c.child_id
      WHERE u.user_type = ?
    `;
    values.push(user_type);
  } else if (user_type === 'parent') {
    query = `
      SELECT u.*, p.*
      FROM users u
      LEFT JOIN parents p ON u.user_id = p.parent_id
      WHERE u.user_type = ?
    `;
    values.push(user_type);
  } else if (user_type === 'instructor' || user_type === 'admin') {
    query = `
      SELECT u.*, i.*
      FROM users u
      LEFT JOIN instructors i ON u.user_id = i.instructor_id
      WHERE u.user_type = ?
    `;
    values.push(user_type);
  } else if (user_type) {
    query = "SELECT * FROM users WHERE user_type = ?";
    values.push(user_type);
  } else {
    query = "SELECT * FROM users";
  }

  try {
    const users = await executeQuery(query, values);
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Utility function to execute a query and return a promise
const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};


 // Your async error handler
 
exports.getAllAttendances = catchAsyncErrors(async (req, res, next) => {
  const query = 'SELECT * FROM attendance';
  console.log("hellloooo");
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});
// Mark attendance
// Your async error handler

// Mark Attendance
exports.markAttendance = catchAsyncErrors(async (req, res, next) => {
  const { user_id, date, status, reason } = req.body;
  console.log(req.body);
  if (!user_id || !date || !status) {
    return res.status(400).json({ message: 'User ID, date, and status are required' });
  }

  // Check if attendance record already exists
  const checkQuery = 'SELECT * FROM attendance WHERE user_id = ? AND date = ?';
  const checkValues = [user_id, date];

  db.query(checkQuery, checkValues, (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (checkResults.length > 0) {
      // Record exists, remove it
      const deleteQuery = 'DELETE FROM attendance WHERE user_id = ? AND date = ?';
      db.query(deleteQuery, checkValues, (deleteErr, deleteResults) => {
        if (deleteErr) {
          console.error(deleteErr);
          return res.status(500).json({ message: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Attendance record removed successfully' });
      });
    } else {
      // Record does not exist, insert it
      const insertQuery = 'INSERT INTO attendance (user_id, date, status, reason) VALUES (?, ?, ?, ?)';
      const insertValues = [user_id, date, status, reason || null];
      
      db.query(insertQuery, insertValues, (insertErr, insertResults) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ message: 'Internal server error' });
        }
        return res.status(201).json({ message: 'Attendance marked successfully' });
      });
    }
  });
});


// Request leave
exports.requestLeave = catchAsyncErrors(async (req, res, next) => {
  const { user_id, start_date, end_date, reason } = req.body;

  if (!user_id || !start_date || !end_date || !reason) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO leave_requests (user_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)';
  const values = [user_id, start_date, end_date, reason];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ message: 'Leave requested successfully' });
  });
});

// Approve leave request
exports.approveLeave = catchAsyncErrors(async (req, res, next) => {
  const { leave_id } = req.body;

  if (!leave_id) {
    return res.status(400).json({ message: 'Leave ID is required' });
  }

  const query = 'UPDATE leave_requests SET status = ? WHERE leave_id = ?';
  const values = ['approved', leave_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: 'Leave request approved successfully' });
  });
});

// Decline leave request
exports.declineLeave = catchAsyncErrors(async (req, res, next) => {
  const { leave_id } = req.body;

  if (!leave_id) {
    return res.status(400).json({ message: 'Leave ID is required' });
  }

  const query = 'UPDATE leave_requests SET status = ? WHERE leave_id = ?';
  const values = ['declined', leave_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: 'Leave request declined successfully' });
  });
});


exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
  console.log("hi")
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const query = "DELETE FROM users WHERE user_id = ?";
  const values = [userId];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  });
});

// exports.updateUser = catchAsyncErrors(async (req, res, next) => {
//   const { userId } = req.params;
//   const updates = req.body;

//   if (!userId) {
//     return res.status(400).json({ message: "User ID is required" });
//   }

//   const allowedFields = ["username", "first_name", "last_name", "date_of_birth", "grade_level", "email", "password","parent_id"];
//   const fieldsToUpdate = Object.keys(updates).filter(field => allowedFields.includes(field));
  
//   if (fieldsToUpdate.length === 0) {
//     return res.status(400).json({ message: "No valid fields to update" });
//   }

//   const query = `UPDATE users SET ${fieldsToUpdate.map(field => `${field} = ?`).join(", ")} WHERE user_id = ?`;
//   const values = [...fieldsToUpdate.map(field => updates[field]), userId];

//   db.query(query, values, (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ success: true, message: "User updated successfully" });
//   });
// });
exports.getUserById = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const query = "SELECT * FROM users WHERE user_id = ?";
  const values = [userId];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    const user_type = user.user_type;

    let additionalQuery;
    let additionalValues;

    switch (user_type) {
      case 'parent':
        additionalQuery = "SELECT phone_number, address FROM parents WHERE parent_id = ?";
        additionalValues = [userId];
        break;
      case 'child':
        additionalQuery = "SELECT parent_id, date_of_birth, grade_level FROM children WHERE child_id = ?";
        additionalValues = [userId];
        break;
      case 'instructor':
      case 'admin':
        additionalQuery = "SELECT department, qualifications FROM instructors WHERE instructor_id = ?";
        additionalValues = [userId];
        break;
      default:
        return res.status(400).json({ message: "Invalid user type" });
    }

    db.query(additionalQuery, additionalValues, (err, additionalResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (additionalResults.length > 0) {
        Object.assign(user, additionalResults[0]);
      }

      res.status(200).json({ success: true, user });
    });
  });
});

exports.updateUser = catchAsyncErrors(async (request, response, next) => {
  const {
    username,
    email,
    first_name,
    last_name,
    user_type,
    password,
    parent_id,
    date_of_birth,
    grade_level,
    phone_number,
    address,
    department,
    qualifications
  } = request.body;

  const userId = request.params.userId;
  if (!userId) {
    return response.status(400).json({ message: "User ID is required" });
  }

  try {
    let updatePasswordQuery = "";
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updatePasswordQuery = `, password = '${hashedPassword}'`;
    }

    const updateUserData = { 
      username, 
      email, 
      first_name, 
      last_name, 
      user_type
    };

    // Filter out empty values
    const filteredUpdateUserData = Object.fromEntries(
      Object.entries(updateUserData).filter(([_, value]) => value !== '')
    );

    const setClause = Object.keys(filteredUpdateUserData)
      .map(key => `${key} = ?`)
      .join(", ");

    const values = Object.values(filteredUpdateUserData);

    const query = `UPDATE users SET ${setClause}${updatePasswordQuery} WHERE user_id = ?`;

    const executeQuery = (query, values) => {
      return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    };

    values.push(userId);

    const rows = await executeQuery(query, values);

    if (rows.affectedRows === 1) {
      switch (user_type) {
        case 'parent':
          const parentUpdateData = { phone_number, address };
          const filteredParentData = Object.fromEntries(
            Object.entries(parentUpdateData).filter(([_, value]) => value !== '')
          );

          if (Object.keys(filteredParentData).length > 0) {
            const parentSetClause = Object.keys(filteredParentData)
              .map(key => `${key} = ?`)
              .join(", ");

            const parentValues = Object.values(filteredParentData);
            parentValues.push(userId);

            await executeQuery(
              `UPDATE parents SET ${parentSetClause} WHERE parent_id = ?`,
              parentValues
            );
          }
          break;
        case 'child':
          const childUpdateData = { parent_id, date_of_birth, grade_level };
          const filteredChildData = Object.fromEntries(
            Object.entries(childUpdateData).filter(([_, value]) => value !== '')
          );

          if (Object.keys(filteredChildData).length > 0) {
            const childSetClause = Object.keys(filteredChildData)
              .map(key => `${key} = ?`)
              .join(", ");

            const childValues = Object.values(filteredChildData);
            childValues.push(userId);

            await executeQuery(
              `UPDATE children SET ${childSetClause} WHERE child_id = ?`,
              childValues
            );
          }
          break;
        case 'instructor':
        case 'admin':
          const instructorUpdateData = { department, qualifications };
          const filteredInstructorData = Object.fromEntries(
            Object.entries(instructorUpdateData).filter(([_, value]) => value !== '')
          );

          if (Object.keys(filteredInstructorData).length > 0) {
            const instructorSetClause = Object.keys(filteredInstructorData)
              .map(key => `${key} = ?`)
              .join(", ");

            const instructorValues = Object.values(filteredInstructorData);
            instructorValues.push(userId);

            await executeQuery(
              `UPDATE instructors SET ${instructorSetClause} WHERE instructor_id = ?`,
              instructorValues
            );
          }
          break;
        default:
          return response.status(400).json({ message: "Invalid user type" });
      }

      return response.status(200).json({ message: "User updated successfully" });
    } else {
      return response.status(500).json({ message: "Failed to update user" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});


exports.getChildsParentInfo = catchAsyncErrors(async (req, res, next) => {
  const { user_id } = req.params;
 console.log("Helloo"+user_id);
 
  // Retrieve child's information
  const childQuery = 'SELECT * FROM children WHERE child_id = ?';
  db.query(childQuery, [user_id], (err, childResults) => {
    if (err) {
      console.error("Error retrieving child: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }

    if (childResults.length === 0) {
      return next(new ErrorHandler("Child not found", 404));
    }

    const child = childResults[0];
    console.log(child);
    
    const parent_id = child.parent_id;

    // Retrieve parent's information
    const parentQuery = 'SELECT user_id, username, email, first_name, last_name, user_type FROM users WHERE user_id = ?';
    db.query(parentQuery, [parent_id], (err, parentResults) => {
      if (err) {
        console.error("Error retrieving parent: " + err.stack);
        return next(new ErrorHandler("Server Error", 500));
      }

      if (parentResults.length === 0) {
        return next(new ErrorHandler("Parent not found", 404));
      }

      const parent = parentResults[0];

      // Respond with child and parent information
      res.status(200).json({
        child: {
          id:child._id,
          child_id: child.child_id,
          parent_id: child.parent_id,
          date_of_birth: child.date_of_birth,
          grade_level: child.grade_level,
        },
        parent: {
          user_id: parent.user_id,
          username: parent.username,
          email: parent.email,
          first_name: parent.first_name,
          last_name: parent.last_name,
          user_type: parent.user_type,
        },
      });
    });
  });
});

exports.getChildrenAndUserInfo = catchAsyncErrors(async (req, res, next) => {
  // Assume `user_id` is obtained from authentication middleware or session
  const parentUserId = req.params.user_id; // Adjust according to your authentication setup
 
  // Step 1: Retrieve the parent_id for the logged-in user
  const parentQuery = 'SELECT user_id FROM users WHERE user_id = ?';
  db.query(parentQuery, [parentUserId], (err, parentResults) => {
    if (err) {
      console.error("Error retrieving parent: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }

    if (parentResults.length === 0) {
      return next(new ErrorHandler("Parent not found", 404));
    }

    const parent_id = parentResults[0].user_id;
  
    // Step 2: Retrieve all children with the specified parent_id
    const childQuery = 'SELECT * FROM children WHERE parent_id = ?';
    db.query(childQuery, [parent_id], (err, childResults) => {
      if (err) {
        console.error("Error retrieving children: " + err.stack);
        return next(new ErrorHandler("Server Error", 500));
      }

      if (childResults.length === 0) {
        return res.status(404).json({ message: "No children found for this parent" });
      }

      // Prepare a list of child IDs for subsequent user queries
      const childIds = childResults.map(child => child.child_id);

      // Step 3: Retrieve user details for each child
      const userQueries = childIds.map(childId => {
        return new Promise((resolve, reject) => {
          db.query('SELECT user_id, username, email, first_name, last_name, user_type FROM users WHERE user_id = ?', [childId], (err, userResults) => {
            if (err) {
              return reject(err);
            }
            if (userResults.length === 0) {
              return resolve(null);
            }
            resolve(userResults[0]);
          });
        });
      });

      // Execute all user queries
      Promise.all(userQueries)
        .then(users => {
          // Filter out null results if any user was not found
          const filteredUsers = users.filter(user => user !== null);

          // Respond with child and user information
          res.status(200).json({
            children: childResults.map(child => ({
              child_id: child.child_id,
              date_of_birth: child.date_of_birth,
              grade_level: child.grade_level,
            })),
            users: filteredUsers,
          });
        })
        .catch(err => {
          console.error("Error retrieving user details: " + err.stack);
          next(new ErrorHandler("Server Error", 500));
        });
    });
  });
});


exports.updateStatus = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.userId;
  const { login_status } = req.body;

  if (!login_status) {
    return res.status(400).json({ message: "Login status is required" });
  }

  try {
    // Query to update the login status of the user
    const query = "UPDATE users SET login_status = ? WHERE user_id = ?";
    const values = [login_status, userId];

    // Wrap the query in a promise
    const executeQuery = (query, values) => {
      return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    };

    const result = await executeQuery(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Login status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
