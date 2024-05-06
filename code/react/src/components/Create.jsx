import { Link, useNavigate } from 'react-router-dom';
import './Created.css'
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOutUser } from '../firebase/firebase-src';
import queries from '../queries';
import {useMutation} from '@apollo/client';
import Navigation from './Navigation';

const Create = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [color, setColor] = useState('black');
  const [size, setSize] = useState(5);
  const [user, setUser] = useState(null);

  const [addCreatedImage] = useMutation(queries.ADD_CREATED_IMAGE, {
    update(cache, {data: {addCreatedImage}}) {
      const {createdImages} = cache.readQuery({
        query: queries.GET_CREATED_IMAGES
      });
      cache.writeQuery({
        query: queries.GET_CREATED_IMAGES,
        data: {createdImages: [...createdImages, addCreatedImage]}
      });
    }
  });

  useEffect(() => {
    const signedIn = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => signedIn();
  }, []);

  const onSignUpOrLogin = () => {
    navigate('/signUpOrLogin');
  }

  const onSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
      navigate('/');
    } catch(e) {
      console.error(e);
    }
  }

  const handleSubmit = (e) => {
    // Figure this is where GQL query is run,
    // Sending Encoded Image data, User data,
    // and Pictogram answer to DB
    e.preventDefault();
    // TODO: Implement form submission
    console.log(`KEYS: ${Object.keys(e)}`);
    const canvas = document.getElementById("canvas");
    const dataURL = canvas.toDataURL();
    const description = "test description";
    addCreatedImage({
      variables: {
        userId: "1",
        image: dataURL,
        dateFormed: new Date(),
        description: description
      }
    });

  }

  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = 750 * pixelRatio;
    canvas.height = 750 * pixelRatio;

    const fabricCanvasInstance = new fabric.Canvas(canvas, {
      backgroundColor: 'white',
    });

    fabricCanvasInstance.setHeight(750);
    fabricCanvasInstance.setWidth(750);

    fabricCanvasInstance.setZoom(pixelRatio);

    fabricCanvas.current = fabricCanvasInstance;

    fabricCanvasInstance.isDrawingMode = true;

    fabricCanvasInstance.freeDrawingBrush.color = color;
    fabricCanvasInstance.freeDrawingBrush.width = size;

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

          img.scale(scale / pixelRatio);

          fabricCanvasInstance.add(img).setActiveObject(img).renderAll();
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    });

    return () => {
      fabricCanvasInstance.dispose();
    };
  }, []);

  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.freeDrawingBrush.width = size;
    }
  }, [size]);

  return (

    <div className="drawPad" >
      <Navigation />
      <div className="footer">
        <p>Brush Size: {size} px</p>
        <input
          onChange={handleSizeChange}
          type="range"
          orient="vertical"
          min={1}
          max={50}
          value={size}
        />
        <canvas
          id="canvas"
          ref={canvasRef}
          width={750}
          height={750}
          style={{ border: '1px solid black' }}
        />
        <div className="uploads">
          <form onSubmit={handleSubmit}>
            <label className="pictogramAnswer">
              <p>
              Pictogram Answer:
              </p>
              <input name="pictogramAnswer" 
              />
              <button type="submit">Submit Pictogram!</button>
            </label>
          </form>
          
          <label className="appFileInput button">
            <i className="iconEnter"></i>
              <input type="file"
                id="local"
                accept="image/*"
              />
          </label>
          
        </div>
      </div>
    </div>
  );
};

export default Create;
