import Form from "./components/Form";
import registerBackground from "./assets/register.jpg";
import { useState, useEffect } from "react";

function App() {
  const [imagePosition, setImagePosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImagePosition((prevPosition) => prevPosition + 5);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <Form />
      </div>
      <div className="relative lg:flex h-full w-1/2 bg-gray-200 flex items-center justify-center">
        <div
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-cover bg-center bg-no-repeat rounded-full shadow-lg border-4 border-gray-300 animate-bounce"
          style={{ backgroundImage: `url(${registerBackground})`, transform: `translateX(-${imagePosition}px)` }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-violet-500 to-pink-500 animate-pulse">
            {/* Textul este eliminat complet */}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
