// src/pages/CameraPage.js

import { startCamera, captureImage } from '../components/CameraCapture';

export default function CameraPage() {
    return (
        <div>
            <video id="video" width="640" height="480" autoplay></video>
            <button onClick={captureImage}>Capturar Imagen</button>
            <button onClick={startCamera}>Iniciar Cámara</button>
        </div>
    );
}
