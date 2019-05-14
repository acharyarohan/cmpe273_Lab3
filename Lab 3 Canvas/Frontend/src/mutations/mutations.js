import { gql } from 'apollo-boost';

const loginMutation = gql `
mutation Login($email: String, $password: String){
    login(email: $email, password: $password){
      _id,
role,
email
    }
}
`
const signupMutation = gql `
    mutation Signup($email: String, $userID: String, $password: String,$name:String,$role:String){
        signup(email: $email, password: $password, userID: $userID,name:$name,role:$role){
        _id,
        role,
        userID,
        name,
        email
        }
    }
`
const addCourse = gql `
    mutation AdCcourse($uid:String, $instructorID: String, $courseID: String, $courseName: String,$courseTerm:String,$courseDept:String,$courseDescription:String,$courseRoom:String,
        $courseCapacity:String,$waitlistCapacity:String){
        addCourse(uid:$uid,courseId: $courseId,instructorID: $instructorID,courseTerm:$courseTerm, courseName: $courseName,courseDept:$courseDept,courseDescription:$courseDescription,
            courseRoom:$courseRoom,courseCapacity:$courseCapacity,waitlistCapacity:$waitlistCapacity){
       _id
        }
    }
`
const updateProfileMutation = gql `
    mutation ProfileUpdate($uid:String,$name:String,
       $gender:String,$phoneNumber:String,$aboutMe:String,$hometown:String,$language:String,$city:String,$country:String,$school:String, $company:String){
        profileUpdate(uid:$uid,name:$name,gender:$gender,phoneNumber:$phoneNumber,aboutMe:$aboutMe, 
            hometown:$hometown,language:$language,city:$city,country:$country,school:$school, company: $company){
        _id,
        role,
        email,
        name,
        aboutMe,
        phoneNumber,
        language,
        hometown,
        gender,
        city,
        company,
        country,
        school
        }
    }
`
const dashboardCourses = gql `
mutation DashboardCourses($id: String){
    dashboardCourses(id: $id){
    _id,
    courseName,
    cid,
    courseID,
  courseTerm,
  courseDept,
  courseName,
  courseDescription,
  courseRoom,
  courseCapacity,
  waitlistCapacity,
  uid{
      name,
  }
    }
}
`

export { addCourse, dashboardCourses, loginMutation, signupMutation, updateProfileMutation };