// hooks/use-login-form.ts
import * as Yup from "yup";
import { Credenciais, Tokens } from "./types";
import Alerts from "@/services/sw-alert";
import { useState } from "react";
import { useRouter } from "next/router";
import ApiClient from "@/services/http-client";

export const loginSchema = Yup.object({
    email: Yup.string().email("E-mail inválido").required("Obrigatório"),
    senha: Yup.string().min(6, "Mínimo 6 caracteres").required("Obrigatório"),
});

export function useLoginForm() {
    const initialValues = {
        email: "",
        senha: "",
    } as Credenciais;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (values: Credenciais) => {
        try {
            setLoading(true);
            const apiClient = new ApiClient();

            const response: Tokens = await apiClient.post("/auth/login", {
                email: values.email,
                senha: values.senha,
            });

            console.log(response);

            if (!response.token || !response.refreshToken) {
                await Alerts.error("Login e senha inválidos");
                setLoading(false);
                return;
            }

            // definirUsuario(usuario);
            // definirToken(usuario.token);

            router.push("/filmes");
        } catch (error) {
            console.log(error);
            await Alerts.error("Ocorreu um erro na tentativa de login", error);
            setLoading(false);
            return;
        }
    }
    return { loading, initialValues, handleSubmit, loginSchema };
}
