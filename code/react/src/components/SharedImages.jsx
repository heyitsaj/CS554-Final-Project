import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Add from './Add'
import {useQuery} from '@apollo/client';
import queries from '../queries'
import EditSharedImageModal from './EditSharedImageModal';
import DeleteSharedImageModal from './DeleteSharedImageModal';

export default function SharedImages() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [editImage, setEditImage] = useState(null);
  const [deleteImage, setDeleteImage] = useState(null);

  const {loading, error, data} = useQuery(queries.GET_SHARED_IMAGES, {
    fetchPolicy: 'cache-and-network',
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
    
    navigate("/SharedImages"); // trigger update
  };
  
  if (data) {
    const {sharedImages} = data;
    return (
      <div>
        <h1>Welcome to the Shared Images Page!</h1>
        <h3>Here you can upload images and edit images.</h3>
        <button className='button' onClick={() => setShowAddForm(!showAddForm)}>
            Upload Shared Image
        </button>
        {showAddForm && (
            <Add type='sharedImage' closeAddFormState={closeAddFormState} />
        )}
        <br />
        <br />
  
        {sharedImages && sharedImages.map((sharedImage) => {
            return (
              <div className='card' key={sharedImage._id}>
                <div className='card-body'>
                  <h2 className='card-title'>
                  <Link className='navlink' to={{
                      pathname:`/SharedImages/${sharedImage._id}`
                  }}>       
                  {sharedImage._id}
                  </Link>
                  </h2>
                  <h3 className='card-title'>
                    Image: {sharedImage._id}
                  </h3>
                  <img src={sharedImage.image} alt="Shared Image" width="500" height="600"></img>
                  <p>Description: {sharedImage.description}</p>
                  <button
                    className='button'
                    onClick={() => {
                      handleOpenEditModal(sharedImage);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className='button'
                    onClick={() => {
                      handleOpenDeleteModal(sharedImage);
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
          <EditSharedImageModal
            isOpen={showEditModal}
            sharedImage={editImage}
            handleClose={handleCloseModals}
          />
        )}

        {showDeleteModal && (
          <DeleteSharedImageModal
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
