import {gql} from '@apollo/client';

const ADD_USER = gql`
  mutation addUser(
    $uid: String!,
    $email: String!
  ) {
    addUser(
      uid: $uid,
      email: $email
    ) 
    {
      email
    }
  }
`;

const GET_USER_BY_UID = gql`
  query getUserByUid($uid: String!) {
    getUserByUid(uid: $uid) {
      uid
      email
    }
  }
`

const GET_SHARED_IMAGES = gql`
  query {
    sharedImages {
      _id
      image
      comments
      userId
      dateFormed
      description
    }
  }
`;
const ADD_SHARED_IMAGE = gql`
  mutation createSharedImage(
    $userId: String!
    $image: String!
    $dateFormed: Date!
    $description: String
  ) {
    addSharedImage(
      userId: $userId
      image: $image
      dateFormed: $dateFormed
      description: $description
    ) {
        _id
        userId
        image
        dateFormed
        description
        comments
      }
    }
`;
const EDIT_SHARED_IMAGE = gql`
  mutation changeSharedImage(
    $id: String!
    $userId: String!
    $image: String!
    $description: String
  ) {
    editSharedImage(
      _id: $id
      userId: $userId
      image: $image
      description: $description
    ) {
      _id
    }
  }
`;

const UPDATE_USER = gql`
  mutation editUser(
    $id: String!
    $numOfCreatedImages: Int
    $numOfSharedImages: Int
    $numOfSolvedImages: Int
  ) {
    updateUser(
      _id: $id
      numOfCreatedImages: $numOfCreatedImages
      numOfSharedImages: $numOfSharedImages
      numOfSolvedImages: $numOfSolvedImages
    ) {
      _id
    }
  }
`;

const GET_USERS = gql`
  query {
    users {
      _id
      email
      numOfSharedImages
      numOfCreatedImages
      numOfSolvedImages
    }
  }
`;

const DELETE_SHARED_IMAGE = gql`
  mutation removeSharedImage($id: String!) {
    removeSharedImage(_id: $id) {
      _id
    }
  }
`;
const GET_CREATED_IMAGES = gql`
  query {
    createdImages {
      _id
      image
      comments
      solvedBy
      userId
      dateFormed
      description
    }
  }
`;
const ADD_CREATED_IMAGE = gql`
  mutation createCreatedImage(
    $userId: String!
    $image: String!
    $dateFormed: Date!
    $description: String
  ) {
    addCreatedImage(
      userId: $userId
      image: $image
      dateFormed: $dateFormed
      description: $description
    ) {
        _id
        userId
        image
        dateFormed
        description
        comments
        solvedBy
      }
    }
`;

const EDIT_CREATED_IMAGE = gql`
  mutation changeCreatedImage(
    $id: String!
    $userId: String!
    $image: String!
    $description: String
    $solvedBy: String
  ) {
    editCreatedImage(
      _id: $id
      userId: $userId
      image: $image
      description: $description
      solvedBy: $solvedBy
    ) {
      _id
    }
  }
`;

const DELETE_CREATED_IMAGE = gql`
  mutation removeCreatedImage($id: String!) {
    removeCreatedImage(_id: $id) {
      _id
    }
  }
`;

const GUESS_CREATED_IMAGE = gql`
  mutation solveCreatedImage(
    $userId: String!
    $imageId: String!
    $guess: String
  ) {
    guessCreatedImage(
      userId: $userId
      imageId: $imageId
      guess: $guess
    ) {
      _id
    }
  }
`;

const GET_LEADERBOARD = gql`
  query {
    leaderboard 
  }
`;

let exported = {
  ADD_SHARED_IMAGE,
  GET_SHARED_IMAGES,
  DELETE_SHARED_IMAGE,
  ADD_CREATED_IMAGE,
  GET_CREATED_IMAGES,
  DELETE_CREATED_IMAGE,
  EDIT_SHARED_IMAGE,
  EDIT_CREATED_IMAGE,
  GUESS_CREATED_IMAGE,
  GET_LEADERBOARD,
  ADD_USER,
  UPDATE_USER,
  GET_USERS,
  GET_USER_BY_UID
};

export default exported;