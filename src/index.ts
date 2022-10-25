import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import SuspendedRepository from './repositories/SuspendedRepository.js';


const suspendedDate : Date = await SuspendedRepository.getSupendedDate()

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

const date = {
  year : suspendedDate.getFullYear(),
  month : suspendedDate.getMonth(),
  day: suspendedDate.getDate()
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
  listen: { port: Number.parseInt(process.env.PORT) || 4000 },
});