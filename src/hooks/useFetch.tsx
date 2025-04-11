import { useState, useEffect } from "react";
import {useLogin} from '../components/LoginProvider'
import axios from "axios";

const UseFetchDetails = () => {

    const [loading, setLoading] = useState(true);
    const [error] = useState(null);
    const {setBalance , isLoggedIn  , setUserList ,username } = useLogin();

    const fetchBalance = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/api/v1/user/balance", {
                headers: {
                    authorization: token
                }
            });
            //@ts-ignore
            const balance = response.data.balance;
            console.log("balance ", balance);
            setBalance(balance);
        } catch (err) {
            console.error("Error fetching balance: ", err);
            
        }
    };

    const fetchUserList = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/api/v1/user/getUsers/", {
                headers: {
                    authorization: token
                }
            });
            //@ts-ignore
            
            let users = response.data;
            //@ts-ignore
            users = users.filter((user)=>user.username!=username)
      
            setUserList(users);
            
        } catch (err) {
            console.error("Error fetching user list: ", err);
         
        }
    };

    useEffect(() => {
        if(!isLoggedIn)
            return;
        
        const fetchData = async () => {
            try {
                setLoading(true);
                await fetchBalance();
                await fetchUserList();
               
                
                
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isLoggedIn]);

    return ;
};

export default UseFetchDetails;