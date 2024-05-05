import React, {useState} from 'react';

import {useQuery, useMutation} from '@apollo/client';
//Import the file where my query constants are defined
import queries from '../queries';

function Add(props) {

  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'uploads/');
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.originalname);
  //   },
  // });
  // const upload = multer({ storage });

  const [selectedImage, setSelectedImage] = useState(null);
  
  const [selectedFile, setSelectedFile] = useState(null);

  const [singleUpload] = useMutation(queries.UPLOAD_FILE, {
    update(cache, {data: {singleUpload}}) {
      const {sharedImages} = cache.readQuery({
        query: queries.GET_SHARED_IMAGES
      });
      cache.writeQuery({
        query: queries.GET_SHARED_IMAGES,
        data: {sharedImages: [...sharedImages, singleUpload]}
      });
    }
  });

  const [addSharedImage] = useMutation(queries.ADD_SHARED_IMAGE, {
    update(cache, {data: {addSharedImage}}) {
      const {sharedImages} = cache.readQuery({
        query: queries.GET_SHARED_IMAGES
      });
      cache.writeQuery({
        query: queries.GET_SHARED_IMAGES,
        data: {sharedImages: [...sharedImages, addSharedImage]}
      });
    }
  });

  const [addArtist] = useMutation(queries.ADD_ARTIST, {
    update(cache, {data: {addArtist}}) {
      const {artists} = cache.readQuery({
        query: queries.GET_ARTISTS
      });
      cache.writeQuery({
        query: queries.GET_ARTISTS,
        data: {artists: [...artists, addArtist]}
      });
    }
  });

  const [addAlbum] = useMutation(queries.ADD_ALBUM, {
    update(cache, {data: {addAlbum}}) {
      const {albums} = cache.readQuery({
        query: queries.GET_ALBUMS
      });
      cache.writeQuery({
        query: queries.GET_ALBUMS,
        data: {albums: [...albums, addAlbum]}
      });
    }
  });

  const [addCompany] = useMutation(queries.ADD_COMPANY, {
    update(cache, {data: {addCompany}}) {
      const {companies} = cache.readQuery({
        query: queries.GET_COMPANIES
      });
      cache.writeQuery({
        query: queries.GET_COMPANIES,
        data: {companies: [...companies, addCompany]}
      });
    }
  });

  const onSubmitArtist = (e) => {
    e.preventDefault();
    try{
      let name = document.getElementById('name');
      let dateFormed = document.getElementById('dateFormed');
      let members = document.getElementById('members');
  
      // assuming date input as yyyy-mm-dd and converting to mm/dd/yyyy
      let splitDate = dateFormed.value.split('-');
      if(splitDate.length != 3){
        throw "Invalid date";
      }
      let year = splitDate[0];
      let month = splitDate[1];
      let day = splitDate[2];
      let formattedDate = month.toString() + "/" + day.toString() + "/" + year.toString();
      //date_formed.value = formattedDate;

      // check members real quick
      if(members.value == null || members.value == undefined || !members.value.length){
        throw "Invalid members";
      }
      let splitMembers = members.value.split(',');

      addArtist({
        variables: {
          name: name.value,
          dateFormed: dateFormed.value,
          members: splitMembers
        }
      });
  
      document.getElementById('add-artist').reset();
      alert('Artist Added');
    }
    catch(ex){
      alert(ex);
    }

    props.closeAddFormState();
  };

  const onSubmitAlbum = (e) => {
    e.preventDefault();
    try{
      let title = document.getElementById('title');
      let releaseDate = document.getElementById('releaseDate');
      let genre = document.getElementById('genre');
      let artistId = document.getElementById('artistId');
      let companyId = document.getElementById('companyId');
      let songs = document.getElementById('songs');
  
      // assuming date input as yyyy-mm-dd and converting to mm/dd/yyyy
      let splitDate = releaseDate.value.split('-');
      if(splitDate.length != 3){
        throw "Invalid date";
      }

      // check members real quick
      if(songs.value == null || songs.value == undefined || !songs.value.length){
        throw "Invalid songs";
      }
      let splitSongs = songs.value.split(',');

      addAlbum({
        variables: {
          title: title.value,
          releaseDate: releaseDate.value,
          songs: splitSongs,
          genre: genre.value,
          artistId: artistId.value,
          companyId: companyId.value,
        }
      });
  
      document.getElementById('add-album').reset();
      alert('Albumed Added');
    }
    catch(ex){
      alert(ex);
    }

    props.closeAddFormState();
  };

  const onSubmitCompany = (e) => {
    e.preventDefault();
    try{
      let name = document.getElementById('name');
      let foundedYear = document.getElementById('foundedYear');
      let country = document.getElementById('country');

      addCompany({
        variables: {
          name: name.value,
          foundedYear: parseInt(foundedYear.value),
          country: country.value
        }
      });
  
      document.getElementById('add-company').reset();
      alert('Company Added');
    }
    catch(ex){
      alert(ex);
    }

    props.closeAddFormState();
  };

  const onSubmitSharedImage = (e) => {
    e.preventDefault();
    try{
      let description = document.getElementById('description');
      let image = document.getElementById('uploaded-image');
      let userId = "1";

      // addSharedImage({
      //   variables: {
      //     userId: userId,
      //     image: image.src,
      //     dateFormed: "03/31/1994",
      //     description: description.value,
      //   }
      // });

      const file = selectedFile;
      singleUpload({ variables: { file: file } });
  
      document.getElementById('add-shared-image').reset();
    }
    catch(ex){
      alert(ex);
    }

    props.closeAddFormState();
  };

  let body = null;
  if (props.type === 'sharedImage'){
    console.log('at shared image add');
    body = (
      <div className='card'>
              {selectedImage && (
        <div>
          <img
            id='uploaded-image'
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
      <br />
      <form className='form' id='add-shared-image' onSubmit={onSubmitSharedImage}>
          <div className='form-group'>
            <label>
              Description:
              <input id='description' required autoFocus={true} />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <input
              id='shared-image-input'
              type="file"
              name="image"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedFile(event.target.files[0]);
              }}
            />
          </div>
          <button className='button add-button' type='submit'>
            Upload Image
          </button>
          <button
            type='button'
            className='button cancel-button'
            onClick={() => {
              document.getElementById('add-shared-image').reset();
              props.closeAddFormState();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
  return <div>{body}</div>;
}

export default Add;
