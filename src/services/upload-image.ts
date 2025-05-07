export const handleUploadImage = async (token: string, formData: FormData) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/filmes/upload`,
            {
                method: "POST",
                headers: {
                    "x-access-token": token,
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            }
        );

        console.log(response);

        return response.json();
    } catch (error) {
        console.error("Erro ao fazer a requisição de upload:", error);
        return;
    }
};
