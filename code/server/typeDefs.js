//Create the type definitions for the query and our data

export const typeDefs = `#graphql
  type Query {
    users: [User]
    sharedImages: [SharedImage]
    createdImages: [CreatedImage]
    leaderboard: [String]
  }

  type User {
    _id: String!
    name: String!
    sharedImages: [SharedImage!]!
    createdImages: [CreatedImage!]!
    numOfSharedImages: Int
    numOfCreatedImages: Int
    numOfSolvedImages: Int
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

  scalar Date

  type Mutation {
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
    editSharedImage(
      _id: String!
      userId: String!
      image: String!
      description: String
    ): SharedImage
    removeSharedImage(_id: String!): SharedImage
    addCreatedImage(
      userId: String!
      image: String!
      dateFormed: Date!
      description: String
    ): CreatedImage
    editCreatedImage(
      _id: String!
      userId: String!
      image: String!
      description: String
      solvedBy: String
    ): CreatedImage
    removeCreatedImage(_id: String!): CreatedImage
    guessCreatedImage(
      userId: String!
      imageId: String!
      guess: String!
    ): CreatedImage
  }
`;
