import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } from 'graphql';
import axios from 'axios';

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3001/companies/${parentValue.id}/users`)
                    .then(resp => resp.data);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: { 
            type: CompanyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3001/companies/${parentValue.companyId}`)
                    .then(resp => resp.data);
            } 
        }
    })
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
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3001/companies/${args.id}`)
                    .then(resp => resp.data);
            }
        }
}});

export const schema = new GraphQLSchema({
    query: RootQuery
});

export default schema;