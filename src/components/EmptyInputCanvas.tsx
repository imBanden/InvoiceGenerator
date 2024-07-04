import { useEffect, useRef } from "react";

interface Props {
  height: number;
  width: number;
}

const EmptyInputCanvas = ({ height, width }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    canvas.height = height;
    canvas.width = width;
    const context = canvas.getContext("2d")!;

    const row = Math.ceil(height / 4);
    const col = Math.ceil(width / 4);

    const imageList = Array(row * col);

    let currX = 0;
    let currY = 0;

    for (let i = 0; i < imageList.length; i++) {
      if (currX >= width) {
        currX = 0;
        currY += 4;
      }
      imageList[i] = {
        litUp: Math.random() > 0.01,
        delay: 6000 * Math.random(),
        duration: 500 * Math.random(),
        coordinates: [
          [currX, currY],
          [currX + 1, currY],
          [currX, currY + 1],
          [currX + 1, currY + 1],
        ],
      };

      currX += 4;
    }

    let startTime = performance.now();

    function animate() {
      let currentTime = performance.now();
      const imageData = context.createImageData(width, height);
      for (let image of imageList) {
        const litUp = image.litUp;
        const delay = image.delay;
        const duration = image.duration;

        currentTime = performance.now();
        const timeTaken = currentTime - startTime;
        const timeRange = timeTaken > delay && timeTaken < delay + duration;
        for (let coor of image.coordinates) {
          const imageIndex = coor[0] * 4 + coor[1] * width * 4;
          imageData.data[imageIndex + 0] = litUp && timeRange ? 0 : 0; // R value
          imageData.data[imageIndex + 1] = litUp && timeRange ? 144 : 0; // G value
          imageData.data[imageIndex + 2] = litUp && timeRange ? 255 : 0; // B value
          imageData.data[imageIndex + 3] = litUp && timeRange ? 100 : 15; // A value
        }
      }
      context.putImageData(imageData, 0, 0);

      if (currentTime - startTime > 6000) {
        startTime = performance.now();
      }
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
};

export default EmptyInputCanvas;
