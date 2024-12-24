import { setSinglecompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utliz/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleCompany = async () => {
      if (!companyId) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        );

        if (res.data?.success && res.data.company) {
          dispatch(setSinglecompany(res.data.company));
        } else {
          console.warn("No company data found or request unsuccessful");
        }
      } catch (err) {
        console.error("Error fetching single company:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);

  return { loading, error };
};

export default useGetCompanyById;
