import { MainLayout } from "@/components";
import { UsuarioPayload } from "@/components/forms/cadastro/types";
import { Filme, PaginationResponse } from "@/modules/filmes";
import ApiClient from "@/services/http-client";
import { parseCookies } from "nookies";

type FilmesPageProps = {
    filmes: PaginationResponse<Filme[]>;
    usuario: UsuarioPayload;
};



export default function FilmesPage({ filmes, usuario }: FilmesPageProps) {
    return (
        <MainLayout>
            {filmes.totalPages}
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    const cookies = parseCookies(ctx);
    const token = cookies["@token"];
  
    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  
    const apiClient = new ApiClient(token);
    const usuario = await apiClient.get("/usuario");
    const filmes = await apiClient.get("/filmes");
  
    return {
      props: { filmes, usuario },
    };
  };