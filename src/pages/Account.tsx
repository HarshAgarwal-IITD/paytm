import React, { useState } from 'react';
import axios from 'axios';
import { useLogin } from '../components/LoginProvider';
import { useNavigate } from 'react-router-dom';

const Account: React.FC = () => {
  // State for tracking which option is selected
  const [selectedOption, setSelectedOption] = useState<'username' | 'password'>('username');
  const {setUsername}= useLogin();
  const navigate = useNavigate();
  
  // State for the input value
  const [inputValue, setInputValue] = useState('');
  
  // State for showing success message
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle option selection
  const handleOptionSelect = (option: 'username' | 'password') => {
    setSelectedOption(option);
    setInputValue(''); // Clear input when switching options
    setShowSuccess(false); // Hide any previous success message
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuccess(false); // Hide success message when typing
  };

  // Handle update button click
  const handleUpdate = () => {
    if (inputValue.trim() === '') return;
  
   
   
    if(selectedOption == "username")
    {
          axios.put('http://localhost:3000/api/v1/update/'+selectedOption, {
        newUsername: inputValue,
        },
        { headers:{
            authorization:localStorage.getItem('token')
        }}
      ).then((response) => {
                console.log('Update successful:', response.data);
                //@ts-ignore
                localStorage.setItem("username",inputValue)
                //@ts-ignore
                setUsername(inputValue);
                navigate("/")
                
            })
            .catch((error) => {
                console.error('Error updating account:', error);
                setShowSuccess(false); // Ensure success message is not shown on error
                return;
                
            });
      }
    else
    {
        axios.put('http://localhost:3000/api/v1/update/'+selectedOption, {
        newPassword: inputValue,
        },
        { headers:{
            authorization:localStorage.getItem('token')
        }}
      ).then((response) => {
                console.log('Update successful:', response.data);
             
                navigate("/")
                
            })
            .catch((error) => {
                console.error('Error updating account:', error);
                setShowSuccess(false); // Ensure success message is not shown on error
                return;
                
            });
      }
    
    // Show success message
    setShowSuccess(true);
    
    // Clear input after successful update
    setInputValue('');
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Account Settings</h1>
        
        {/* Selection Options */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              selectedOption === 'username'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleOptionSelect('username')}
          >
            Update Username
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              selectedOption === 'password'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleOptionSelect('password')}
          >
            Update Password
          </button>
        </div>

        {/* Input Field */}
        <div className="mb-6">
          <label htmlFor="update-input" className="block text-sm font-medium text-gray-700 mb-2">
            {selectedOption === 'username' ? 'New Username' : 'New Password'}
          </label>
          <input
            id="update-input"
            type={selectedOption === 'username' ? 'text' : 'password'}
            value={inputValue}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder={selectedOption === 'username' ? 'Enter new username' : 'Enter new password'}
          />
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Your {selectedOption} has been updated successfully!
          </div>
        )}

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          disabled={inputValue.trim() === ''}
          className={`w-full py-3 px-4 rounded-lg transition-colors ${
            inputValue.trim() === ''
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Update {selectedOption === 'username' ? 'Username' : 'Password'}
        </button>
      </div>
    </div>
  );
};

export default Account;