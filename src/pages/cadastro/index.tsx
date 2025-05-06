import { CadastroForm } from "@/components/forms/cadastro/cadastro-form";
import { MainLayout } from "@/components/layout/main-layout";
import { parseCookies } from "nookies";

export default function CadastroPage() {
  return (
    <MainLayout>
      <CadastroForm />
    </MainLayout>
  );
}

export const getServerSideProps = async (ctx) => {
    const cookies = parseCookies(ctx);
    const token = cookies["@token"];
  
    if (token) {
      return {
        redirect: {
          destination: "/filmes",
          permanent: false,
        },
      };
    }

    return {
      props : {},
    };
};
