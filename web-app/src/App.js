import Form from "./components/Form";
import { useState, useEffect } from "react";

function App() {
  const [textPosition, setTextPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextPosition((prevPosition) => prevPosition + 1);
    }, 100); // Viteza de mișcare a textului (în milisecunde)
    return () => clearInterval(interval);
  }, []); // Efectul se activează o singură dată la încărcarea componentei

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <Form />
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-6xl font-bold text-gradient bg-gradient-to-r from-violet-500 to-pink-500 animate-bounce">
            TransShare
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
