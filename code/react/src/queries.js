import {gql} from '@apollo/client';

const GET_ARTISTS = gql`
  query {
    artists {
      _id
      name
      members
      numOfAlbums
      dateFormed
    }
  }
`;

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

const GET_ALBUMS = gql`
  query {
    albums {
      _id
      title
      genre
      artist {
        _id
        name
      }
    }
  }
`;

const GET_COMPANIES = gql`
  query {
    recordCompanies {
      _id
      name
      foundedYear
      country
      albums {
        _id
        title
      }
      numOfAlbums
    }
  }
`;

const GET_ALBUMS_BY_GENRE = gql`
  query getAlbumsByGenre($genre: MusicGenre!) {
    albumsByGenre(genre: $genre) {
      _id
      title
    }
  }
`;

const GET_ARTISTS_BY_NAME = gql`
  query getArtistByName($searchTerm: String!) {
    searchArtistByArtistName(searchTerm: $searchTerm) {
      _id
      name
    }
  }
`;

const GET_COMPANIES_BY_YEARS= gql`
  query getCompanyByFoundedYear($min: Int!
                                $max: Int!) {
    companyByFoundedYear(min: $min
                         max: $max) {
      _id
      name
      foundedYear
    }
  }
`;

const GET_ALBUM = gql`
  query getAlbum($_id: String!) {
    getAlbumById(_id: $_id) {
      _id
      title
      releaseDate
      genre
      artist {
        _id
        name
      }
      recordCompany {
        _id
        name
      }
      songs
    }
  }
`;

const GET_ARTIST = gql`
  query getArtist($_id: String!) {
    getArtistById(_id: $_id) {
      _id
      name
      dateFormed
      members
      albums {
        _id
        title
        songs
      }
      numOfAlbums
    }
  }
`;

const GET_COMPANY = gql`
  query getCompany($_id: String!) {
    getCompanyById(_id: $_id) {
      _id
      name
      country
      foundedYear
    }
  }
`;


const GET_ARTIST_SONGS = gql`
  query getArtistSongs($_id: String!) {
    getSongsByArtistId(artistId: $_id) 
  }
`;

const ADD_ARTIST = gql`
  mutation createArtist(
    $name: String!
    $dateFormed: Date!
    $members: [String!]!
  ) {
    addArtist(
      name: $name
      dateFormed: $dateFormed
      members: $members
    ) {
      _id
      name
      members
      numOfAlbums
    }
  }
`

const ADD_ALBUM = gql`
  mutation createAlbum(
    $title: String!
    $releaseDate: Date!
    $genre: MusicGenre!
    $songs: [String!]!
    $artistId: String!
    $companyId: String!
  ) {
    addAlbum(
      title: $title
      releaseDate: $releaseDate
      songs: $songs
      genre: $genre
      artistId: $artistId
      companyId: $companyId
    ) {
      _id
      title
      genre
      artist {
        _id
        name
      }
    }
  }
`

const ADD_COMPANY = gql`
  mutation createCompany(
    $name: String!
    $founded_year: Int!
    $country: String!
  ) {
    addCompany(
      name: $name
      founded_year: $founded_year
      country: $country
    ) {
      _id
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

const DELETE_ARTIST = gql`
  mutation deleteArtist($id: String!) {
    removeArtist(_id: $id) {
      _id
    }
  }
`;

const DELETE_ALBUM = gql`
  mutation deleteAlbum($id: String!) {
    removeAlbum(_id: $id) {
      _id
    }
  }
`;

const DELETE_COMPANY = gql`
  mutation deleteCompany($id: String!) {
    removeCompany(_id: $id) {
      _id
    }
  }
`;

const EDIT_ARTIST = gql`
  mutation changeArtist(
    $id: String!
    $name: String!
    $dateFormed: Date!
    $members: [String!]!
  ) {
    editArtist(
      _id: $id
      name: $name
      dateFormed: $dateFormed
      members: $members
    ) {
      _id
      name
      members
      dateFormed
    }
  }
`;

const EDIT_ALBUM = gql`
  mutation changeAlbum(
    $id: String!
    $title: String
    $releaseDate: Date
    $genre: MusicGenre
    $songs: [String!]
    $artistId: String
    $companyId: String
  ) {
    editAlbum(
      _id: $id
      title: $title
      releaseDate: $releaseDate
      genre: $genre
      songs: $songs
      artistId: $artistId
      companyId: $companyId
    ) {
      _id
      title
      releaseDate
      genre
      songs
    }
  }
`;

const EDIT_COMPANY = gql`
  mutation changeCompany(
    $id: String!
    $name: String
    $foundedYear: Int
    $country: String
  ) {
    editCompany(
      _id: $id
      name: $name
      foundedYear: $foundedYear
      country: $country
    ) {
      _id
      name
    }
  }
`;

let exported = {
  GET_ARTISTS,
  ADD_ARTIST,
  EDIT_ARTIST,
  DELETE_ARTIST,
  GET_ARTIST,
  GET_ARTIST_SONGS,
  GET_ALBUMS,
  EDIT_ALBUM,
  DELETE_ALBUM,
  GET_ALBUM,
  ADD_ALBUM,
  GET_COMPANIES,
  GET_COMPANY,
  ADD_COMPANY,
  EDIT_COMPANY,
  DELETE_COMPANY,
  ADD_SHARED_IMAGE,
  GET_SHARED_IMAGES,
  UPLOAD_FILE,
  GET_ALBUMS_BY_GENRE,
  GET_ARTISTS_BY_NAME,
  GET_COMPANIES_BY_YEARS
};

export default exported;
