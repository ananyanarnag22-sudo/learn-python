"use client";

import Link from "next/link";


export default function Home() {


  return (

    <main className="min-h-screen bg-gray-50">


      {/* Header */}

      <header className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">


          {/* Logo */}

          <h1 className="text-2xl font-bold text-blue-600">
            MyApp
          </h1>



          {/* Navigation */}

          <nav className="hidden md:flex gap-8 text-gray-600">


            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>


            <Link href="#features" className="hover:text-blue-600">
              Features
            </Link>


            <Link href="#about" className="hover:text-blue-600">
              About
            </Link>


            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>


          </nav>



          <Link
          href="/signup"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>


        </div>


      </header>





      {/* Hero Banner */}

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">


        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">


          {/* Left Content */}

          <div>


            <h2 className="text-5xl font-bold leading-tight">

              Manage Everything
              <br />
              In One Place 🚀

            </h2>



            <p className="mt-6 text-lg text-blue-100">

              A simple and powerful platform to manage your
              projects, profile and daily tasks easily.

            </p>



            <div className="mt-8 flex gap-4">


              <Link
              href="/signup"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100"
              >
                Start Free
              </Link>



              <Link
              href="/login"
              className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600"
              >
                Login
              </Link>


            </div>


          </div>




          {/* Right Banner Card */}

          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">


            <div className="bg-white rounded-xl p-6 text-gray-800 shadow-xl">


              <h3 className="text-xl font-bold">
                Dashboard Overview
              </h3>


              <div className="grid grid-cols-2 gap-4 mt-6">


                <div className="bg-blue-50 p-4 rounded-lg">

                  <p className="text-gray-500">
                    Projects
                  </p>

                  <h4 className="text-3xl font-bold">
                    24
                  </h4>

                </div>



                <div className="bg-green-50 p-4 rounded-lg">

                  <p className="text-gray-500">
                    Completed
                  </p>

                  <h4 className="text-3xl font-bold">
                    18
                  </h4>

                </div>


              </div>


            </div>


          </div>


        </div>


      </section>





      {/* Features */}

      <section id="features" className="max-w-7xl mx-auto px-6 py-20">


        <h2 className="text-3xl font-bold text-center">
          Powerful Features
        </h2>


        <div className="grid md:grid-cols-3 gap-8 mt-12">


          <div className="bg-white p-8 rounded-xl shadow">

            <h3 className="text-xl font-bold">
              Easy Management
            </h3>

            <p className="text-gray-500 mt-3">
              Manage your data and projects from a single dashboard.
            </p>

          </div>



          <div className="bg-white p-8 rounded-xl shadow">

            <h3 className="text-xl font-bold">
              Secure Login
            </h3>

            <p className="text-gray-500 mt-3">
              Your account is protected with secure authentication.
            </p>

          </div>




          <div className="bg-white p-8 rounded-xl shadow">

            <h3 className="text-xl font-bold">
              Modern UI
            </h3>

            <p className="text-gray-500 mt-3">
              Clean and responsive design for every device.
            </p>

          </div>


        </div>


      </section>





      {/* Footer */}

      <footer className="bg-gray-900 text-white py-8 text-center">

        <p>
          © 2026 MyApp. All rights reserved.
        </p>

      </footer>



    </main>

  );
}