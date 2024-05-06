import {GraphQLError, parse} from 'graphql';
import * as utilHelper from './helpers.js'

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
    editSharedImage: async (_, args) => {
      const sharedImages = await sharedImagesCollection();
      let newSharedImage = await sharedImages.findOne({_id: args._id});
      console.log(newSharedImage); 
      if (newSharedImage) {
        let description = args.description.trim();
        newSharedImage.description = description;

        // remove old album collection cache for updated artist
        let response = await sharedImages.updateOne({_id: args._id}, {$set: newSharedImage});
        if(response){
          return newSharedImage;
        }
        else{
          throw new GraphQLError(`Could not update sharedImage: ${name}`, {
            extensions: {code: 'INTERNAL_SERVER_ERROR'}
          });
        }
      } else {
        throw new GraphQLError(
          `Could not update sharedImage with _id of ${args._id}`,
          {
            extensions: {code: 'NOT_FOUND'}
          }
        );
      }
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
    editCreatedImage: async (_, args) => {
      const createdImages = await createdImagesCollection();
      let newCreatedImage = await createdImages.findOne({_id: args._id});
      if (newCreatedImage) {
        let description = args.description.trim();
        newCreatedImage.description = description;

        // remove old album collection cache for updated artist
        let response = await createdImages.updateOne({_id: args._id}, {$set: newCreatedImage});
        if(response){
          return newCreatedImage;
        }
        else{
          throw new GraphQLError(`Could not update createdImage: ${args._id}`, {
            extensions: {code: 'INTERNAL_SERVER_ERROR'}
          });
        }
      } else {
        throw new GraphQLError(
          `Could not update createdImage with _id of ${args._id}`,
          {
            extensions: {code: 'NOT_FOUND'}
          }
        );
      }
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
