/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { MainLayout } from "@/components";
import { UsuarioPayload } from "@/components/forms/cadastro/types";
import { CadastroFilmeDialog } from "@/components/forms/filmes/cadastro-filme";
import { ListFilmes } from "@/modules/filmes/components/list-filmes";
import { Filme, PaginationResponse } from "@/modules/filmes/types";
import ApiClient from "@/services/http-client";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { Button } from "primereact/button";
import { useState } from "react";

type FilmesPageProps = {
  filmes: PaginationResponse<Filme[]>;
  usuario: UsuarioPayload;
};

export default function FilmesPage({ filmes }: FilmesPageProps) {
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <>
      <MainLayout>
        <Button
          onClick={() => setDialogVisible(true)}
          label="Cadastrar Filme"
          className="mt-4"
        />
        <ListFilmes data={filmes} />
        <CadastroFilmeDialog
          visible={dialogVisible}
          onHide={() => setDialogVisible(false)}
        />
      </MainLayout>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies["token"];
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
