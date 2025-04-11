import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, ClipboardEvent, FormEvent } from 'react';
import axios from 'axios';
interface OtpInputProps {
  onComplete?: (code: string) => void;
  length?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ onComplete, length = 6 }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Check if OTP is complete and call the callback
  useEffect(() => {
    const isOtpComplete = otp.every(digit => digit !== '');
    setIsComplete(isOtpComplete);
    
    if (isOtpComplete && onComplete) {
      onComplete(otp.join(''));
    }
  }, [otp, onComplete]);

  // Handle input change
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    // Update OTP array with the new value (just the last digit if multiple)
    const newOtp: string[] = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    
    // Move to next input if current one is filled
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, move to previous input
        const newOtp: string[] = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle paste functionality
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData: string = e.clipboardData.getData('text');
    const pastedDigits: string = pastedData.replace(/\D/g, '').slice(0, length);
    
    if (pastedDigits) {
      const newOtp: string[] = [...otp];
      for (let i = 0; i < pastedDigits.length; i++) {
        if (i < length) newOtp[i] = pastedDigits[i];
      }
      setOtp(newOtp);
      
      // Focus appropriate field
      const focusIndex: number = Math.min(pastedDigits.length, length - 1);
      inputRefs.current[focusIndex].focus();
    }
  };

  // Handle form submission
  const handleSubmit = async(e: FormEvent<HTMLFormElement>):Promise<void> => {
  
    e.preventDefault();
    // if (isComplete && onComplete) {
    //   onComplete(otp.join(''));
    // }
    console.log('in hadnel submit')
    try{
      const response =await axios.post('http://localhost:3000/api/v1/auth/signup',{
        email:localStorage.getItem("emailId"),
        otp:otp.join("")
      })
      console.log(response);
    }
    catch(e){
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center p-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Verification Code</h2>
      <p className="text-gray-600 mb-8">We've sent a {length}-digit code to your device</p>
      
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              className="w-12 h-14 text-center text-xl font-bold text-gray-800 border-2 border-gray-300 
                         rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 
                         focus:ring-blue-200 transition-all"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
          
        </div>
        <button 
          type="submit" 
          disabled={!isComplete}
          className={`p-6 py-3 rounded-md text-white font-medium transition-all
                     ${isComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Verify
        </button>
        </form>
      
      
      <div className="mt-6 text-sm text-gray-600">
        Didn't receive code? <button type="button" className="text-blue-600 font-medium hover:underline">Resend</button>
      </div>
    </div>
  );
};

export default OtpInput;