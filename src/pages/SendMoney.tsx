import { useLogin } from "../components/LoginProvider";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function SendMoney(){
  const {receiverId , receiverName , receiverEmail , balance}= useLogin();
  const navigate = useNavigate();
  const amountRef = useRef<any>();

  async function handleSendMoney() {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const  amount = amountRef.current.value
     

      if (!amount|| parseFloat(amount) <= 0) {
        alert("Please enter a valid amount.");
        return;
      }
      if(amount > balance){
        alert("insuff balance");
        return;

      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/transaction/transfer",
          {
            receiverId,
            amount: parseFloat(amount),
          },
          {
            headers: {
              authorization:token,
            },
          }
        );

        if (response.status === 200) {
          alert("Money sent successfully!");
          navigate("/")
        } else {
          alert("Failed to send money. Please try again.");
        }
      } catch (error) {
        console.error("Error sending money:", error);
        alert("An error occurred while sending money.");
      }
  }
  

    return (
        <div className="flex h-screen bg-gray-100 items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 p-4">
              <h1 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Send Money
              </h1>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-6 bg-gray-50 p-3 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-md">
                  {receiverName ? receiverName.charAt(0).toUpperCase() :"U"} 
                </div>
                <div className="ml-4">
                  <span className="text-lg font-medium text-gray-800">{receiverName}</span>
                  <p className="text-sm text-gray-500">{receiverEmail}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    ref={amountRef}
                    type="number"
                    placeholder="0.00"
                    defaultValue="1000"
                    className="p-3 pl-8 block w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Available balance: ₹{balance}</p>
              </div>
              
              <div className="mt-8">
                <button onClick={handleSendMoney} className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Send Money
                </button>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                Transaction fees may apply
              </div>
            </div>
          </div>
        </div>
      );
}