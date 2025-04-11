import { createContext, useContext, useState, useEffect } from "react";


// Create Context
interface User {
  _id: string;
  username: string;
  email: string;
}

const LoginContext = createContext<{ isLoggedIn: boolean; logout: () => void ;setIsLoggedIn:Function
  ; username:String |undefined ;setUsername:Function;
  balance: number ;
  setBalance: Function;
  userList: User[] | undefined;
  setUserList:Function;
  receiverId:String | undefined;
  setReceiverId:Function;
  receiverEmail:String | undefined;
  setReceiverEmail : Function;
  receiverName:String |undefined;
  setReceiverName:Function;
} 
 | null>(null);

// Create Provider Component
export const LoginProvider = ({ children }:{children:any}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username , setUsername] = useState<string |undefined>();
  const [receiverEmail,setReceiverEmail] = useState<string |undefined>();
  const [balance , setBalance] = useState<number>(0);
  const [receiverId , setReceiverId] = useState<string | undefined>();
  const [receiverName,setReceiverName] = useState<string | undefined>();
  const [userList, setUserList] = useState<User[]>();


  // Check if user is already logged in (e.g., from localStorage)
  useEffect(() => {
 
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      if(localStorage.getItem("username")){
        const username=localStorage.getItem("username") as string;
        setUsername(username);
      }

    }
  }, []);

  // Function to log in


  // Function to log out
  const logout = () => {
    setIsLoggedIn(false);
   
    localStorage.removeItem("token"); // Remove from localStorage
    localStorage.removeItem("username"); // Remove from localStorage
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, logout  , setIsLoggedIn , username , setUsername, balance , setBalance
     ,userList ,setUserList ,receiverId , setReceiverId ,receiverEmail , setReceiverEmail, receiverName , setReceiverName}}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom Hook to Use Context
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
