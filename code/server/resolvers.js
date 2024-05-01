import {GraphQLError, parse} from 'graphql';
import { createClient } from 'redis';
import * as utilHelper from './helpers.js'
const client = createClient();
await client.connect();

import {

} from './config/mongoCollections.js';

import {v4 as uuid} from 'uuid'; //for generating _id's

export const resolvers = {
  Query: {

  },
  Mutation: {

 }
};
