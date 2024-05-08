import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Add from './Add'
import {useQuery, useMutation} from '@apollo/client';
import queries from '../queries'
import EditCreatedImageModal from './EditCreatedImageModal';
import DeleteCreatedImageModal from './DeleteCreatedImageModal';
import Navigation from './Navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase-src';
import * as userHelper from "./UserHelpers.js";

export default function ShowCreatedImages() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [guess, setGuess] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [editCreatedImage] = useMutation(queries.EDIT_CREATED_IMAGE);
  const [updateUser] = useMutation(queries.UPDATE_USER);

  const [deleteImage, setDeleteImage] = useState(null);

  const {loading, error, data} = useQuery(queries.GET_CREATED_IMAGES, {
    fetchPolicy: 'cache-and-network'
  });

  // Collect user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const usersData = useQuery(queries.GET_USERS);

  const handleGuess = (users, image) => {
    let guess = document.getElementById(image._id).value;
    if(guess && guess.trim() !== ""){
      // check if guess matches image description
      if(guess === image.description) { // guessed correct, update database
        let user = userHelper.getUser(users, image.userId);
        if(user){
          editCreatedImage({
            variables: {
              id: image._id,
              userId: image.userId,
              image: image.image,
              description: image.description,
              solvedBy: user.email
            }
          });
  
          let newSolvedImages = user.numOfSolvedImages + 1;
          updateUser({
            variables: {
              id: user._id,
              numOfSolvedImages: newSolvedImages
            }
          });
        }

        navigate('/Leaderboard');
      }
      else{
        alert("INCORRECT GUESS");
      }
    }
  };

  const handleOpenDeleteModal = (image) => {
    setShowDeleteModal(true);
    setDeleteImage(image);
  };


  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };
  
  if(data && usersData && usersData.data && usersData.data.users){
    const {createdImages} = data;
    const users = usersData.data.users;
    return (
      <div>
        
        <h1>Welcome to the Created Images Page!</h1>
        <h3>Here you can guess drawings!</h3>
        <Navigation />
        <br />
        <br />
  
        {createdImages && createdImages.map((createdImage) => {
            console.log(createdImages.length)
            if(createdImage.solvedBy === "none"){
              return (
                <div className='card' key={createdImage._id}>
                  <div className='card-body'>
                    <img src={createdImage.image} alt="Created Image" width="500" height="600"></img>
                    <p>Created on {new Date(createdImage.dateFormed).toLocaleDateString()} by {userHelper.renderUserEmail(users, createdImage.userId)}</p>
                    <div className='form-group'>
                      <label>
                          Guess:
                        <input id={createdImage._id}/>
                      </label>
                    </div>
                  <button
                      className='button'
                      onClick={() => {
                        handleGuess(users, createdImage);
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
            }
            else {
              return (
                <div className='card' key={createdImage._id}>
                  <div className='card-body'>
                    <img src={createdImage.image} alt="Created Image" width="500" height="600"></img>
                    <p>Created on {new Date(createdImage.dateFormed).toLocaleDateString()} by {userHelper.renderUserEmail(users, createdImage.userId)}</p>
                    <p>Description: {createdImage.description}</p>
                    <p>Solved by: {createdImage.solvedBy}</p>
                    <br />
                  </div>
                </div>
              );
            }
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
