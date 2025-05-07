import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swAlert = withReactContent(Swal);

const Alerts = {
    success: (mensagem: string, caption = "Sucesso") => {
        swAlert.fire({
            title: caption,
            text: mensagem,
            icon: "success",
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
    },
    error: (mensagem: string, caption = "Erro") => {
        swAlert.fire({
            title: caption,
            text: mensagem,
            icon: "error",
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 5000,
        });
    },
    warning: (mensagem: string, caption = "Atenção") => {
        swAlert.fire({
            title: caption,
            text: mensagem,
            icon: "warning",
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 4000,
        });
    },
    info: (mensagem: string, caption = "Informação") => {
        swAlert.fire({
            title: caption,
            text: mensagem,
            icon: "info",
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 4000,
        });
    },
    httpError: async (error: unknown, mensagemPadrao: string, caption = "Erro") => {
        console.error(error);
        let mensagem = mensagemPadrao;

        if (error instanceof Error) {
            console.error(error.message);
            mensagem = error.message;
            caption = "Erro";
        } else {
            console.error("Unknown error", error);
            mensagem = "Ocorreu um erro desconhecido";
            caption = "Erro";
        }

        await swAlert.fire({
            title: caption,
            text: mensagem,
            icon: "error",
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 5000,
        });
    },
    confirm: (
        mensagem: string,
        caption = "Atenção",
        confirmText = "Sim",
        cancelText = "Não"
    ) => {
        return swAlert.fire({
            title: caption,
            text: mensagem,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
        }).then((result) => result.isConfirmed);
    },
    questionWithInput: (
        mensagem: string,
        caption = "Atenção",
        confirmText = "Sim",
        cancelText = "Não",
        invalidMessageValidation = "Campo inválido",
        inputPlaceholder = "Digite aqui"
    ) => {
        return swAlert.fire({
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
        }).then((result) => result.value ?? "");
    },
};

export default Alerts;