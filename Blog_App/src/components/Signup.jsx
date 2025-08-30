import React, { useState } from "react";
import authservice from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/AuthSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const user = await authservice.createAccount(data);
      if (user) {
        const currentUser = await authservice.getCurrentUser();
        if (currentUser) {
          dispatch(login({ userData: currentUser }));
          navigate("/");
        }
      }
      else{
        alert("Signup failed, user not created enter the valid details:")
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-gray-600 via-gray-800 to-black ">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-md bg-gray-900/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-700"
      >
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-gray-100">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-gray-200 hover:text-emerald-400 transition-colors duration-200"
          >
            Sign In
          </Link>
        </p>

        {/* Error */}
        {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            className="bg-gray-800 border border-gray-600 font-mono text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-gray-400 rounded-lg"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="bg-gray-800 border border-gray-600 font-mono text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-gray-400 rounded-lg"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="bg-gray-800 border font-mono border-gray-600 text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-gray-400 rounded-lg"
            {...register("password", { required: true })}
          />

          {/* Animated Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:from-gray-500 hover:via-gray-400 hover:to-gray-300 transition-all duration-300"
            >
              Create Account
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;
