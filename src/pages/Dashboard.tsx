
import UserList from '../components/UsersList';
import UseFetchDetails from '../hooks/useFetch';
import { useLogin } from '../components/LoginProvider';


function HomePage() {
 
  const {balance , isLoggedIn} = useLogin();

  const fetchDetail = UseFetchDetails();
  console.log(isLoggedIn)


  return (
    <>
    
    <div className="min-h-screen bg-gray-100 text-black ">
      <div className="w-screen  bg-white p-6 rounded-lg shadow-md">

        <div className="my-4 text-lg font-semibold">
          Your Balance : <span className="text-xl font-bold">Rs {isLoggedIn? balance : "$balance"}</span>
        </div>
        <UserList />
      </div>
    </div>
    
    </>
  );
}



export default HomePage;