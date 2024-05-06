import {GraphQLError, parse} from 'graphql';
import { createClient } from 'redis';
import * as utilHelper from './helpers.js'
const client = createClient();
await client.connect();

import {
  sharedImages as sharedImagesCollection,
  createdImages as createdImagesCollection
} from './config/mongoCollections.js';

import {v4 as uuid} from 'uuid'; //for generating _id's

export const resolvers = {
  Query: {
    sharedImages: async () => {
      const sharedImages = await sharedImagesCollection();
      const allSharedImages = await sharedImages.find({}).toArray();
      if (!allSharedImages) {
        throw new GraphQLError(`Internal Server Error`, {
          extensions: {code: 'INTERNAL_SERVER_ERROR'}
        });
      }

      return allSharedImages;
    },
    createdImages: async () => {
      const createdImages = await createdImagesCollection();
      const allCreatedImages = await createdImages.find({}).toArray();
      if (!allCreatedImages) {
        throw new GraphQLError(`Internal Server Error`, {
          extensions: {code: 'INTERNAL_SERVER_ERROR'}
        });
      }

      return allCreatedImages;
    },
  },
  Mutation: {
    addSharedImage: async (_, args) => {
      // validate arguments 
      let {dateFormed, description, image, userId} = args;
            
      // create shared image
      let sharedImage =     {
        _id: uuid(),
        userId: userId,
        dateFormed: new Date(dateFormed),
        description: description,
        image: image,
        comments: []
      };

      // add to mongo
      const sharedImages = await sharedImagesCollection();
      let insertedImage = await sharedImages.insertOne(sharedImage);
      const foundImage = await sharedImages.findOne({_id: insertedImage.insertedId});
      if (!foundImage) {
        //can't find the shared image
        throw new GraphQLError('Image Not Found', {
          extensions: {code: 'NOT_FOUND'}
        });
      }

      return sharedImage;
    },
    removeSharedImage: async (_, args) => {
      const sharedImage = await sharedImagesCollection();
      const deletedImage = await sharedImage.findOneAndDelete({_id: args._id});

      if (!deletedImage) {
        throw new GraphQLError(
          `Could not delete shared image with _id of ${args._id}`,
          {
            extensions: {code: 'NOT_FOUND'}
          }
        );
      }
      return deletedImage;
    },
    addCreatedImage: async (_, args) => {
      // validate arguments 
      let {dateFormed, description, image, userId} = args;
            
      // create craeted image
      let createdImage =     {
        _id: uuid(),
        userId: userId,
        dateFormed: new Date(dateFormed),
        description: description,
        image: image,
        comments: [],
        solvedBy: "none"
      };

      // add to mongo
      const createdImages = await createdImagesCollection();
      let insertedImage = await createdImages.insertOne(createdImage);
      const foundImage = await createdImages.findOne({_id: insertedImage.insertedId});
      if (!foundImage) {
        //can't find the created image
        throw new GraphQLError('Image Not Found', {
          extensions: {code: 'NOT_FOUND'}
        });
      }

      return createdImage;
    },
    removeCreatedImage: async (_, args) => {
      const createdImage = await createdImagesCollection();
      const deletedImage = await createdImage.findOneAndDelete({_id: args._id});

      if (!deletedImage) {
        throw new GraphQLError(
          `Could not delete created image with _id of ${args._id}`,
          {
            extensions: {code: 'NOT_FOUND'}
          }
        );
      }
      return deletedImage;
    },
 }
};
