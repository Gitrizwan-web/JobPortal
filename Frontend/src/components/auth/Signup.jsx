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
import { setloading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setloading(true));
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
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
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="mb-4">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Full Name"
              value={input.fullname}
              name="fullname" // Match the name attribute to the state key
              onChange={changeEventHandler}
              className="mt-1 w-full"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="Email">Email</Label>
            <Input
              id="Email"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Email"
              className="mt-1 w-full"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="Phonenumber">Phone Number</Label>
            <Input
              id="Phonenumber"
              type="text"
              value={input.phonenumber}
              name="phonenumber"
              onChange={changeEventHandler}
              placeholder="Phone Number"
              className="mt-1 w-full"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="Password">Password</Label>
            <Input
              id="Password"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
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
                <Label htmlFor="option-one">Student</Label>
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
                <Label htmlFor="option-two">Recruitor</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <label>Profile</label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer mt-1"
              />
            </div>
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
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
