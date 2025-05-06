import * as Yup from "yup";
import { CadastroForm, UsuarioPayload } from "./types";
import Alerts from "@/services/sw-alert";
import { useState } from "react";
import { useRouter } from "next/router";
import ApiClient from "@/services/http-client";

export const cadastroSchema = Yup.object({
    nome: Yup.string().required("Obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Obrigatório"),
    senha: Yup.string().min(6, "Mínimo 6 caracteres").required("Obrigatório"),
    confirmacao: Yup.string().oneOf([Yup.ref("senha")], "Senhas não coincidem").required("Obrigatório"),
});

export function useCadastroForm() {
    const initialValues = {
        email: "",
        senha: "",
        nome: "",
        confirmacao: "",
    } as CadastroForm;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (values: CadastroForm) => {

        if (values.confirmacao !== values.senha) {
            await Alerts.warning("Senhas não coincidem");
            return;
        }

        try {
            setLoading(true);
            const apiClient = new ApiClient();

            await apiClient.post("/auth/cadastro", {
                nome: values.nome,
                email: values.email,
                senha: values.senha,
            } as UsuarioPayload);

            await Alerts.success("Cadastro realizado com sucesso");
            setLoading(false);

            router.push("/");
        } catch (error) {
            console.log(error);
            await Alerts.error("Ocorreu um erro na tentativa de cadastro", error);
            setLoading(false);
            return;
        }
    }
    return {
        loading, initialValues, handleSubmit, cadastroSchema
    };
}
