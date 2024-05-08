import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Add from './Add'
import {useQuery, useMutation} from '@apollo/client';
import queries from '../queries'
import EditCreatedImageModal from './EditCreatedImageModal';
import DeleteCreatedImageModal from './DeleteCreatedImageModal';
import Navigation from './Navigation';

export default function ShowCreatedImages() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [guess, setGuess] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [editCreatedImage] = useMutation(queries.EDIT_CREATED_IMAGE);

  const [deleteImage, setDeleteImage] = useState(null);

  const {loading, error, data} = useQuery(queries.GET_CREATED_IMAGES, {
    fetchPolicy: 'cache-and-network'
  });

  const handleGuess = (image) => {
    if(guess && guess.trim() !== ""){
      // check if guess matches image description
      if(guess === image.description) { // guessed correct, update database
        editCreatedImage({
          variables: {
            id: image._id,
            userId: image.userId,
            image: image.image,
            description: image.description,
            solvedBy: "current solved user"
          }
        });

        updateLeaderboard({
          variables: {
            id: image._id,
            userId: image.userId,
            image: image.image,
            description: image.description,
            solvedBy: "current solved user"
          }
        });
      }
      else{
        alert("INCORRECT GUESS");
      }
    }
  };

  const handleGuessUpdate = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setGuess(value);
  };

  const handleOpenDeleteModal = (image) => {
    setShowDeleteModal(true);
    setDeleteImage(image);
  };


  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };
  
  if (data) {
    const {createdImages} = data;
    return (
      <div>
        
        <h1>Welcome to the Created Images Page!</h1>
        <h3>Here you can guess drawings!</h3>
        <Navigation />
        <br />
        <br />
  
        {createdImages && createdImages.map((createdImage) => {
          console.log(createdImages.length)
            return (
              <div className='card' key={createdImage._id}>
                <div className='card-body'>
                  <h2 className='card-title'>
                  {createdImage._id}
                  </h2>
                  <h3 className='card-title'>
                    Image: {createdImage._id}
                  </h3>
                  <img src={createdImage.image} alt="Created Image" width="500" height="600"></img>
                  <p>Created on {new Date(createdImage.dateFormed).toLocaleDateString()} by GET USER HERE</p>
                  <p>Description: {createdImage.description}</p>
                  {
                    createdImage.solvedBy !== "none" ? 
                      <div className='form-group'>
                      <label>
                        Guess:
                        <input id='guessInput' onChange={handleGuessUpdate} />
                      </label>
                      </div>
                    :
                      
                    <p></p>
                  }

                  <button
                    className='button'
                    onClick={() => {
                      handleGuess(createdImage);
                    }}
                  >
                    Guess
                  </button>
                  <button
                    className='button'
                    onClick={() => {
                      handleOpenDeleteModal(createdImage);
                    }}
                  >
                    Delete
                  </button>
                  <br />
                </div>
              </div>
            );
        })}
        {showEditModal && (
          <EditCreatedImageModal
            isOpen={showEditModal}
            createdImage={editImage}
            handleClose={handleCloseModals}
          />
        )}

        {showDeleteModal && (
          <DeleteCreatedImageModal
            isOpen={showDeleteModal}
            handleClose={handleCloseModals}
            deleteImage={deleteImage}
          />
        )}
      </div>
    );
  }
  else if (loading) {
    return <div>Loading</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }
}
