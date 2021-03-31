'use strict';
const connectDB = require('./db');
const { ObjectID, ObjectId } = require('mongodb');
// const courses = [
// 	{
// 		_id: '1',
// 		title: 'BUM 1',
// 		teacher: 'Tovim',
// 		description: 'aja',
// 		topic: 'programing',
// 	},
// 	{
// 		_id: '2',
// 		title: 'BUM 2',
// 		teacher: 'Tovim',
// 		description: 'aja',
// 		topic: 'programing',
// 	},
// 	{
// 		_id: '3',
// 		title: 'BUM 3',
// 		teacher: 'Tovim',
// 		description: 'aja',
// 		topic: 'programing',
// 	},
// ];

const resolvers = {
	Query: {
		courses: async () => {
			let db;
			let courses = [];
			try {
				db = await connectDB();
				courses = await db.collection('workspaces').find().toArray();
			} catch (error) {
				console.log('ERROR:', error.message);
			}
			return courses;
		},

		course: async (root, { id }) => {
			let db;
			let course;
			try {
				db = await connectDB();
				course = await db
					.collection('workspaces')
					.findOne({ _id: ObjectID(id) });
			} catch (error) {
				console.log('ERROR:', error.message);
			}
			return course;
		},
	},
};

module.exports = resolvers;
