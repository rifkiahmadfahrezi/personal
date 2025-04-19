import { Navbar } from "../navbar"
import { Footer } from "../footer"

export const BaseLayout = ({
   children
}: {
   children: React.ReactNode
}) => {
  return (
   <>
   <Navbar />
   <main className="max-h-svh max-w-screen-sm mx-auto px-4">
   {children}
   <Footer />
   </main>
   </>
  )
}