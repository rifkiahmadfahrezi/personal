import {
   Hero,
   Projects,
   Statement,
   Experience,
} from "@/components/page/home";
import { Blogs } from "./blogs";

export default function Home() {
   return (
      <>
         <Hero />
         <Projects />
         <Statement />
         <Experience />
         <Blogs />
      </>
   );
}
