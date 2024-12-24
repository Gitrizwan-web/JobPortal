import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, User2, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utliz/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            <Link to="/">
              {" "}
              Job<span className="text-[#F83002]">Portal</span>
            </Link>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recuruitor" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A58c2] hover:bg-[#251b52]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover className="cursor-pointer">
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h1 className="font-bold">{user?.fullname}</h1>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        {" "}
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col items-start bg-white px-4 pb-4 md:hidden">
          <ul className="flex flex-col font-medium items-start gap-3 w-full">
            {user && user.role === "recuruitor" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex flex-col items-start gap-2 w-full mt-3">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full bg-[#6A58c2] hover:bg-[#251b52]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3 w-full mt-3">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
                <div>
                  <h1 className="font-bold">{user?.fullname}</h1>
                  <p className="text-sm text-muted-foreground">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>
              <Button variant="link" className="w-full text-left">
                <User2 className="mr-2" /> View Profile
              </Button>

              <LogOut />
              <Button onClick={logoutHandler} variant="link">
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
