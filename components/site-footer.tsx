import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-amber-500">
              DS.Portfolio
            </Link>
            <p className="mt-2 text-muted-foreground max-w-md">
              Transforming data into insights and building intelligent systems that solve real-world problems.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Certificates
                </Link>
              </li>
            
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex flex-col space-y-3">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-amber-500 transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                <span>GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-amber-500 transition-colors"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-amber-500 transition-colors"
              >
                <Twitter className="h-5 w-5 mr-2" />
                <span>Twitter</span>
              </Link>
              <Link
                href="mailto:contact@example.com"
                className="flex items-center text-muted-foreground hover:text-amber-500 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                <span>Email</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Data Science Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
