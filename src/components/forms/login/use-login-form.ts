// hooks/use-login-form.ts
import * as Yup from "yup";
import { Credenciais, Tokens } from "./types";
import Alerts from "@/services/sw-alert";
import { useState } from "react";
import { useRouter } from "next/router";
import ApiClient from "@/services/http-client";
import { useAuthContext } from "@/contexts/auth/auth.context";

export const loginSchema = Yup.object({
    email: Yup.string().email("E-mail inválido").required("Obrigatório"),
    senha: Yup.string().min(6, "Mínimo 6 caracteres").required("Obrigatório"),
});

export function useLoginForm() {
    const initialValues: Credenciais = {
        email: "",
        senha: "",
    };

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { definirToken, definirUsuario } = useAuthContext();

    const handleSubmit = async (values: Credenciais) => {
        try {
            setLoading(true);
            const apiClient = new ApiClient();

            const response: Tokens = await apiClient.post("/auth/login", {
                email: values.email,
                senha: values.senha,
            });

            if (!response.token || !response.refreshToken) {
                await Alerts.error("Login e senha inválidos");
                setLoading(false);
                return;
            }

            definirToken(response);

            const authedClient = new ApiClient(response.token);
            const usuario = await authedClient.get("/usuario");

            definirUsuario(usuario);

            router.push("/filmes");
        } catch (error) {
            console.error(error);
            await Alerts.error("Ocorreu um erro na tentativa de login");
        } finally {
            setLoading(false);
        }
    };

    return { loading, initialValues, handleSubmit, loginSchema };
}
