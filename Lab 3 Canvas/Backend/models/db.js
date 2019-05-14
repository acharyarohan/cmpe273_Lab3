const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect(
    "mongodb+srv://rohan:rohan@cluster0-64nms.mongodb.net/test?retryWrites=true"
);


var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("connected", function() {
    console.log(db);
    return console.log("Successfully connected to  MongoDB Database");
});

db.once("disconnected", function() {
    return console.error("Successfully disconnected from MongoDB Database");
});
var userModel = mongoose.model("userModel", {
    userID: String,
    role: String,
    email: String,
    password: String,
    name: String,
    profileImage: String,
    phoneNumber: String,
    aboutMe: String,
    city: String,
    country: String,
    company: String,
    school: String,
    hometown: String,
    language: String,
    gender: String
});

var courseModel = mongoose.model("courseModel", {
    courseID: String,
    courseName: String,
    courseDept: String,
    courseDescription: String,
    courseRoom: String,
    courseCapacity: String,
    waitlistCapacity: String,
    courseTerm: String,
    instructorID: String,
    registration: Array,
    announcement: Array,
    assignment: String,
    instructorName: String
});

var registerModel = mongoose.model("registerModel", {
    courseID: String,
    instructorID: String,
    instructorName: String,
    userID: String,
    waitlisted: String
});

var announcementModel = mongoose.model("announcementModel", {
    topic: String,
    body: String,
    courseID: String,
    instructorName: String,
    instructorID: String
});

module.exports = {
    userModel,
    courseModel,
    registerModel,
    announcementModel
};