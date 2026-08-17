"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
   const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/signup`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }
);
      const data = await response.json();

      console.log(data);

      if (response.ok) {
        // Save user data for dashboard
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
          })
        );

        alert("Signup successful");

        router.push("/dashboard");
      } else {
        alert(data.detail || "Signup failed");
      }
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    alert(
      "Google authentication is not configured yet. Add your Google OAuth client ID and backend callback to enable this option."
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Create your account to get started
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="mb-6 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.9-5.4 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.8 3.4 14.7 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.9 0 11.5-4.8 11.5-11.6 0-.8-.1-1.4-.2-2H12Z"
              />
              <path
                fill="#34A853"
                d="M3.7 7.3l3.5 2.6c1-1.9 2.9-3.2 4.8-3.2 1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.8 3.4 14.7 2.5 12 2.5c-3.8 0-7.1 2.2-8.3 5.3Z"
              />
              <path
                fill="#FBBC05"
                d="M3.7 16.7c1.2 3.1 4.5 5.3 8.3 5.3 2.5 0 4.6-.8 6.1-2.3l-2.9-2.3c-.8.5-1.8.9-3.2.9-3.8 0-5.2-2.6-5.4-3.9l-3.9 2.8Z"
              />
              <path
                fill="#4285F4"
                d="M12 21.5c2.7 0 5-.9 6.7-2.4l-3.2-2.6c-.9.6-2.1 1-3.5 1-3.2 0-5.2-2.2-5.4-3.9l-3.4 2.7C1.6 18.7 6.2 21.5 12 21.5Z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              Or
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter your name"
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Create a password"
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-7">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}