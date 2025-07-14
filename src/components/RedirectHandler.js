import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const authRes = await fetch(
          "http://20.244.56.144/evaluation-service/auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: "nk6870877@gmail.com",
              name: "nitesh kumar",
              rollNo: "12208934",
              accessCode: "CZypQK",
              clientID: "52d682be-4c11-49bb-95d6-e0279c7f71a0",
              clientSecret: "UvCeXZREsJNRvvxf",
            }),
          }
        );

        const authData = await authRes.json();

        if (!authRes.ok || !authData.access_token) {
          alert("Authentication failed. Please check credentials.");
          return;
        }

        const token = authData.access_token; // ✅ FIXED LINE

        const res = await fetch(
          `http://20.244.56.144/evaluation-service/resolve/${shortcode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("Redirect data:", data);

        if (res.ok && data.originalUrl) {
          window.location.href = data.originalUrl;
        } else {
          alert("Shortcode not found or expired.");
        }
      } catch (error) {
        console.error("Redirection Error:", error);
        alert("Redirection failed. Network or server issue.");
      }
    };

    fetchAndRedirect();
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
