import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_HOST_URL } from "@/utils/api/API_HOST";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const tokenFromQuery =
      searchParams.get("authKey") ||
      searchParams.get("token") ||
      searchParams.get("accessToken") ||
      searchParams.get("access_token") ||
      searchParams.get("jwt");

    // Some OAuth providers return the token in the URL hash instead of the
    // query string. Supporting both keeps the callback compatible with the
    // existing backend and with providers that use implicit redirects.
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const token =
      tokenFromQuery ||
      hashParams.get("authKey") ||
      hashParams.get("token") ||
      hashParams.get("accessToken") ||
      hashParams.get("access_token") ||
      hashParams.get("jwt");

    if (!token) {
      setError("No authentication token received from Google. Please try signing in again.");
      return;
    }

    const authKey = /^Bearer\s/i.test(token) ? token : `Bearer ${token}`;
    localStorage.setItem(
      "NXGJOBHUBLOGINKEYV1",
      JSON.stringify({ authKey })
    );

    axios
      .get(`${API_HOST_URL}/api/v1/auth/get-user`, {
        headers: { authorization: authKey },
      })
      .then((res) => {
        const user = res.data;
        const stored = JSON.parse(localStorage.getItem("NXGJOBHUBLOGINKEYV1"));
        localStorage.setItem(
          "NXGJOBHUBLOGINKEYV1",
          JSON.stringify({ authKey, email: user.email, id: user.id })
        );

        if (!user.userType) {
          navigate("/createAccount", { replace: true });
        } else if (user.userType === "EMPLOYER") {
          navigate("/employer", { replace: true });
        } else if (user.userType === "TECHTALENT") {
          navigate("/talent", { replace: true });
        } else if (user.userType === "SERVICE_PROVIDER") {
          navigate("/services-provider", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.error("OAuth callback user fetch failed:", err);
        setError("Failed to retrieve your profile. Please try signing in again.");
      });
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1rem" }}>
        <p style={{ color: "#dc2626", fontSize: "1rem" }}>{error}</p>
        <button
          onClick={() => navigate("/login", { replace: true })}
          style={{ padding: "0.5rem 1.5rem", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer" }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <p>Signing you in with Google...</p>
    </div>
  );
};

export default OAuthCallback;
