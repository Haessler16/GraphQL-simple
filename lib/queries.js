'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  courses: async () => {
    let db
    let courses = []
    try {
      db = await connectDB()
      courses = await db.collection('workspaces').find().toArray()
    } catch (error) {
      errorHandler(error)
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
      errorHandler(error)
    }
    return course
  },

  people: async () => {
    let db
    let students = []
    try {
      db = await connectDB()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return students
  },

  person: async (root, { id }) => {
    let db
    let student
    try {
      db = await connectDB()
      student = await db.collection('students').findOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }
    return student
  },

  searchItems: async (root, { keyword }) => {
    let db
    let items
    let courses
    let people
    try {
      db = await connectDB()
      courses = await db
        .collection('workspaces')
        .find({ $text: { $search: keyword } })
        .toArray()
      people = await db
        .collection('students')
        .find({ $text: { $search: keyword } })
        .toArray()

      items = [...courses, ...people]
    } catch (error) {
      errorHandler(error)
    }
    return items
  }
}
