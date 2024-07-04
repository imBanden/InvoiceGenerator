import React from "react";

interface Props {
  label: string;
  imgSrc: (value: string) => void;
}
const ImageUploader = ({ label, imgSrc }: Props) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.length && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      if (file.size / (1024 * 1024) > 1) {
        //notify('File size is too big (max 1MB)', { type: 'error' });
      } else if (
        !["image/png", "image/jpeg", "image/jpg"].includes(file.type)
      ) {
        // notify('File type is not supported (PNG or JPG only)', {
        //   type: 'error',
        // });
      } else {
        reader.addEventListener("load", (e) => {
          // setNewImage(e.target?.result as string);
          imgSrc(e.target?.result as string);
        });
        reader.readAsDataURL(file);
        //newFileRef.current = file;
      }
    }
  };

  const handleClick = () => {
    console.log(fileInputRef);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="label-input-container pad-20px">
      <label className="my-company-form-labels">{label}</label>
      <div className="image-uploader-container">
        <div className="image-uploader-button" onClick={handleClick}>
          <input
            accept="image/*"
            type="file"
            onChange={handleChange}
            className="image-uploader-input"
            ref={fileInputRef}
            hidden
          />
          <img
            className="image-uploader-logo"
            src="/assets/MaterialSymbolsAdd.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
