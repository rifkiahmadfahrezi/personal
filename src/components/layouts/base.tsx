import { Navbar } from "../navbar";
import { Footer } from "../footer";

export const BaseLayout = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   return (
      <>
         <Navbar />
         <main className="max-w-2xl mx-auto px-5 py-16 md:py-24 min-h-[calc(100svh-3rem)]">
            {children}
         </main>
         <Footer />
      </>
   );
};