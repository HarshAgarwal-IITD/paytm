import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
    >
      {label}
    </button>
  );
};

export default Button;
