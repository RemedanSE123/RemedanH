"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  ChevronDown,
  Github,
  Code,
  Database,
  LineChart,
  Globe,
  Braces,
  Terminal,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react"

// Code snippet for the animated terminal
const codeSnippet = `
developer = {
    'name': 'Remedan Hyeredin',
    'role': 'Data Scientist & Analyst',
    'experience': '2+ years'
}

print(f"{developer['name']} — {developer['role']} with {developer['experience']} of experience.")



`.trim();

export function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSkillIndex, setActiveSkillIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [currentLine, setCurrentLine] = useState(0)

  const skills = ["Web Developer", "Data Analyst", "ML Engineer", "GIS Specialist"]
  const codeLines = codeSnippet.split("\n")

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Typing effect for terminal
  useEffect(() => {
    if (currentLine < codeLines.length) {
      const timer = setTimeout(() => {
        setTypedText((prev) => prev + codeLines[currentLine] + "\n")
        setCurrentLine((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      // Add the final console output with a delay
      const timer = setTimeout(() => {
        setTypedText((prev) => prev + "\n> Building amazing digital experiences")
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentLine])

  // Rotate through skills
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false)
      setTimeout(() => {
        setActiveSkillIndex((prev) => (prev + 1) % skills.length)
        setIsTyping(true)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [skills.length])

  const handleScroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden"
      style={{ transform: "scale(0.9)" }} // Scale the entire section to 90%
    >
      <motion.div
        style={{ y, opacity }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10"
      >
        <div className="text-left space-y-8">
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative z-10"
            >
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-4xl md:text-5xl lg:text-6xl tracking-tight"
                style={{ fontFamily: "Roboto, Helvetica Neue, Arial, sans-serif", letterSpacing: "-0.02em", fontWeight: 400 }}
              >
                Remedan Hyeredin
              </span>
              <motion.span
                className="absolute -z-10 blur-xl opacity-30 text-amber-500 text-4xl md:text-5xl lg:text-6xl tracking-tight"
                style={{ fontFamily: "Roboto, Helvetica Neue, Arial, sans-serif", letterSpacing: "-0.02em", fontWeight: 400 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Remedan Hyeredin
              </motion.span>
              <div className="h-1 w-32 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-2"></div>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center h-12"
            >
              <span className="text-xl md:text-2xl font-medium text-muted-foreground mr-2">I'm a</span>
              <div className="relative h-12 overflow-hidden">
                <AnimatePresence mode="wait">
                  {isTyping && (
                    <motion.div
                      key={skills[activeSkillIndex]}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute"
                    >
                      <span className="text-xl md:text-2xl font-bold text-amber-500">{skills[activeSkillIndex]}</span>
                      <span className="inline-block w-[3px] h-6 ml-1 bg-amber-500 animate-blink"></span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-70"></div>
            <div className="pl-4">
              <p className="text-lg md:text-xl leading-relaxed">
                <span className="font-semibold text-amber-500">Data scientist</span> with over{" "}
                <span className="font-bold bg-amber-500/10 px-2 py-0.5 rounded-md">2+ years</span> of experience driving business impact through
                 <span className="italic">  Advanced Analytics, and Compelling Storytelling</span>.
                

              </p>
              <p className="text-lg md:text-xl leading-relaxed mt-3">
                I specialize in{" "}
                <span className="underline decoration-amber-500 decoration-2 underline-offset-2">
                  Data Science and Data Analysis
                </span>{" "}
                with a growing focus on <span className="font-semibold">Machine Learning</span> and{" "}
                <span className="font-semibold">Artificial Intelligence</span>.
              </p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-lg md:text-xl leading-relaxed mt-3 bg-gradient-to-r from-amber-500/10 to-transparent px-3 py-2 border-l-2 border-amber-500"
              >
                My work bridges the gap between data-driven decision-making and scalable software solutions.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              asChild
              size="lg"
              className="text-lg bg-amber-500 hover:bg-amber-600 text-black group relative overflow-hidden"
            >
              <Link href="/projects">
                <span className="relative z-10 flex items-center">
                  View Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-amber-600 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg border-amber-500 text-amber-500 hover:bg-amber-500/10 transition-all duration-300"
            >
              <Link href="https://github.com/RemedanSE123">
                <Github className="mr-2 h-5 w-5" /> GitHub
              </Link>
            </Button>

            <div className="hidden md:flex items-center gap-3 ml-4">
              <motion.a
                href="https://www.linkedin.com/in/remedan/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border hover:border-amber-500/50 hover:text-amber-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
             
              <motion.a
                href="mailto:remedanhyeredin@gmail.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border hover:border-amber-500/50 hover:text-amber-500 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap gap-2 pt-4"
          >
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
              <Code className="h-3.5 w-3.5 mr-1" /> Data Science
            </Badge>
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
              <LineChart className="h-3.5 w-3.5 mr-1" /> Data Analysis
            </Badge>
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
              <Database className="h-3.5 w-3.5 mr-1" /> Database 
            </Badge>
            
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
              <Braces className="h-3.5 w-3.5 mr-1" /> ML
            </Badge>
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
              <Globe className="h-3.5 w-3.5 mr-1" /> AI
            </Badge>
          </motion.div>
        </div>

        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative z-10"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-amber-500 shadow-xl shadow-amber-500/20">
              <Image src="/remdan.jpg" alt="Remedan's Profile" fill className="object-cover" />

              {/* Decorative circles */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 opacity-50 blur-sm -z-10"></div>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 opacity-20 blur-md -z-20"></div>
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 bg-background p-4 rounded-lg shadow-lg border border-border"
            >
              <span className="text-lg font-bold text-amber-500">2+ Years Experience</span>
            </motion.div>

            {/* Animated code terminal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -left-16 -bottom-32 md:-left-32 md:-bottom-16 w-64 md:w-80 h-48 bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-700"
            >
              <div className="h-6 bg-gray-800 flex items-center px-4">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-2 text-xs text-gray-400 flex items-center">
                  <Terminal className="h-3 w-3 mr-1" /> profile.py
                </div>
              </div>
              <div className="p-4 font-mono text-xs text-green-400 overflow-hidden h-[calc(100%-1.5rem)]">
                <pre className="whitespace-pre-wrap">{typedText}</pre>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="grid grid-cols-2 gap-4 mt-32 md:mt-16"
          >
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg">
              <div className="text-3xl font-bold text-amber-500">20+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg">
              <div className="text-3xl font-bold text-amber-500">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10"
      >
        <Button variant="ghost" size="icon" onClick={handleScroll} className="animate-bounce">
          <ChevronDown className="h-6 w-6" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </motion.div>

      {/* Scroll target */}
      <div ref={scrollRef} />

      {/* Featured work quick link */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      >
        <Link
          href="#featured-projects"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-amber-500 transition-colors"
        >
          <div className="h-20 w-px bg-border"></div>
          <span className="text-xs uppercase tracking-widest rotate-90 origin-center translate-y-6">Data Scientist</span>
          <div className="h-20 w-px bg-border"></div>
        </Link>
      </motion.div>
    </section>
  )
}