import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } from 'graphql';
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

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType, 
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { firstName, age, companyId }) { 
                return axios.post('http://localhost:3001/users', { firstName, age, companyId })
                .then(resp => resp.data);

            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, { id }) {
                return axios.delete(`http://localhost:3001/users/${id}`)
                .then(resp => resp.data)
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)},
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString } 
            },
            resolve(parentValue, args ) {
                return axios.patch(`http://localhost:3001/users/${args.id}`, args)
                .then(resp => resp.data)
            }
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation
});

export default schema;