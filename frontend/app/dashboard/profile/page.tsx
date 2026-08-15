"use client";

import { useEffect,useState } from "react";


export default function Profile(){


const [user,setUser] = useState<any>(null);



useEffect(()=>{

const data = localStorage.getItem("user");

if(data){
setUser(JSON.parse(data));
}


},[])



return (

<div className="bg-white p-8 rounded-xl shadow">


<h1 className="text-2xl font-bold mb-5">
Profile
</h1>


<p>
<b>Name:</b> {user?.name}
</p>


<p className="mt-3">
<b>Email:</b> {user?.email}
</p>


</div>

)

}