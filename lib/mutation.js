'use strict';
const { ObjectID } = require('mongodb');
const connectDB = require('./db');
const errorHandler = require('./errorHandler');

module.exports = {
	createCourse: async (root, { input }) => {
		const defaults = {
			account: '',
		};

		const newCourse = { ...defaults, ...input };
		let db;
		let course;
		try {
			db = await connectDB();
			course = await db.collection('workspaces').insertOne(newCourse);
			newCourse._id = course.insertedId;
		} catch (error) {
			errorHandler(error);
		}
		return newCourse;
	},

	updateCourse: async (root, { id, input }) => {
		let db;
		let course;
		try {
			db = await connectDB();

			await db
				.collection('workspaces')
				.updateOne({ _id: ObjectID(id) }, { $set: input });

			course = await db.collection('workspaces').findOne({ _id: ObjectID(id) });
		} catch (error) {
			errorHandler(error);
		}
		return course;
	},

	createPerson: async (root, { input }) => {
		let db;
		let student;
		try {
			db = await connectDB();
			student = await db.collection('students').insertOne(input);
			input._id = student.insertedId;
		} catch (error) {
			errorHandler(error);
		}
		return input;
	},

	updatePerson: async (root, { id, input }) => {
		let db;
		let student;
		try {
			db = await connectDB();

			await db
				.collection('students')
				.updateOne({ _id: ObjectID(id) }, { $set: input });

			student = await db.collection('students').findOne({ _id: ObjectID(id) });
		} catch (error) {
			errorHandler(error);
		}
		return student;
	},

	deletePerson: async (root, { id }) => {
		let db;
		let students;
		try {
			db = await connectDB();
			await db.collection('students').deleteOne({ _id: ObjectID(id) });

			students = await db.collection('students').find().toArray();
		} catch (error) {
			errorHandler(error);
		}
		return students;
	},

	addPeople: async (root, { courseID, personID }) => {
		let db;
		let course;
		let person;
		try {
			db = await connectDB();
			course = await db
				.collection('workspaces')
				.findOne({ _id: ObjectID(courseID) });

			person = await db
				.collection('students')
				.findOne({ _id: ObjectID(personID) });

			if (!course || !person) {
				throw new Error('La persona o el Curso no existe');
			}

			await db
				.collection('workspaces')
				.updateOne(
					{ _id: ObjectID(courseID) },
					{ $addToSet: { people: ObjectID(personID) } },
				);
		} catch (error) {
			errorHandler(error);
		}
		return course;
	},
};
