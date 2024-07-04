import { useState } from "react";

const useLoadImageBase64 = (src: string) => {
  const [base64Image, setBase64Image] = useState('');

  
    const img = new Image();
    img.src = src;
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL('image/png');
      setBase64Image(dataURL);
    };
  

  return base64Image
}

export default useLoadImageBase64;