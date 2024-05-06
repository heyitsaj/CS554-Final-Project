import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useQuery, useMutation } from '@apollo/client';
import { fabric } from 'fabric';
import queries from '../queries';

ReactModal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: '10px',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    height: '80vh',
    border: '1px solid #28547a',
    borderRadius: '4px',
  },
};

function EditSharedImageModal(props) {
  const [showEditModal, setShowEditModal] = useState(props.isOpen);
  const { loading, error, data } = useQuery(queries.GET_SHARED_IMAGES);
  const [editSharedImage] = useMutation(queries.EDIT_SHARED_IMAGE);
  const [canvas, setCanvas] = useState(null);

  const handleModalAfterOpen = () => {
    const newCanvas = new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'white',
    });

    setCanvas(newCanvas);

    const imgElement = document.getElementById('my-image');
    if (imgElement) {
      const imgInstance = new fabric.Image(imgElement, {
        left: 0,
        top: 0,
      });
      newCanvas.add(imgInstance);
    }
  };

  const handleCloseEditModal = () => {
    if (canvas) {
      canvas.dispose();
    }
    setShowEditModal(false);
    props.handleClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <ReactModal
        name="editModal"
        isOpen={showEditModal}
        contentLabel="Edit Shared Image"
        style={customStyles}
        onAfterOpen={handleModalAfterOpen}
      >
        <form
          className="form"
          id="add-sharedImage"
          onSubmit={(e) => {
            e.preventDefault();

            const description = document.getElementById('description').value;

            editSharedImage({
              variables: {
                id: props.sharedImage._id,
                userId: props.sharedImage.userId,
                image: props.sharedImage.image,
                description,
              },
            });

            setShowEditModal(false);
            props.handleClose();
          }}
        >
          <div className="card" key={props.sharedImage._id}>
            <div className="card-body">
              <h2 className="card-title">Image: {props.sharedImage._id}</h2>
              <h3 className="card-title" style={{fontSize:'0px'}}>{props.sharedImage.image}</h3>
              <canvas id="canvas" style={{ border: '1px solid black' }}></canvas>
              <img
                id="my-image"
                src={props.sharedImage.image}
                alt="Shared Image"
                width="0"
              />
              <label>
                Description:
                <input id="description" autoFocus={true} />
              </label>
            </div>
          </div>
          <button className="button add-button" type="submit">
            Update Shared Image
          </button>
        </form>

        <button
          className="button cancel-button"
          onClick={handleCloseEditModal}
        >
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default EditSharedImageModal;
