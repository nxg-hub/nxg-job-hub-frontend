import { useEffect, useState } from "react";
import { API_HOST_URL } from "../api/API_HOST";

const token =
  JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
  JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

export const postEndPoint = (url, id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch(`${API_HOST_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.authKey,
        },
        body: JSON.stringify(id),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
        })

        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);
  return { data };
};
