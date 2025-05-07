/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { Filme } from "@/modules/filmes/types";
import Alerts from "@/services/sw-alert";
import { useState } from "react";
import ApiClient from "@/services/http-client";
import { useRouter } from "next/router";

export const filmeSchema = Yup.object({
    tituloOriginal: Yup.string().required("Obrigatório"),
    tituloTraduzido: Yup.string().required("Obrigatório"),
    descricao: Yup.string().required("Obrigatório"),
    dtLancamento: Yup.date()
        .transform((_, originalValue) => {
            if (originalValue) {
                try {
                    return new Date(originalValue);
                } catch (error) {
                    return undefined;
                }
            }
            return undefined;
        })
        .required("Obrigatório"),
    urlImagem: Yup.string().url("URL da imagem inválida"),
    duracao: Yup.number()
        .optional(),
    orcamento: Yup.number().optional(),
    receita: Yup.number().optional(),
    linkTrailer: Yup.string().optional(),
});

export type FilmeForm = Omit<Filme, "id" | "usuarioId">;

export function useCadastroFilme(filmeEdit?: Filme) {
    let initialValues: FilmeForm = {
        tituloOriginal: "",
        tituloTraduzido: "",
        descricao: "",
        dtLancamento: new Date(),
        duracao: undefined,
        orcamento: undefined,
        receita: undefined,
        linkTrailer: undefined,
    };

    if (filmeEdit) {
        initialValues = {
            ...filmeEdit,
        };
    }

    const [loading, setLoading] = useState(false);
    const [filme, setFilme] = useState<FilmeForm>(initialValues);
    const router = useRouter();

    const handleSubmit = async (values: FilmeForm) => {
        try {
            setLoading(true);
            const apiClient = new ApiClient();

            if (filmeEdit) {
                await apiClient.put(`/filme/${filmeEdit.id}`, values);
                await Alerts.success("Filme atualizado com sucesso");
                router.push(`/filmes/${filmeEdit.id}`);
            } else {
                await apiClient.post("/filmes", values);
                await Alerts.success("Filme cadastrado com sucesso");
            }

            setLoading(false);
        } catch (error: any) {
            console.error(error);
            await Alerts.error(
                `Ocorreu um erro ${filmeEdit?.id ? "ao atualizar" : "ao cadastrar"} o filme`,
                error
            );
            setLoading(false);
            return;
        }
    };

    const resetForm = () => {
        setFilme(initialValues);
    };

    return {
        loading,
        filme,
        initialValues,
        handleSubmit,
        filmeSchema,
        setFilme,
        resetForm,
    };
}
