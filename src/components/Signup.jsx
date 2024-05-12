import { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";

function Signup() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");

  const Signup = async (data) => {
    setError("");
    try {
      let session = await authService.createAccount(data);
      console.log("in Sign UP");
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2>Create Your Account Here !!!</h2>
        <p>
          Already have an Account then <Link to={"/login"}>Login</Link>
        </p>
        {error && <p className="text-red-600 my-2 text-center">{error}</p>}
        <form onSubmit={handleSubmit(Signup)}>
          <div className="space-y-5">
            <Input
              type="text"
              label="UserName :"
              placeholder="Enter Your UserName"
              {...register("username", {
                required: true,
              })}
            />
            <Input
              type="Email"
              placeholder="Enter Your Email"
              label="Email :"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Enter valid Address",
                },
              })}
            />
            <Input
              type="password"
              placeholder="Enter Your password"
              label="Password :"
              {...register("password", {
                required: true,
              })}
            />
            <Button type={"submit"} className="w-full">
              SignUp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
