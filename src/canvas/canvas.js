import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setDrawing] = useState(false);
  const [allX, addAllX] = useState([]);
  const [allY, addAllY] = useState([]);
  const [oldXY, setOldXY] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = 1800;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `900px`;
    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    contextRef.current = context;
  }, []);
  const startDrawing = ({ nativeEvent }) => {
    const { x, y } = nativeEvent;
    addAllX([x]);
    addAllY([y]);
    setDrawing(true);
  };

  const checkXY = (x, y) => {
    if (x !== oldXY[0] || y !== oldXY[1]) {
      setOldXY([x, y]);
      const newX = [x, ...allX];
      const newY = [y, ...allY];
      addAllX(newX);
      addAllY(newY);
    }
  };

  const findCenter = (arr) => {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  };

  const findRadius = (arrX, arrY) => {
    const diffX = Math.max(...arrX) - Math.min(...arrX);
    const diffY = Math.max(...arrY) - Math.min(...arrY);
    return (diffX + diffY) / 4;
    //2 для получения среднего и 2 для получения радиуса из диаметра
  };

  const finishDrawing = ({ nativeEvent }) => {
    const { x, y } = nativeEvent;
    checkXY(x, y);
    contextRef.current.beginPath();
    contextRef.current.arc(
      findCenter(allX),
      findCenter(allY),
      findRadius(allX, allY),
      0,
      2 * Math.PI
    );
    contextRef.current.stroke();
  };

  const draw = ({ nativeEvent }) => {
    const { x, y } = nativeEvent;
    if (!isDrawing) {
      return;
    }
    checkXY(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <canvas
        style={{ border: "1px solid #000000" }}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <button onClick={clearCanvas} style={{ fontSize: "2em", width: "100px" }}>
        Clear
      </button>
      ;
    </div>
  );
};
export default Canvas;
