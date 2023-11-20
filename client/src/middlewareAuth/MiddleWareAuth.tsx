import React, { useLayoutEffect } from "react";
import AxiosClient from "../axios/CreateAxios";
import { useNavigate } from "react-router-dom";

function MiddlewareAuth({ children }: { children: any }) {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const requstinter = AxiosClient.interceptors.request.use(
      (config) => {
        const accessToken = window.sessionStorage.getItem("accessToken");
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
    const responseinter = AxiosClient.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err?.response?.status === 401) {
          alert("not-authenticated");
          return navigate("/");
        } else if (err?.response?.status === 404) {
          console.log("user not found");
          return;
        }
        console.log(err);
      }
    );

    return () => {
      AxiosClient.interceptors.request.eject(requstinter);
      AxiosClient.interceptors.response.eject(responseinter);
    };
  }, []);

  return <>{children}</>;
}

export default MiddlewareAuth;
