import React, { useState } from 'react';
import LoginForm from "./components/LoginForm";
import registerBackground from "./assets/register.jpg"; 
import SignUpForm from "./components/SignUpForm";

function App() {
  const [authState, setAuthState] = useState('login'); 

  return (
    <div className="flex w-full h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        {authState === 'login' ? <LoginForm setAuthState={setAuthState} /> : <SignUpForm setAuthState={setAuthState} />}
      </div>
      <div className="relative lg:flex lg:w-1/2 h-full bg-gray-200">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${registerBackground})` }} />
      </div>
    </div>
  );
}

export default App;
