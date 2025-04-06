import { useRef, useState } from "react";
import HeaderCompo from "../components/header";
import { useGetBalance } from "../hooks/useGetBalance";
import { FiRefreshCcw } from "react-icons/fi";
import { SearchBox } from "../components/search-box";
import axios from "axios";
import UserCard from "../components/user-card";
export function Dashboard() {
  
  const{balance}=useGetBalance();
  const userRef=useRef("");
  const [recipents,setRecipents]=useState({});

  async function fetchUser(){
    
    const username=userRef.current.value;
    const response=await axios({
      method:"get",
      url:"http://localhost:3000/api/v1/user/bulk/?filter="+username,
      headers:{
        authorization:"Bearer "+localStorage.getItem("token-paytm")
      }
    });

    setRecipents(response.data);
    console.log(recipents.user);
  }

  function fun(user)
  {
   
  }
  return (
      <div className="w-screen h-screen">
        <HeaderCompo
        username={"Jay"}
        />
        <div className="px-5 mt-5 flex gap-x-3 items-center">
          <span className="text-2xl font-medium">
            Your Balance ₹ {balance} 
          </span>
          <FiRefreshCcw className="text-2xl cursor-pointer" />
        </div>
        <div className="mt-3 px-5">
          <SearchBox  
          placeholder={"Search User...."}
          refrence={userRef}
          onchangeFun={fetchUser}
          />
        </div>
        <div className="mt-3 px-5">
        {recipents.user?.map((user,index) => (
  <UserCard key={index} username={user.firstname} />
))}

        </div>
      </div>
    )
  };
  
  
  