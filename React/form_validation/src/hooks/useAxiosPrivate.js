import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh_token = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]){
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const previousRequest = error?.config;
                if (error?.response?.status === 403 && !previousRequest?.sent) {
                    previousRequest.sent = true;
                    const newAccessToken = await refresh_token();
                    previousRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate.request(previousRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        };
    }, [auth, refresh_token]);

    return axiosPrivate;
}

export default useAxiosPrivate;