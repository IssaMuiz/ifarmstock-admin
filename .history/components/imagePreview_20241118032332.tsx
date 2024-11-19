"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";

const ImagePreview = () => {
  const [preview, setPreview] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);

        if (previews.length === files.length) {
          setPreview(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div>
      <input
        type="file"
        name="images"
        accept="images/*"
        onChange={handleImageChange}
        required
      />

      {preview.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Preview ${index + 1}`}
          height={150}
          width={150}
        />
      ))}
    </div>
  );
};

export default ImagePreview;
