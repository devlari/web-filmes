import { LoginForm } from "@/components/forms/login/login-form";
import { MainLayout } from "@/components/layout/main-layout";
import { parseCookies } from "nookies";

export default function LoginPage() {
  return (
    <MainLayout>
      <LoginForm />
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
