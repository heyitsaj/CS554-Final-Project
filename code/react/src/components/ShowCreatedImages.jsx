import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Add from './Add'
import {useQuery} from '@apollo/client';
import queries from '../queries'
import EditCreatedImageModal from './EditCreatedImageModal';
import DeleteCreatedImageModal from './DeleteCreatedImageModal';
import Navigation from './Navigation';

export default function ShowCreatedImages() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [editImage, setEditImage] = useState(null);
  const [deleteImage, setDeleteImage] = useState(null);

  const {loading, error, data} = useQuery(queries.GET_CREATED_IMAGES, {
    fetchPolicy: 'cache-and-network'
  });

  const handleOpenEditModal = (image) => {
    setShowEditModal(true);
    setEditImage(image);
  };

  const handleOpenDeleteModal = (image) => {
    setShowDeleteModal(true);
    setDeleteImage(image);
  };
  const closeAddFormState = () => {
    setShowAddForm(false);
    
  };

  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };
  
  if (data) {
    const {createdImages} = data;
    return (
      <div>
        <Navigation />
        <h1>Welcome to the Created Images Page!</h1>
        <h3>Here you can upload images and edit images.</h3>
        <button className='button' onClick={() => setShowAddForm(!showAddForm)}>
            Upload Created Image
        </button>
        {showAddForm && (
            <Add type='createdImage' closeAddFormState={closeAddFormState} />
        )}
        <br />
        <br />
  
        {createdImages && createdImages.map((createdImage) => {
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
                  <p>Description: {createdImage.description}</p>
                  <button
                    className='button'
                    onClick={() => {
                      handleOpenEditModal(createdImage);
                    }}
                  >
                    Edit
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
