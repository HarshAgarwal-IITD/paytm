import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, Mail, Lock, User } from 'lucide-react';
import axios from 'axios';
import {z} from 'zod'


const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password :z.string().min(4,"password must be at least 4 characters long"),

  email: z.string().email("Invalid email address"),
});


export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState("");


  const navigate = useNavigate();
   async function SendOtp(e: React.FormEvent){
    e.preventDefault();
    const signUpData = { username, email ,password};
    try {
      signupSchema.parse(signUpData);
    } catch (error) {
      if (error instanceof z.ZodError) {
      console.error('Validation errors:', error.errors);
      alert(error.errors.map(err => err.message).join('\n'));
      return;
      }
    }
    console.log(signUpData);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/sendOtp', signUpData);
      console.log('otp send successfully:', response.data);
      localStorage.setItem("emailId",email);
      navigate("/verifyotp")

      // Handle successful sign-up (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Error sending otp:', error);
      // Handle error (e.g., show an error message)
    }
  };
  
  
  

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here

    const signUpData = { username, email,password };

    

    try {
      signupSchema.parse(signUpData);
    } catch (error) {
      if (error instanceof z.ZodError) {
      console.error('Validation errors:', error.errors);
      alert(error.errors.map(err => err.message).join('\n'));
      return;
      }
    }
    console.log(signUpData);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/signup', signUpData);
      console.log('Sign up successful:', response.data);
      
      navigate("/signin")

      // Handle successful sign-up (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Error during sign up:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Wallet className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={SendOtp}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your full name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}