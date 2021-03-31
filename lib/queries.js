'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
  courses: async () => {
    let db
    let courses = []
    try {
      db = await connectDB()
      courses = await db.collection('workspaces').find().toArray()
    } catch (error) {
      console.log('ERROR:', error.message)
    }
    return courses
  },

  course: async (root, { id }) => {
    let db
    let course
    try {
      db = await connectDB()
      course = await db.collection('workspaces').findOne({ _id: ObjectID(id) })
    } catch (error) {
      console.log('ERROR:', error.message)
    }
    return course
  },

  students: async () => {
    let db
    let students = []
    try {
      db = await connectDB()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      console.log('ERROR:', error.message)
    }
    return students
  },

  student: async (root, { id }) => {
    let db
    let student
    try {
      db = await connectDB()
      student = await db.collection('students').findOne({ _id: ObjectID(id) })
    } catch (error) {
      console.log('ERROR:', error.message)
    }
    return student
  }
}
