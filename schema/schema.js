const graphql = require('graphql');
const _ = require('lodash')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const users = [
    { id: '23', firstName: 'Jennifer', age: 18 },
    { id: '43', firstName: 'Zack', age: 81 }
];

// 2 req properties = name:User & fields:{} (tells GQL about the things the user has)
const UserType = new GraphQLObjectType({
    name:'User',
    fields: () =>({
        id: {type: GraphQLString },
        firstName: {type: GraphQLString} ,
        age: {type: GraphQLInt } 
    })
});

// allows GQL to jump to a specific node in the graph
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // root query of a given user - if give the id of a user you are looking for will give back a user
        user: {
            type: UserType,
            args: {id: { type: GraphQLString } },
            // where we actaully do into datastore and find the data we are looking for - before this we are telling GQL what our data looks like
            // args gets called with whatever arguemnts are passed into the query
            // resolve retuns actual data
            resolve( parentValue, args) {
                return _.find(users, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema ({
    query: RootQuery
});


