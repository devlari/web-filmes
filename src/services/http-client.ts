/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getAxiosClient } from "./axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";

export default class ApiClient {
    public axiosInstance: AxiosInstance;

    constructor(token = "") {
        this.axiosInstance = getAxiosClient();

        if (token && token.trim() !== "") {
            this.axiosInstance.defaults.headers.common["x-access-token"] = token;
        }

        void this.loadHttpClient();
    }

    async loadHttpClient(): Promise<void> {
        const cookies = parseCookies();
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL_API ?? "";
        const token = cookies.token || "";

        this.axiosInstance.defaults.baseURL = baseURL;

        if (token) {
            this.axiosInstance.defaults.headers.common["x-access-token"] = token;
        }

        this.axiosInstance.interceptors.response.use(
            (res: AxiosResponse) => res,
            async (err) => {
                const originalConfig = err.config;

                if (err.response?.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const resultToken = await this.refreshToken();

                        if (!resultToken?.token) {
                            destroyCookie(null, "token");
                            destroyCookie(null, "refreshToken");
                            return Promise.reject(err);
                        }

                        await this.setToken(resultToken.token, resultToken.refreshToken);

                        originalConfig.headers["x-access-token"] = resultToken.token;

                        return this.axiosInstance(originalConfig);
                    } catch (error) {
                        destroyCookie(null, "token");
                        destroyCookie(null, "refreshToken");

                        if (typeof window !== "undefined") {
                            await fetch(`/api/logout`);
                            window.location.href = "/";
                        }

                        return Promise.reject(error);
                    }
                }

                if (err.response?.status === 401 && originalConfig.url !== "/") {
                    destroyCookie(null, "token");
                    destroyCookie(null, "refreshToken");

                    if (typeof window !== "undefined") {
                        await fetch(`/api/logout`);
                        window.location.href = "/";
                    }
                }

                return Promise.reject(err);
            }
        );
    }

    async refreshToken(): Promise<{ token: string; refreshToken: string } | null> {
        const cookies = parseCookies();
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL_API;
        const refreshToken = cookies.refreshToken || "";

        if (!refreshToken) return null;

        try {
            const response = await axios.post(
                `${baseURL}/refresh-token`,
                { refreshToken }
            );
            return response.data;
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("Unknown error", error);
            }
            return null;
        }

    }

    async setToken(token: string, refreshToken: string) {
        setCookie(null, "token", token);
        setCookie(null, "refreshToken", refreshToken);
        await this.loadHttpClient();
    }

    async post<T = any>(url: string, data: Record<string, unknown> = {}): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data);
        return response.data;
    }


    async get<T = any>(url: string, params: object = {}): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, { params });
        return response.data;
    }

    async put<T = any>(url: string, data = {}): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data);
        return response.data;
    }

    async patch<T = any>(url: string, data = {}): Promise<T> {
        const response = await this.axiosInstance.patch<T>(url, data);
        return response.data;
    }

    async delete<T = any>(url: string, data = {}): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url, { data });
        return response.data;
    }

    async postFormData<T = any>(url: string, formData: FormData): Promise<T> {
        this.axiosInstance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
        const response = await this.axiosInstance.post<T>(url, formData)
        return response.data;
    }

}
