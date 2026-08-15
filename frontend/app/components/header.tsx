"use client";

import { useEffect, useState } from "react";


export default function Header(){

    const [name,setName] = useState("User");


    useEffect(()=>{

        const user = localStorage.getItem("user");

        if(user){
            setName(JSON.parse(user).name);
        }

    },[])



    return (

        <header className="bg-white shadow-sm p-5 flex justify-between">


            <div>

                <h2 className="text-xl font-semibold">
                    Dashboard
                </h2>

                <p className="text-gray-500">
                    Welcome back {name} 👋
                </p>

            </div>


            <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">

                {name}

            </div>


        </header>

    )
}