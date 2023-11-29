import React, { useState, useEffect } from 'react';

const ImageChecker = ({ photoUrl }) => {
    const [isValidImage, setIsValidImage] = useState(true);

    const checkImage = () => {
        const img = new Image();
        img.src = photoUrl;

        img.onload = () => {
            setIsValidImage(true);
        };

        img.onerror = () => {
            setIsValidImage(false);
        };
    };

    // Call checkImage function when the component mounts
    useEffect(() => {
        checkImage();
    }, [photoUrl]);

    return (
        <img src={isValidImage ? photoUrl : import.meta.env.VITE_DEFAULT_PHOTO } alt="" />
    );
};

export default ImageChecker;
