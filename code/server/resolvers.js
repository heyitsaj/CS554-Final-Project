import {GraphQLError, parse} from 'graphql';
import * as utilHelper from './helpers.js'

import {
  sharedImages as sharedImagesCollection,
  createdImages as createdImagesCollection,
  users as userCollection
} from './config/mongoCollections.js';

import {v4 as uuid} from 'uuid'; //for generating _id's
import { ObjectId } from 'mongodb';

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
    users: async () => {
      const users = await userCollection();
      const allUsers = await users.find({}).toArray();
      if (!users) {
        throw new GraphQLError(`Internal Server Error`, {
          extensions: {code: 'INTERNAL_SERVER_ERROR'}
        });
      }

      return allUsers;
    }
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
      console.log(args)
      if (newSharedImage) {
        let description = ""
        if(args.description){
          description = args.description.trim();
        }
         
        let image = args.image.trim()
        newSharedImage.description = description;
        newSharedImage.image = image;

        // remove old album collection cache for updated image
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
        newCreatedImage.solvedBy = args.solvedBy.trim();

        // remove old album collection cache for updated image
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
    addUser: async (_, args) => {
      const users = await userCollection();

      console.log(args);

      let newUser = {
        _id: args.uid,
        email: args.email,
        sharedImages: [],
        createdImages: [],
        numOfSharedImages: 0,
        numOfCreatedImages: 0,
        numOfSolvedImages: 0 
      }

      let insertedUser = await users.insertOne(newUser);
      const foundUser = await users.findOne({_id: insertedUser.insertedId});
      if (!foundUser) {
        //can't find the created user
        throw new GraphQLError('User Not Found', {
          extensions: {code: 'NOT_FOUND'}
        });
      }

      return foundUser;
    },
    updateUser: async (_, args) => {
      const users = await userCollection();
      let newUser = await users.findOne({_id: args._id});
      if (newUser) {
        let sharedImages = args.sharedImages;
        let createdImages = args.createdImages;
        let numOfSharedImages = args.numOfSharedImages;
        let numOfCreatedImages = args.numOfCreatedImages;
        let numOfSolvedImages = args.numOfSolvedImages;

        if(sharedImages)
          newUser.sharedImages = sharedImages;
        if(createdImages)
          newUser.createdImages = createdImages;
        if(numOfSharedImages)
          newUser.numOfSharedImages = numOfSharedImages;
        if(numOfCreatedImages)
          newUser.numOfCreatedImages = numOfSharedImages;
        if(numOfSolvedImages)
          newUser.numOfSolvedImages = numOfSolvedImages;

        let response = await users.updateOne({_id: args._id}, {$set: newUser});
        if(response){
          return newUser;
        }
        else{
          throw new GraphQLError(`Could not update users: ${args._id}`, {
            extensions: {code: 'INTERNAL_SERVER_ERROR'}
          });
        }
      } else {
        throw new GraphQLError(
          `Could not update users with _id of ${args._id}`,
          {
            extensions: {code: 'NOT_FOUND'}
          }
        );
      }
    }
  } 
};
