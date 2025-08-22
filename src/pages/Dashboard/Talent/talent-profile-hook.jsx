import { useEffect, useState } from "react";

export function useTechTalentProfileFetch() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedData = sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
        if (!storedData) throw new Error("No authentication token found");

        const parsedData = JSON.parse(storedData);
        const token = parsedData.authKey; // already includes "Bearer "

        const res = await fetch(
          "https://nxg-job-hub-backend.onrender.com/api/v1/tech-talent/get-user",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        setProfileData(json); // API returns the profile directly
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profileData, loading, error };
}
