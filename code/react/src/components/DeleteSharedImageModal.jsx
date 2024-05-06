import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import ReactModal from 'react-modal';


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

function DeleteSharedImageModal(props) {
  const [showDeleteModal, setShowDeleteModal] = useState(props.isOpen);
  const [image, setImage] = useState(props.deleteImage);

  const [removeImage] = useMutation(queries.DELETE_SHARED_IMAGE, {
    update(cache) {
      cache.modify({
        fields: {
          createdImages(existingImages, { readField }) {
            return existingImages.filter(
              empRef => image._id !== readField('_id', empRef),
            );
          },
        },
      });
    },
  });

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setImage(null);
    props.handleClose();
  };

  return (
    <div>
      {/*Delete Image Modal */}
      <ReactModal
        name='deleteModal'
        isOpen={showDeleteModal}
        contentLabel='Delete Image'
        style={customStyles}
      >
        <div>
          <p>
            Are you sure you want to delete this image?
          </p>

          <form
            className='form'
            id='delete-image'
            onSubmit={(e) => {
              e.preventDefault();
              removeImage({
                variables: {
                  id: image._id
                }
              });
              setShowDeleteModal(false);

              alert('Image Deleted');
              props.handleClose();
            }}
          >
            <br />
            <br />
            <button className='button add-button' type='submit'>
              Delete Image
            </button>
          </form>
        </div>

        <br />
        <br />
        <button
          className='button cancel-button'
          onClick={handleCloseDeleteModal}
        >
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default DeleteSharedImageModal;
