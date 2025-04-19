import { Button } from "../ui/button";
import Link from "next/link";
import { menus } from "./menu";
import { ThemeSwitcher } from "../theme-switcher";

export const Navbar = () => {
   return (
      <>
      <header className="bg-background/30 backdrop-blur-xl h-11 flex items-center justify-between py-2 sticky top-0 z-50">
         <nav className="flex items-center justify-between flex-grow max-w-screen-sm mx-auto px-4">
            <Link href={"/"}>
               {">_<"}
            </Link>

            <ul className="flex items-center justify-between gap-1">
               {menus.map(menu => (
                  <li key={menu.link}>
                     <Button size={"sm"} variant={'ghost'} asChild>
                        <Link href={menu.link}>
                           {menu.label}
                        </Link>
                     </Button>
                  </li>
               ))}
               <li>
                  <ThemeSwitcher />
               </li>
            </ul>
         </nav>
      </header>
      </>
   )
};
