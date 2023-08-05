import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } from 'graphql';
import axios from 'axios';

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
                return axios.get(`http://localhost:3001/users/${args.id}`)
                    .then(resp => resp.data); 
        }
    }
}});

export const schema = new GraphQLSchema({
    query: RootQuery
});

export default schema;