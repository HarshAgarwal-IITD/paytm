import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import { Header } from './components/Header';
import OtpInput from "./pages/VerifyOtp";
import SignUp from "./pages/Signup";
import SendMoney from "./pages/SendMoney";
import Account from "./pages/Account";


export default function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
      
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Send" element={<SendMoney />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/verifyotp" element={<OtpInput />} />
      </Routes>
    </Router>
  );
}