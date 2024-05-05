//Create the type definitions for the query and our data

export const typeDefs = `#graphql
  type Query {
    users: [User]
    sharedImages: [SharedImage]
    createdImages: [CreatedImage]
  }

  type User {
    _id: String!
    name: String!
    sharedImages: [SharedImage!]!
    createdImages: [CreatedImage!]!
    numOfSharedImages: Int
    numOfCreatedImages: Int
  }
  
  type SharedImage {
    _id: String!
    userId: String!
    image: String!
    dateFormed: Date!
    description: String
    comments: [String]
  }
  
  type CreatedImage {
    _id: String!
    image: String!
    comments: [String]!
    solvedBy: String
    userId: String!
    dateFormed: Date!
    description: String
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
scalar Upload

  scalar Date

  type Mutation {
    singleUpload(file: Upload!): File!
    registerUser(
      name: String!
      password: String!
    ): User
    addSharedImage(
      userId: String!
      image: String!
      dateFormed: Date!
      description: String
    ): SharedImage
    removeSharedImage(_id: String!): SharedImage
    addCreatedImage(
      userId: String!
      image: String!
      dateFormed: Date!
      description: String
    ): CreatedImage
    removeCreatedImage(_id: String!): CreatedImage
  }
`;
