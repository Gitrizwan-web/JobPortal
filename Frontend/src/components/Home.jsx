import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CatagoryCorousel from "./CatagoryCorousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/Hooks/UseGetAllJobs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recuruitor") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CatagoryCorousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
