const graphql = require('graphql');
const _ = require('lodash'); // helper library to walk through collections of data
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

// hardcoded list of users
const users = [
    { id: '9', firstName: 'Hannah', age: 20 },
    { id: '15', firstName: 'Erol', age: 29 }
];


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType, // type of data we are returning from the resolve function
            args: { id: { type: GraphQLString } }, // arguments we are expecting to receive
            resolve(parentValue, args) { 
                return _.find(users, { id: args.id }); // resolve function is where we actually go into our database and find the data we are looking for
        }
    }
}});

module.exports = new GraphQLSchema({
    query: RootQuery
});
