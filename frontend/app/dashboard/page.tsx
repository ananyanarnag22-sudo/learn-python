"use client";

import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

export default function Dashboard() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex">



      {/* Main */}
      <main className="flex-1 p-8">


        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-3xl font-bold">
              Welcome back 👋
            </h2>

            <p className="text-gray-500">
              Manage your account from here
            </p>

          </div>


          <div className="bg-white px-5 py-3 rounded-xl shadow">

            {user?.name || "User"}

          </div>


        </div>



        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">


          <div className="bg-white p-6 rounded-xl shadow">

            <p className="text-gray-500">
              Total Projects
            </p>

            <h3 className="text-3xl font-bold mt-2">
              12
            </h3>

          </div>



          <div className="bg-white p-6 rounded-xl shadow">

            <p className="text-gray-500">
              Completed
            </p>

            <h3 className="text-3xl font-bold mt-2">
              8
            </h3>

          </div>



          <div className="bg-white p-6 rounded-xl shadow">

            <p className="text-gray-500">
              Status
            </p>

            <h3 className="text-3xl font-bold mt-2 text-green-600">
              Active
            </h3>

          </div>


        </div>




        {/* Profile */}
        <div className="mt-8 bg-white rounded-xl shadow p-8">


          <h3 className="text-xl font-semibold mb-5">
            Profile Information
          </h3>


          <div className="space-y-3">


            <p>
              <span className="font-semibold">
                Name:
              </span>{" "}
              {user?.name || "Loading..."}
            </p>



            <p>
              <span className="font-semibold">
                Email:
              </span>{" "}
              {user?.email || "Loading..."}
            </p>


          </div>


        </div>


      </main>


    </div>
  );
}