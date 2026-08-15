"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Sidebar(){

    const router = useRouter();

    const [showLogout, setShowLogout] = useState(false);


    function logout(){

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
    }


    return (

        <aside className="w-64 bg-white shadow-lg min-h-screen p-6">


            <h1 className="text-2xl font-bold text-blue-600 mb-8">
                My App
            </h1>


            <nav className="space-y-3">


                <Link
                href="/dashboard"
                className="block p-3 rounded-lg hover:bg-blue-50"
                >
                    Dashboard
                </Link>


                <Link
                href="/dashboard/profile"
                className="block p-3 rounded-lg hover:bg-blue-50"
                >
                    Profile
                </Link>


                <Link
                href="/dashboard/settings"
                className="block p-3 rounded-lg hover:bg-blue-50"
                >
                    Settings
                </Link>


                <button
                onClick={() => setShowLogout(true)}
                className="w-full text-left p-3 rounded-lg hover:bg-red-50 text-red-500"
                >
                    Logout
                </button>


            </nav>



            {/* Logout Dialog */}

            {showLogout && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">


                    <div className="bg-white rounded-xl p-6 shadow-lg w-80">


                        <h2 className="text-xl font-semibold mb-3">
                            Logout
                        </h2>


                        <p className="text-gray-500 mb-6">
                            Are you sure you want to logout?
                        </p>


                        <div className="flex justify-end gap-3">


                            <button
                            onClick={() => setShowLogout(false)}
                            className="px-4 py-2 rounded-lg bg-gray-200"
                            >
                                Cancel
                            </button>


                            <button
                            onClick={logout}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white"
                            >
                                Logout
                            </button>


                        </div>


                    </div>


                </div>

            )}


        </aside>

    )
}