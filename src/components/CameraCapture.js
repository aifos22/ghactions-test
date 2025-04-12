// src/components/CameraCapture.js

export function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                const videoElement = document.querySelector("#video");
                videoElement.srcObject = stream;
                window.currentStream = stream;
            })
            .catch(function (error) {
                console.error("Error al acceder a la cámara: ", error);
            });
    } else {
        console.error("La API getUserMedia no está soportada.");
    }
}

export function captureImage() {
    const canvas = document.createElement('canvas');
    const videoElement = document.querySelector("#video");
    const context = canvas.getContext('2d');

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');
    console.log("Imagen capturada:", imageData);
    window.currentStream.getTracks().forEach(track => track.stop());
}
