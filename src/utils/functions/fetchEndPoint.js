import { useEffect, useState } from "react";
import { API_HOST_URL } from "../api/API_HOST";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
const token =
  JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
// console.log(token.authKey);

export const useApiRequest = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    // if (!token.authKey) {
    //   navigate("/login");
    //   return;
    // }
    const fetchData = async () => {
      setLoading(true);
      await fetch(`${API_HOST_URL}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.authKey,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })

        .catch((error) => {
          setError(true);
          console.log(error);
        });
    };
    fetchData();
  }, []);
  return { data, loading, error };
};
