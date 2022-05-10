import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { REDIRECT_URI } from "../../config";
import { API_URL } from "../../config";

const Auth = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const userAuthCode = location.search.split("code=")[1];
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${userAuthCode}`;

  useEffect(() => {
    fetch(kakaoAuthUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          alert("로그인 실패!");
        }
      })
      .then(data => {
        setToken(data.access_token);
      });
  }, []);

  useEffect(() => {
    token &&
      fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("new_token", data.new_token);
          navigate("/");
        });
  }, [token]);
};

export default Auth;
