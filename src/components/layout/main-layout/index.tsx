import { Footer, Header } from "@/components";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Header />
            <main className="flex-grow px-4 py-6">{children}</main>
        <Footer />
    </>
  );
}
