import { 
  Hero, 
  Projects, 
} from "@/components/page/home"
import { Blogs } from "./blogs"

export default function Home() {
  return (
    <>
      <div className="grid gap-6 py-7">
        <Hero />
        <Projects />
        <Blogs />
      </div>
    </>
  )
}