import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";

const useGetAxios = () => {
  const [getdata, setData] = useState(null);
  const [geterror, setError] = useState("");
  const [getloaded, setLoaded] = useState(false);

  const getAxios = async (url) => {
    try {
      const response = await axios.get(API_URL + url);
      setData(response.data);
      setLoaded(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoaded(true);
    }
  };

  return { getdata, geterror, getloaded, getAxios, setLoaded };
};

export default useGetAxios;
