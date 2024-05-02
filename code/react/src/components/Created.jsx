import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const CreatedImages = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [color, setColor] = useState('black');
  const [size, setSize] = useState(5);

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
    <div className="drawPad">
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
    </div>
  );
};

export default CreatedImages;
