import React, {useState} from 'react';
import './App.css';
import ReactModal from 'react-modal';
import {useQuery, useMutation} from '@apollo/client';
//Import the file where my query constants are defined
import queries from '../queries';

//For react-modal
ReactModal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    border: '1px solid #28547a',
    borderRadius: '4px'
  }
};

function EditSharedImageModal(props) {
  const [showEditModal, setShowEditModal] = useState(props.isOpen);
  const [sharedImage, setSharedImage] = useState(props.sharedImage);
  const {loading, error, data} = useQuery(queries.GET_SHARED_IMAGES);
  const [editSharedImage] = useMutation(queries.EDIT_SHARED_IMAGE);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSharedImage(null);
    props.handleClose();
  };

  let description;
  let image;
  if (data) {
    var {sharedImages} = data;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {/*Edit SharedImage Modal - NOT DONE YET */}
      <ReactModal
        name='editModal'
        isOpen={showEditModal}
        contentLabel='Edit SharedImage'
        style={customStyles}
      >
        <form
          className='form'
          id='add-sharedImage'
          onSubmit={(e) => {
            image = document.getElementById('image');
            description = document.getElementById('description');

            e.preventDefault();
            editSharedImage({
              variables: {
                id: props.sharedImage._id,
                userId: props.sharedImage.userId,
                image: props.sharedImage.image,
                description: description.value
              }
            });
            description.value = '';
            setShowEditModal(false);

            alert('SharedImage Updated');
            props.handleClose();
          }}
        >
          <div className='card' key={props.sharedImage._id}>
                <div className='card-body'>
                  <h2 className='card-title'>
                    {props.sharedImage._id}
                  </h2>
                  <h3 className='card-title'>
                    Image: {props.sharedImage._id}
                  </h3>
                  <img src={props.sharedImage.image} alt="Shared Image" width="500" height="600"></img>
                  <label>
                    Description:
                    <input id='description' autoFocus={true} />
                  </label>
                </div>
          </div>
          <button className='button add-button' type='submit'>
            Update SharedImage
          </button>
        </form>

        <button className='button cancel-button' onClick={handleCloseEditModal}>
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default EditSharedImageModal;
