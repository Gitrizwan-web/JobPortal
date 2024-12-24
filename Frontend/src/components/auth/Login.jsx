import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utliz/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setloading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",

    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setloading(true));
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setloading(true));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl max-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="mb-4">
            <Label htmlFor="Email">Email</Label>
            <Input
              id="Email"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email"
              className="mt-1 w-full"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="Password">Password</Label>
            <Input
              id="Password"
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="mt-1 w-full"
            />
          </div>

          <div className="mb-4">
            <RadioGroup
              className="flex items-center gap-4"
              defaultValue="student"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recuruitor"
                  checked={input.role === "recuruitor"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              {" "}
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
