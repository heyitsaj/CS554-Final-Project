import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { useQuery, useMutation} from '@apollo/client';
import { fabric } from 'fabric';
import queries from '../queries';
import './Created.css'

ReactModal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: '10px',
    transform: 'translate(-50%, -50%)',
    height: '80vh',
    border: '1px solid #28547a',
    borderRadius: '4px',
  },
};

function EditSharedImageModal(props) {
  const [showEditModal, setShowEditModal] = useState(props.isOpen);
  const { loading, error, data } = useQuery(queries.GET_SHARED_IMAGES);
    const [editSharedImage] = useMutation(queries.EDIT_SHARED_IMAGE, {
    update(cache, { data: { editSharedImage } }) {
      // Find the relevant cache data to update
      const existingData = cache.readQuery({
        query: queries.GET_SHARED_IMAGES,
      });
      // Update the specific image in the cache
      const updatedData = existingData.sharedImages.map((image) => {
        if (image._id === editSharedImage._id) {
          console.log(editSharedImage)
          return {
            ...image, // Existing image data
            ...editSharedImage, // New data from the mutation response
          };
        }
        return image;
      });
      console.log(updatedData)
      // Write the updated data back to the cache
      cache.writeQuery({
        query: queries.GET_SHARED_IMAGES,
        data: { sharedImages: updatedData },
      });
    },
  });
  const fabricCanvas = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const [color, setColor] = useState('black');
  const [size, setSize] = useState(5);
  const [brush, setBrush] = useState(true);
  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.isDrawingMode = brush;
    }
  }, [brush]);
  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.freeDrawingBrush.width = size;
    }
  }, [size]);
  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.freeDrawingBrush.color = color;
    }
  }, [color]);
  const initializeCanvasWithImage = (imageSrc) => {
    const imgElement = new Image(); // Create an off-screen image
    imgElement.src = imageSrc;

    imgElement.onload = () => {
      const canvasWidth = imgElement.width;
      const canvasHeight = imgElement.height;

      const newCanvas = new fabric.Canvas('canvas', {
        height: canvasHeight,
        width: canvasWidth,
        backgroundColor: 'white',
      });
      fabricCanvas.current = newCanvas;

      newCanvas.isDrawingMode = brush;

      newCanvas.freeDrawingBrush.color = color;
      newCanvas.freeDrawingBrush.width = size;

      setCanvas(newCanvas);

      const imgInstance = new fabric.Image(imgElement, {
        left: 0,
        top: 0,
      });

      newCanvas.add(imgInstance);
      document.getElementById('local').addEventListener("change", function (e) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var localImage = new Image();
        localImage.src = e.target.result;
                  
        localImage.onload = function() {
          var img = new fabric.Image(localImage);
          img.set({
            left: 0,
            top: 0
          });
          
          var scale = Math.min(750 / img.width, 750 / img.height)

          img.scale(scale);

          newCanvas.add(img).renderAll();
          newCanvas.isDrawingMode = false;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    });

    return () => {
      newCanvas.dispose();
    };
    };
  };
  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value.toString(), 10));
  };
  const handleColorChange = (e) => {
    setColor(e.target.value)
  }
  const handleTool = (e) => {
    if(e.target.value == "brush"){
      setBrush(true);
    }else{
      setBrush(false);
    }
  }

  const handleModalAfterOpen = () => {
    initializeCanvasWithImage(props.sharedImage.image);
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
                userId: props.user.uid,
                image: fabricCanvas.current.toDataURL('image/JPEG;base64'),
                description: description
              },
            });

            setShowEditModal(false);
            props.handleClose();
          }}
        >
          <div className="card" key={props.sharedImage._id}>
            <div className="card-body">
              <h2 className="card-title">Image: {props.sharedImage._id}</h2>
              <div className="footer">
                <div>
                  <div style={{display: "flex", flexDirection: "row"}}>
                    <p>Brush Size: {size} px</p>
                    <input
                      onChange={handleSizeChange}
                      type="range"
                      orient="vertical"
                      min={1}
                      max={50}
                      value={size}
                    />
                  </div>
                  <div className="toolSelect" style={{display:"flex", flexDirection:"column"}} onClick={handleTool}>
                    <label htmlFor='move'>
                      <input type="radio" id='move' name="color" value="move" hidden />
                      <img className='icon' src='/move-icon.svg' width={100}></img>
                    </label>
                    <label htmlFor='brush'>
                      <input type="radio" id='brush' name="color" value="brush" hidden />
                      <img className='icon' src='/draw-icon.svg' width={100}></img>
                    </label>
                  </div>
                </div>
                
                <canvas
                  id="canvas"
                  ref={canvasRef}
                  width={750}
                  height={750}
                  style={{ border: '1px solid black' }}
                />
                <div className="uploads">
                  

                <div className="colorSelect" onClick={handleColorChange}>
                    <label htmlFor='red'>
                      <input type="radio" id='red' name="color" value="red" hidden />
                      <div className="colorBox" style={{ background: 'red', height: '4vh', width: '4vw', border: "1px solid black"  }} data-color="red"></div>
                    </label>
                    <label htmlFor='orange'>
                      <input type="radio" id='orange' name="color" value="orange" hidden />
                      <div className="colorBox" style={{ background: 'orange', height: '4vh', width: '4vw', border: "1px solid black"   }} data-color="orange"></div>
                    </label>
                    <label htmlFor='yellow'>
                      <input type="radio" id='yellow' name="color" value="yellow" hidden />
                      <div className="colorBox" style={{ background: 'yellow', height: '4vh', width: '4vw', border: "1px solid black"   }} data-color="yellow"></div>
                    </label>
                    <label htmlFor='green'>
                      <input type="radio" id='green' name="color" value="green" hidden />
                      <div className="colorBox" style={{ background: 'green', height: '4vh', width: '4vw', border: "1px solid black"   }} data-color="green"></div>
                    </label>
                    <label htmlFor='blue'>
                      <input type="radio" id='blue' name="color" value="blue" hidden />
                      <div className="colorBox" style={{ background: 'blue', height: '4vh', width: '4vw', border: "1px solid black"   }} data-color="blue"></div>
                    </label>
                    <label htmlFor='indigo'>
                      <input type="radio" id='indigo' name="color" value="indigo" hidden />
                      <div className="colorBox" style={{ background: 'indigo', height: '4vh', width: '4vw', border: "1px solid black"   }} data-color="indigo"></div>
                    </label>
                    <label htmlFor='violet'>
                      <input type="radio" id='violet' name="color" value="violet" hidden />
                      <div className="colorBox" style={{ background: 'violet', height: '4vh', width: '4vw', border: "1px solid black"   }} data-color="violet"></div>
                    </label>
                    <label htmlFor='black'>
                      <input type="radio" id='black' name="color" value="black" hidden />
                      <div className="colorBox" style={{ background: 'black', height: '4vh', width: '4vw', border: "1px solid black"   }} data-color="black"></div>
                    </label>
                    <label htmlFor='white'>
                      <input type="radio" id='white' name="color" value="white" hidden />
                      <div className="colorBox" style={{ background: 'white', height: '4vh', width: '4vw', border: "1px solid black"   }} data-color="white"></div>
                    </label>
                  </div>
                  
                  <label className="appFileInput button">
                    <i className="iconEnter"></i>
                      <input type="file"
                        id="local"
                        accept="image/*"
                      />
                  </label>
                  
                </div>
              </div>
              <img
                id="my-image"
                src={props.sharedImage.image}
                alt="Shared Image"
                style={{ display: 'none' }} // Keep this hidden
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
