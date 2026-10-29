import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { Cursor } from "../fx/cursor";
import { Backdrop } from "../fx/backdrop";
import { Preloader } from "../fx/preloader";
import { PageTransition } from "../fx/page-transition";

export const BaseLayout = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   return (
      <>
         <Backdrop />
         <Navbar />
         <main className="min-h-[100svh]">{children}</main>
         <Footer />
         <Cursor />
         <PageTransition />
         <Preloader />
      </>
   );
};
