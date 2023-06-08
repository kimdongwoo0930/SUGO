import { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "@env";

const usePostAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const postAxios = async (url, payload) => {
    try {
      const response = await axios.post(API_URL + url, payload);
      setData(response.data);
      console.log(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoaded(true);
    }
  };

  return { data, error, loaded, postAxios };
};

export default usePostAxios;
