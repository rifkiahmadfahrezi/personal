import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { Cursor } from "../fx/cursor";
import { Backdrop } from "../fx/backdrop";

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
      </>
   );
};
