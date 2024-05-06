import { Link, useNavigate } from 'react-router-dom';
import './Created.css'
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOutUser } from '../firebase/firebase-src';

const CreatedImages = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [color, setColor] = useState('black');
  const [size, setSize] = useState(5);
  const [user, setUser] = useState(null);

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

  const handleSubmit = async () => {
    // Figure this is where GQL query is run,
    // Sending Encoded Image data, User data,
    // and Pictogram answer to DB

    // TODO: Implement form submission
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
      <div className="header">
      <h1 style={{ textAlign: 'center' }}>Welcome to Pictogram!</h1>
      {user ?
       <button
         onClick={onSignOut}
         style={{ position: 'fixed', top: 30, right: 10, borderColor: 'black' }}
       >
         Sign Out
       </button> :
      <button
        onClick={onSignUpOrLogin}
        style={{ position: 'fixed', top: 30, right: 10, borderColor: 'black' }}
      >
        Sign Up/Login
      </button>}
      <nav className='nav-bar'>
        <Link className='nav-link' to='/SharedImages' // onClick={user ? undefined : (e) => {
          // e.preventDefault();
          // alert("You must have an account to access this feature.")
        //}}
        >
          Image Sharing
        </Link>
        <Link className='nav-link' to='/CreatedImages' // onClick={user ? undefined : (e) => {
          // e.preventDefault();
          // alert("You must have an account to access this feature.")
        //}}
        >
          Image Creation
        </Link>
        <Link className='nav-link' to='/Leaderboard' // onClick={user ? undefined : (e) => {
          //e.preventDefault();
          //alert("You must have an account to access this feature.")
        //}}
        >
          Leaderboard
        </Link>
        <Link className='nav-link' to='/AboutUs'>
          About Us
        </Link>
      </nav>
      </div>
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

export default CreatedImages;
