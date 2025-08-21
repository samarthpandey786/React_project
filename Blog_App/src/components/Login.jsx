import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/AuthSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-gray-600 via-gray-800 to-black p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-md bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20"
      >
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-200">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-emerald-400 hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* Error */}
        {error && <p className="text-red-400 mt-6 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
          <div>
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              className="bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-emerald-600 rounded-lg"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
          </div>
          <div>
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              className="bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-emerald-600 rounded-lg"
              {...register("password", { required: true })}
            />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-500 via-gray-700 to-black hover:text-emerald-400 text-black font-semibold py-2 px-4 rounded-lg transition-all"
            >
              Sign in
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
