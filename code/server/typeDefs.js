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
    createdImages: [CreatedImaged!]!
    numOfSharedImages: Int
    numOfCreatedImages: Int
  }
  
  type SharedImage {
    _id: String!
    image: Image!
    comments: [String]!
  }
  
  type CreatedImage {
    _id: String!
    image: Image!
    comments: [String]!
    solvedBy: String
  }

  type Image {
    userId: String!
    content: String!
    dateFormed: Date!
    description: String
  }
  
  scalar Date

  type Mutation {
    registerUser(
      name: String!
      password: String!
    ): User
    addSharedImage(
      userId: String!
      content: String!
      dateFormed: Date!
      description: String
    ): SharedImage
    removeSharedImage(_id: String!): SharedImage
    addCreatedImage(
      userId: String!
      content: String!
      dateFormed: Date!
      description: String
    ): CreatedImage
    removeCreatedImage(_id: String!): CreatedImage
  }
`;
