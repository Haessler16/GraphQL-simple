'use strict';

const courses = [
	{
		_id: 1,
		title: 'BUM 1',
		teacher: 'Tovim',
		description: 'aja',
		topic: 'programing',
	},
	{
		_id: 2,
		title: 'BUM 2',
		teacher: 'Tovim',
		description: 'aja',
		topic: 'programing',
	},
	{
		_id: 3,
		title: 'BUM 3',
		teacher: 'Tovim',
		description: 'aja',
		topic: 'programing',
	},
];
const resolvers = {
	courses: () => courses,
};

module.exports = resolvers;