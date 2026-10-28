// Fixed page backdrop: editorial column lines, two slow-drifting soft glows, grain sits on top (globals.css).
export const Backdrop = () => (
   <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-[10vw] -top-[20vh] size-[60vw] rounded-full bg-foreground/[0.07] blur-[120px] animate-[drift_28s_ease-in-out_infinite_alternate] motion-reduce:animate-none" />
      <div className="absolute -bottom-[25vh] -right-[15vw] size-[55vw] rounded-full bg-foreground/[0.05] blur-[120px] animate-[drift_34s_ease-in-out_infinite_alternate-reverse] motion-reduce:animate-none" />

      <div className="gutter absolute inset-0 grid grid-cols-4 md:grid-cols-12 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
         {Array.from({ length: 12 }, (_, i) => (
            <span
               key={i}
               className={`border-l border-foreground/[0.06] last:border-r ${i >= 4 ? "hidden md:block" : ""} ${i === 3 ? "max-md:border-r" : ""}`}
            />
         ))}
      </div>

      {/* Dot grid, fades out toward the edges. */}
      <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(color-mix(in_oklch,var(--foreground)_22%,transparent)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
   </div>
);
