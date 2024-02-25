import React, { useState } from 'react';

export default function SignUpForm({ setAuthState }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [prefix, setPrefix] = useState('');
    const [restPhoneNumber, setRestPhoneNumber] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignInClick = () => {
        if (!termsAccepted) {
            setErrorMessage('You must accept the terms and conditions to continue.');
            return;
        }

        // verif daca rest of nrphone it s only digits
        if (!/^\d+$/.test(restPhoneNumber)) {
            setErrorMessage('Phone number must contain only digits.');
            return;
        }

        // Restul codului pentru procesarea datelor si autentificare
        console.log('User information:', { email, password, prefix, restPhoneNumber });

        setAuthState('login');
    };

    const handleTermsCheckboxChange = () => {
        setErrorMessage('');
        setTermsAccepted(!termsAccepted);
    };

    return (
        <div className='w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Create an Account</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Please enter your details.</p>
            <div className='mt-8'>
                <div className='flex flex-col'>
                    <label className='text-lg font-medium'>Email</label>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder="Enter your email"
                    />
                </div>
                <div className='flex flex-col mt-4'>
                    <label className='text-lg font-medium'>Password</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder="Enter your email"
                        type={"password"}
                    />
                </div>
                <div className='flex flex-col mt-4'>
                    <label className='text-lg font-medium'>Phone Number</label>
                    <div className="flex items-center mt-2">
                        <input 
                            value={prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                            className='border-2 border-gray-100 rounded-l-xl p-4 bg-transparent w-1/4'
                            placeholder="Prefix"
                        />
                        <input 
                            value={restPhoneNumber}
                            onChange={(e) => setRestPhoneNumber(e.target.value.replace(/\D/, ''))}
                            className='border-2 border-gray-100 rounded-r-xl p-4 bg-transparent flex-1 ml-1'
                            placeholder="Rest of phone number"
                        />
                    </div>
                </div>
                <div className='mt-4 flex justify-between items-center'>
                    <div>
                        <input  
                            type="checkbox" 
                            id='terms' 
                            checked={termsAccepted} 
                            onChange={handleTermsCheckboxChange}
                        />
                        <label className='ml-2 font-medium text-base' htmlFor="terms">I accept the terms and conditions</label>
                    </div>
                    <button className='font-medium text-base text-violet-500'>View terms and conditions</button>
                </div>
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                <div className='mt-8 flex flex-col gap-y-4'>
                    <button 
                        className={`active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleSignInClick}
                        disabled={!termsAccepted}
                    >
                        Sign Up
                    </button>
                </div>
                <div className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base'>Already have an account?</p>
                    <button 
                        onClick={() => setAuthState('login')}
                        className='ml-2 font-medium text-base text-violet-500'>Sign in</button>
                </div>
            </div>
        </div>
    );
}
