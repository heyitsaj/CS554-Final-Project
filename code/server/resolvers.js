import {GraphQLError, parse} from 'graphql';
import { createClient } from 'redis';
import * as utilHelper from './helpers.js'
const client = createClient();
await client.connect();

import {
  sharedImages as sharedImagesCollection
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
  },
  Mutation: {
    singleUpload: async (parent, args) => {
      return args.file.then(file => {
        const {createReadStream, filename, mimetype} = file

        const fileStream = createReadStream()

        fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`))

        return file;
      });
    },
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
    }
 }
};
