'use strict'

const queries = require('./queries')
const mutations = require('./mutation')
const types = require('./types')

const resolvers = {
  Query: queries,
  Mutation: mutations,
  ...types
}

module.exports = resolvers

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
