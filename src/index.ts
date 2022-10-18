import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import SuspendedRepository from './repositories/SuspendedRepository.js';


const suspended : Date = await SuspendedRepository.getSupendedDate()

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
  year : suspended.getFullYear(),
  month : suspended.getMonth(),
  day: suspended.getDay()
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
  listen: { port: Number.parseInt(process.env.PORT) || 4000 },
});