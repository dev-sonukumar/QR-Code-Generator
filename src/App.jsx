import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const App = () => {
  const [text, setText] = useState(""); // State to store user input
  const [showQRCode, setShowQRCode] = useState(false); // State to control QR code rendering
  const qrCodeRef = useRef(null); // Ref for QR code container

  // Generate QR Code
  const handleGenerateQR = () => {
    if (text.trim() === "") {
      alert("Please enter some text or a URL to generate a QR code.");
      setShowQRCode(false); // Hide QR code if input is empty
      return;
    }
    setShowQRCode(true); // Show QR code if input is valid
  };

  // Download QR Code
  const downloadQRCode = () => {
    const canvas = qrCodeRef.current.querySelector("canvas"); // Access the canvas element
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png"); // Convert to PNG
      const downloadLink = document.createElement("a"); // Create a download link
      downloadLink.href = pngUrl; // Set the href to the data URL
      downloadLink.download = "qr-code.png"; // Set the file name
      downloadLink.click(); // Trigger download
    } else {
      alert("QR Code not generated yet!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-4xl font-extrabold  mb-6 text-gray-800">
        QR Code Generator
      </h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {/* Input Field */}
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/*-- Generate Button --*/}
        <button
          onClick={handleGenerateQR}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          Generate QR Code
        </button>

        {/* QR Code Display */}

        {showQRCode && (
          <div
            className="w-full flex flex-col items-center justify-center mt-6 text-center"
            ref={qrCodeRef}
          >
            <QRCodeCanvas value={text} size={200} />
            {/* Download Button */}
            <button
              onClick={downloadQRCode}
              className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
