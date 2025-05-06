import { Footer, Header } from "@/components";

type MainLayoutProps = {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
        <Header />
            <main className="flex-grow px-4 py-6">{children}</main>
        <Footer />
    </>
  );
}
