const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const db = require("../config/database");
const dotenv = require("dotenv");
dotenv.config();


exports.isAuthenticatedUser = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
   
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new ErrorHandler("Login first to access this resource!", 401)); 
    }

    const token = authHeader.split(' ')[1]; 
    let decode;
    try {
      decode = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return next(new ErrorHandler("Invalid token. Please log in again.", 401)); 
    }
    console.log(decode);
    const sql = "SELECT * FROM users WHERE user_id = ?";
    db.query(sql, [decode.id], (err, results) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler("Error finding user in database", 500)); 
      }

      if (!results || results.length === 0) {
        return next(new ErrorHandler("User not found", 404)); 
      }

      request.user = results[0];
    
      next();
    });
  } catch (error) {
    next(error);
  }
};
exports.authorizeRoles = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_type)) {
      return res.status(403).json({
        error: `Role (${req.user.user_type}) is not allowed to access this resource`
      });
    }
    next(); 
  };
};


// exports.protect = asyncHandler(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   )
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decode = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decode.id).select("-password");
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error("Not Authorized , Token failed");
//     }
//   if (!token) {
//     res.status(401);
//     throw new Error("Not Authorized, not token");
//   }
// });
