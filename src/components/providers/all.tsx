"use client"

import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { ThemeProvider } from "./theme-provider";

export const AllProviders = ({
   children
}: {
   children: React.ReactNode
}) => {
   const reduce = useReducedMotion();
   return (
      <>
      <ThemeProvider
         attribute="class"
         defaultTheme="dark"
         enableSystem
         disableTransitionOnChange
         >
      {!reduce && (
         <ReactLenis root options={{ lerp: 0.1, anchors: true, allowNestedScroll: true }} />
      )}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeProvider>
      </>
   )
};
