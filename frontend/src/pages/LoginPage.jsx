import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import refreshToken from "../apis/refreshToken";
import axios from "../apis/axiosInstance";
import Button from "../components/material3/Button";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { jwtTokenState, userState } from "../store/states";
import { loginUser } from "../apis/loginUser";
import { toast } from "react-toastify";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);
  // const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser({ payload: data });
      setJwtToken(response.token);

      console.log("role", response);
      if (response.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <section className="flex items-center justify-center h-full min-h-full my-auto bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-center mb-6 m3-title-large">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
