"use client"

import { ThemeProvider } from "./theme-provider";

export const AllProviders = ({
   children
}: {
   children: React.ReactNode
}) => {
   return (
      <>
      <ThemeProvider
         attribute="class"
         defaultTheme="light"
         enableSystem
         disableTransitionOnChange
         >
      {children}
      </ThemeProvider>
      </>
   )
};
