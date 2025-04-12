import { Navbar } from "../navbar"

export const BaseLayout = ({
   children
}: {
   children: React.ReactNode
}) => {
  return (
   <>
   <div className="max-w-screen-sm px-3 mx-auto">
   <Navbar />
      <main className="max-h-svh">
      {children}
      </main>
   </div>
   </>
  )
}