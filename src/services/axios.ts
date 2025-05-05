import axios, { AxiosInstance } from "axios";

export function getAxiosClient(): AxiosInstance {
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
    });

    return api;
}
