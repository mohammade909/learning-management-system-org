const experss = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const upload = require('express-fileupload')
const errorMiddleware = require('./middlewares/errorMiddleware');

// Routes starts here
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const coursesRoutes = require('./routes/courseRoutes');
const enrollmentsRoutes = require('./routes/enrollmentRoutes');
const reviewRoutes = require('./routes/reviewRouets')
const accessRoutes = require('./routes/accessRoutes')
const feeRoutes = require('./routes/feeRoutes');
// Middleware starts here
dotenv.config();
const app = experss();
app.use(experss.json());
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(cors({origin:"*"}));




// API Endpoints starts at http://localhost:8000

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", coursesRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/permissions", accessRoutes);
app.use("/api/v1/enrollments", enrollmentsRoutes);
app.use("/api/v1/fee", feeRoutes);
// app.use("/api/v1/enrollments", enrollmentRequestRoutes);


// Middle wares
app.use(errorMiddleware);

module.exports = app;
