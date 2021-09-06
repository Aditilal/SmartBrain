import React from "react";
import './ImageRecognition.css'

const ImageRecognition = ({ImageUrl, box}) => {
return (
    <div style={{display:'flex',justifyContent:'center'}}>
        <img  id='inputimage' alt='hai' src={ImageUrl} width='500px' height='auto'/>
        <div className="bounding-box" style={{top: box.topRow,right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    </div>
);
}

export default ImageRecognition;