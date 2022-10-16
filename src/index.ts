import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Date {
    year:Int
    month:Int
    day:Int
  }

  type LastSerial {
    date:Date
  }

  type Query {
    lastSerial: LastSerial
  }
`;

const date = {
  year : 2018,
  month : 11,
  day: 26
}

const lastSerial = {
  date
}

const resolvers = {
  Query: {
    lastSerial: () => lastSerial,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 80 },
});

console.log(`🚀  Server ready at: ${url}`);