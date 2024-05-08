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

function EditCreatedImageModal(props) {
  const [showEditModal, setShowEditModal] = useState(props.isOpen);
  const {loading, error, data} = useQuery(queries.GET_CREATED_IMAGES);
  const [editCreatedImage] = useMutation(queries.EDIT_CREATED_IMAGE);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCreatedImage(null);
    props.handleClose();
  };

  let description;
  let image;
  if (data) {
    var {createdImages} = data;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {/*Edit CreatedImage Modal - NOT DONE YET */}
      <ReactModal
        name='editModal'
        isOpen={showEditModal}
        contentLabel='Edit CreatedImage'
        style={customStyles}
      >
        <form
          className='form'
          id='add-createdImage'
          onSubmit={(e) => {
            image = document.getElementById('image');
            description = document.getElementById('description');

            e.preventDefault();
            editCreatedImage({
              variables: {
                id: props.createdImage._id,
                userId: props.createdImage.userId,
                image: props.createdImage.image,
                description: description.value,
                solvedBy: "current user"
              }
            });
            description.value = '';
            setShowEditModal(false);

            alert('CreatedImage Updated');
            props.handleClose();
          }}
        >
          <div className='card' key={props.createdImage._id}>
                <div className='card-body'>
                  <h2 className='card-title'>
                    {props.createdImage._id}
                  </h2>
                  <h3 className='card-title'>
                    Image: {props.createdImage._id}
                  </h3>
                  <img src={props.createdImage.image} alt="Created Image" width="500" height="600"></img>
                  <label>
                    Description:
                    <input id='description' autoFocus={true} />
                  </label>
                </div>
          </div>
          <button className='button add-button' type='submit'>
            Update Created Image
          </button>
        </form>

        <button className='button cancel-button' onClick={handleCloseEditModal}>
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default EditCreatedImageModal;
