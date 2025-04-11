import React, { useState } from "react";
import Button from "./Button";
import { useLogin } from "./LoginProvider";
import { useNavigate } from "react-router-dom";




const UserList: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const {userList , isLoggedIn , setReceiverId , setReceiverEmail ,setReceiverName} = useLogin();
  const navigate = useNavigate();



  const filteredUsers = userList?.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );
  if (!isLoggedIn) {
    return (
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">Sign in to continue</h2>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-xl font-bold mt-4">Users</h2>
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-2 border rounded-md mt-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-4 ">
        {filteredUsers?.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center bg-gray-100 hover:bg-gray-400  p-3 rounded-md my-2"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-black rounded-full">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold">{user.username}</span>
            </div>
            <Button label="Send Money" onClick={()=>{
              setReceiverId(user._id)
              setReceiverEmail(user.email)
              setReceiverName(user.username)
              navigate('/send')
              }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
