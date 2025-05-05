import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swAlert = withReactContent(Swal);

const Alerts = {
    success: (mensagem: string, caption = "Sucesso") =>
        swAlert.fire({
            title: caption,
            text: mensagem,
            icon: "success",
        }),
    error: (mensagem: string, caption = "Erro") =>
        swAlert.fire({
            title: caption,
            text: mensagem,
            icon: "error",
        }),
    warning: (mensagem: string, caption = "Atenção") =>
        swAlert.fire({
            title: caption,
            text: mensagem,
            icon: "warning",
        }),
    info: (mensagem: string, caption = "Informação") =>
        swAlert.fire({
            title: caption,
            text: mensagem,
            icon: "info",
        }),
    confirm: (
        mensagem: string,
        caption = "Atenção",
        confirmText = "Sim",
        cancelText = "Não"
    ) =>
        swAlert
            .fire({
                title: caption,
                text: mensagem,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: confirmText,
                cancelButtonText: cancelText,
            })
            .then((result) => result.isConfirmed),
    questionWithInput: (
        mensagem: string,
        caption = "Atenção",
        confirmText = "Sim",
        cancelText = "Não",
        invalidMessageValidation = "Campo inválido",
        inputPlaceholder = "Digite aqui"
    ) =>
        swAlert
            .fire({
                title: caption,
                text: mensagem,
                input: "text",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: confirmText,
                cancelButtonText: cancelText,
                inputPlaceholder: inputPlaceholder,
                inputValidator: (value: string) => {
                    if (!value) {
                        return invalidMessageValidation;
                    }
                },
            })
            .then((result) => result.value ?? ""),

    httpError: async (
        error: unknown,
        mensagem: string,
        caption = "Erro"
    ) => {
        console.error(error);

        if (error instanceof Error) {
            console.error(error.message);
            mensagem = error.message;
            caption = "Erro";
        } else {
            console.error("Unknown error", error);
            mensagem = "Ocorreu um erro desconhecido";
            caption = "Erro";
        }

        await Alerts.error(mensagem, caption);
    },
};

export default Alerts;
