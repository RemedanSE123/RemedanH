"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"
import { useEffect, useState } from "react"

export function CTASection() {
  const [shapes, setShapes] = useState<
    { x: string; y: string; width: string; height: string; duration: number }[]
  >([])

  useEffect(() => {
    const generatedShapes = Array.from({ length: 5 }).map(() => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      width: `${Math.random() * 200 + 50}px`,
      height: `${Math.random() * 200 + 50}px`,
      duration: Math.random() * 10 + 10,
    }))
    setShapes(generatedShapes)
  }, [])

  return (
    <section className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-300/5 border p-8 md:p-12"
      >
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {shapes.map((shape, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-amber-500/10"
              initial={{
                x: shape.x,
                y: shape.y,
                width: shape.width,
                height: shape.height,
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Work Together?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground mb-8"
          >
            I'm currently available for freelance projects, full-time positions, and consulting opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="text-lg bg-amber-500 hover:bg-amber-600 text-black">
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg border-amber-500 text-amber-500 hover:bg-amber-500/10"
            >
              <Link href="https://github.com/RemedanSE123">
                <Github className="mr-2 h-5 w-5" /> View GitHub
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
