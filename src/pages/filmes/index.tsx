import { MainLayout } from "@/components";
import { UsuarioPayload } from "@/components/forms/cadastro/types";
import { ListFilmes } from "@/modules/filmes/components/list-filmes";
import { Filme, PaginationResponse } from "@/modules/filmes/types";
import ApiClient from "@/services/http-client";
import { parseCookies } from "nookies";

type FilmesPageProps = {
    filmes: PaginationResponse<Filme[]>;
    usuario: UsuarioPayload;
};


export default function FilmesPage({ filmes }: FilmesPageProps) {
    return (
        <MainLayout>
            <ListFilmes data={filmes} />
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies["@token"];
  const page = Number(ctx.query.page) || 1; 

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
  const filmes = await apiClient.get(`/filmes?page=${page}`); 

  return {
    props: { filmes, usuario },
  };
};
