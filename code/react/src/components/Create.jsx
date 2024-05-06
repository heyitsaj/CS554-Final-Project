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
  const navigate = useNavigate();
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
    navigate('/ShowCreatedImages')
  }

  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value.toString(), 10));
  };
  const handleColorChange = (e) => {
    setColor(e.target.value)
  }
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
  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.freeDrawingBrush.color = color;
    }
  }, [color]);

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
    </div>
  );
};

export default Create;
