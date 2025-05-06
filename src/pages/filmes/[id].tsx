import { MainLayout } from "@/components";
import ApiClient from "@/services/http-client";
import { Filme } from "@/modules/filmes/types";
import Image from "next/image";
import { parseCookies } from "nookies";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

type DetalhesFilmeProps = {
  filme: Filme;
};

export default function DetalhesFilme({ filme }: DetalhesFilmeProps) {
  return (
    <MainLayout>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{filme.tituloTraduzido}</h1>
          <h2 className="text-xl text-gray-600">
            Título original: {filme.tituloOriginal}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button label="Editar" icon="pi pi-pencil" />
          <Button label="Excluir" icon="pi pi-trash" outlined />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex flex-col gap-2">
          {filme.urlImagem && (
            <Image
              src={filme.urlImagem}
              alt={filme.tituloTraduzido}
              width={500}
              height={700}
            />
          )}
        </div>
        <div className="flex flex-col gap-2 items-start flex-1">
          <p>{filme.descricao}</p>

          <p>{filme.sinopse ? filme.sinopse : "Sinopse não disponível."}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Tag>
            <strong>Data de Lançamento</strong> <br />{" "}
            {new Date(filme.dtLancamento).toLocaleDateString()}
          </Tag>
          <Tag>
            <strong>Duração</strong> <br />{" "}
            {filme.duracao ? `${filme.duracao} min` : "N/A"}
          </Tag>
          <Tag>
            <strong>Orçamento</strong> <br />{" "}
            {filme.orcamento ? `R$ ${filme.orcamento.toLocaleString()}` : "N/A"}
          </Tag>
          <Tag>
            <strong>Receita</strong> <br />{" "}
            {filme.receita ? `R$ ${filme.receita.toLocaleString()}` : "N/A"}
          </Tag>
          <Tag>
            <strong>Lucro</strong> <br />{" "}
            {filme.lucro ? `R$ ${filme.lucro.toLocaleString()}` : "N/A"}
          </Tag>
        </div>
      </div>
        <div>
            {filme.linkTrailer && (
              <a
                href={filme.linkTrailer}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Ver Trailer
              </a>
            )}
          </div>
    </MainLayout>
  );
}

export const getServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies["@token"];
  const { id } = ctx.params!;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const apiClient = new ApiClient(token);
  const filme = await apiClient.get(`/filme/${id}`);

  return {
    props: { filme },
  };
};
