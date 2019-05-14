const graphql = require('graphql');
const _ = require('lodash');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const cidMutator = function(result) {
    let copy = JSON.parse(JSON.stringify(result));
    copy.cid = result._id;
    return copy;
}

mongoose.Promise = global.Promise;
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://rohan:rohan@cluster0-64nms.mongodb.net/test?retryWrites=true';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var { userModel, courseModel } = require("../models/db.js");
//get all mongoDB Data
let users = [];
let courses = [];
(async() => {
    users = await userModel.find({})
    courses = courseModel.find({})
})(users, courses);

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        _id: { type: GraphQLID },
        userID: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        // lastName: { type: GraphQLString },
        password: { type: GraphQLString },
        gender: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        school: { type: GraphQLString },
        aboutMe: { type: GraphQLString },
        company: { type: GraphQLString },
        hometown: { type: GraphQLString },
        language: { type: GraphQLString },
        role: { type: GraphQLString }
    })
});
const courseType = new GraphQLObjectType({
    name: 'course',
    fields: () => ({
        _id: { type: GraphQLID },
        courseID: { type: GraphQLInt },
        courseTerm: { type: GraphQLString },
        courseDept: { type: GraphQLString },
        instructorID: { type: GraphQLInt },
        courseName: { type: GraphQLString },
        courseDescription: { type: GraphQLString },
        courseRoom: { type: GraphQLString },
        courseCapacity: { type: GraphQLString },
        waitlistCapacity: { type: GraphQLString },
        registration: { type: GraphQLString },
        announcement: { type: GraphQLString },
        assignment: { type: GraphQLString },
        instructorName: { type: GraphQLString },
        cid: { type: GraphQLString },
        uid: { type: UserType }
    })
});

const enrollType = new GraphQLObjectType({
    name: 'course',
    fields: () => ({
    _id: { type: GraphQLID },
    courseID: {type: GraphQLInt},
    instructorID: {type: GraphQLString},
    instructorName: {type: GraphQLString},
    userID: {type: GraphQLString},
    waitlisted: {type: GraphQLString}
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                let result = _.find(users, { email: args.email });
                try {
                    let { req, res } = context;
                    let { email, password } = args;
                    let data = null;
                    // console.log(args);
                    if (!result) {
                        data = {
                            loginSuccess: 0,
                            message: "Email or Password Incorrect"
                        };
                    } else {
                        const match = await bcrypt.compare(password, result.password);
                        if (match) {
                            var userOne = {
                                email: result.email
                            };
                            var token = jwt.sign(userOne, "There is no substitute for hardwork", {
                                expiresIn: 10080 // in seconds
                            });
                            data = {
                                loginSuccess: 1,
                                message: "Login Successfull!",
                                token: 'JWT ' + token
                            };
                            console.log("Inside GraphQL Login Route");
                            console.log("User Logged in successfully");
                            console.log("Email " + args.email);

                            context.res.cookie('cookie', JSON.stringify({ email: result._id, role: result.role, token: 'JWT ' + token }), { maxAge: 900000000, httpOnly: false, path: '/' });
                        } else {

                            data = { loginSuccess: 0, message: "Email or Password Not correct" };
                        }
                    }
                    console.log(res);
                    return result;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        courses: {
            type: new GraphQLList(courseType),
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, args) {
                console.log(args.id);
                let obj = _.find(users, { id: args.id });
                console.log("users");
                console.log(JSON.stringify(obj));
                let course_Array = [...obj.courses, ...obj.waitlistcourses];
                course_Array = course_Array.map((data) => {
                    let obj = cidMutator(data);
                    obj.status = "Enrolled";
                    obj.name = obj.uid.name;
                    return obj;
                })
                console.log("In GraphQL View All courses Route");
                console.log("Details:");
                console.log(course_Array);
                return course_Array;
            }
        },

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                userID: { type: GraphQLInt },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                name: { type: GraphQLString },
                role: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let { email, password, name, userID, role } = args;
                try {
                    let responseOne = _.find(users, { userID });
                    if (responseOne) {
                        var body = {
                            message: "Signup failed! userID already exists",
                            insertStatus: 0
                        };
                        console.log("here");
                        return false;

                    } else {
                        let hash = await bcrypt.hash(password, saltRounds);
                        var user = new userModel({ email, password: hash, name, role, userID });
                        let response = await user.save();
                        console.log("user saved");
                        console.log(response);
                        var body = {
                            message: "Sign up successfull. Redirecting to Login Page...",
                            insertStatus: 1
                        };
                        console.log("In GraphQL Signup Route");
                        console.log("User Login Successfull");
                        console.log("Details :  ");
                        console.log(response);
                        return response;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
        profileUpdate: {
            type: UserType,
            args: {
                uid: { type: GraphQLString },
                name: { type: GraphQLString },
                aboutMe: { type: GraphQLString },
                hometown: { type: GraphQLString },
                company: { type: GraphQLString },
                city: { type: GraphQLString },
                profileImage: { type: GraphQLString },
                country: { type: GraphQLString },
                school: { type: GraphQLString },
                language: { type: GraphQLString },
                gender: { type: GraphQLString },
                phoneNumber: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let { uid, name, phoneNumber, aboutMe, city, country, company, school, hometown, language, gender, profileImage } = args;
                try {
                    var post = { name, phoneNumber, aboutMe, city, country, company, school, hometown, language, gender, profileImage };

                    let result = await userModel.findOneAndUpdate({ _id: uid }, { $set: {...post } });
                    console.log("In GraphQL Profile Update Route");
                    console.log("Details");
                    console.log(post);
                    return result;
                } catch (error) {
                    console.log(error);
                }

            }
        },
        addCourse: {
            type: courseType,
            args: {
                uid: { type: GraphQLString },
                instructorID: { type: GraphQLInt },
                courseID: { type: GraphQLString },
                courseName: { type: GraphQLString },
                courseDept: { type: GraphQLString },
                courseDescription: { type: GraphQLString },
                courseRoom: { type: GraphQLString },
                courseTerm: { type: GraphQLString },
                courseCapacity: { type: GraphQLString },
                waitlistCapacity: { type: GraphQLString },
            },
            async resolve(parent, args) {

                try {
                    console.log(args);
                    console.log("here");
                    let { courseID, courseName, courseDept, instructorID, courseDescription, courseRoom, courseCapacity, waitlistCapacity, courseTerm, uid } = args;
                    let result = await courseModel.findOne({ courseId: courseID });
                    if (result) {
                        return false;
                    } else {
                        let newcourse = new courseModel({
                            courseID,
                            instructorID,
                            courseName,
                            courseDept,
                            courseDescription,
                            courseRoom,
                            courseCapacity,
                            waitlistCapacity,
                            courseTerm,
                            uid,
                            // currEnrollment: 0,
                            // currWaitlist: 0
                        });
                        let result2 = await newcourse.save();
                        let { _id: courseid } = result2;
                        let result3 = await userModel.update({ _id: uid }, { $push: { courses: courseID } });
                        console.log("In GraphQL Add Course Route");
                        console.log("Details");
                        console.log(newcourse);
                        return result2;
                    }
                } catch (error) {
                    console.log(error);
                }


            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});