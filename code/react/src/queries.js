import {gql} from '@apollo/client';

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

const DELETE_SHARED_IMAGE = gql`
  mutation removeSharedImage($id: String!) {
    removeSharedImage(_id: $id) {
      _id
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

let exported = {
  ADD_SHARED_IMAGE,
  GET_SHARED_IMAGES,
  UPLOAD_FILE,
  DELETE_SHARED_IMAGE
};

export default exported;
