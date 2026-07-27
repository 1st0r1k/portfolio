import { Sidebar } from '@/components/Sidebar'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 space-y-24 p-8 lg:p-12">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Footer />
      </main>
    </div>
  )
}
