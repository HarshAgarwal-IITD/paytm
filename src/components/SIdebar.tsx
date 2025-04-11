import React, { useState } from 'react';
import { Settings, X, Home, Users, Mail, Bell, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative ">
     

      {/* Settings Button */}
      <button
        onClick={toggleSidebar}
        className={`bottom-6 right-6 p-3 rounded-full shadow-lg 
        ${isOpen ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} 
        transition-all duration-300 hover:scale-110`}
      >
        {isOpen ? <X size={24} /> : <Settings size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-10 transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Settings</h2>
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 py-4 overflow-y-auto">
            <nav className="px-4">
              <ul className="space-y-2">
                <li>
                  <a  className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                    <Home size={20} className="text-gray-500" />
                    <button onClick={()=>{navigate("/");toggleSidebar()}}><span className="ml-3 text-gray-700">Dashboard</span></button>
                  </a>
                </li>
                <li>
                  <a href="/account" className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                    <Users size={20} className="text-gray-500" />
                    <span className="ml-3 text-gray-700">Account</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                    <Mail size={20} className="text-gray-500" />
                    <span className="ml-3 text-gray-700">Notifications</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                    <Bell size={20} className="text-gray-500" />
                    <span className="ml-3 text-gray-700">Privacy</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                    <HelpCircle size={20} className="text-gray-500" />
                    <span className="ml-3 text-gray-700">Help & Support</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

         
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;