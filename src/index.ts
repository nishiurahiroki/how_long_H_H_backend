import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Date {
    year:Int
    month:Int
    day:Int
  }

  type Suspended {
    date:Date
  }

  type Query {
    suspended: Suspended
  }
`;

const now = new Date()

const date = {
  year : now.getFullYear(),
  month : now.getMonth(),
  day: now.getDay()
}

const suspended = {
  date
}

const resolvers = {
  Query: {
    suspended: () => suspended,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
});

console.log(`🚀  Server ready at: ${url}`);