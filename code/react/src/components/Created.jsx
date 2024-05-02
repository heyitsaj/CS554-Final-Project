import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const CreatedImages = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  useEffect(() => {
    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {backgroundColor: 'white'});

    fabricCanvas.current = canvas;

    // Enable free drawing
    canvas.isDrawingMode = true;

    // Customize drawing settings
    canvas.freeDrawingBrush.color = 'black'; // Set the brush color
    canvas.freeDrawingBrush.width = 5; // Set the brush width

    return () => {
      // Clean up Fabric.js resources when the component is unmounted
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />;
};

export default CreatedImages;
