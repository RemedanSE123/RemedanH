"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink, Star } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Predictive Sales Analysis",
    description:
      "Built a machine learning model to predict future sales based on historical data, improving forecast accuracy by 35%.",
    image: "/a6.png?height=400&width=600",
    tags: ["Python", "ML", "Pandas", "Scikit-learn"],
    link: "/projects/predictive-sales",
  },
  {
    id: 2,
    title: "Customer Segmentation Dashboard",
    description:
      "Created an interactive Power BI dashboard for customer segmentation, enabling targeted marketing strategies.",
    image: "/b1.png?height=400&width=600",
    tags: ["Power BI", "SQL", "Excel"],
    link: "/projects/customer-segmentation",
  },
  {
    id: 3,
    title: "Neural Network for Image Classification",
    description: "Developed a convolutional neural network for classifying satellite imagery with 92% accuracy.",
    image: "/dars.png?height=400&width=600",
    tags: ["Python", "TensorFlow", "AI", "ML"],
    link: "/projects/neural-network",
  },
]

export function FeaturedProjects() {
  return (
    <section className="container py-24 overflow-x-hidden relative" id="featured-projects">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-amber-500 mb-6"></div>
          <p className="text-muted-foreground max-w-2xl">
            A selection of my most impactful data science and machine learning projects that demonstrate my technical
            skills and problem-solving abilities.
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0 bg-amber-500 hover:bg-amber-600 text-black">
          <Link href="/projects">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>

      <div className="absolute top-24 right-4 md:right-12 hidden md:flex items-center gap-2 text-muted-foreground">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-amber-500/30">
          <span className="text-amber-500 font-mono">{projects.length}</span>
        </div>
        <span className="text-sm">Projects</span>
      </div>

      <div className="flex flex-col space-y-16">
        {projects.map((project, index) => (
          <div key={project.id}>
            <ProjectItem project={project} index={index} />
            {index < projects.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-center"
              >
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ProjectItem remains unchanged
function ProjectItem({ project, index }: { project: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const isImageLeft = index % 2 === 0

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: (isImageLeft: boolean) => ({
      x: isImageLeft ? -50 : 50,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  const decorativeElements = [
    { top: "10%", left: isImageLeft ? "-5%" : "auto", right: isImageLeft ? "auto" : "-5%", size: "60px" },
    { bottom: "10%", right: isImageLeft ? "-3%" : "auto", left: isImageLeft ? "auto" : "-3%", size: "40px" },
  ]

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-col ${isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center relative max-w-full`}
    >
      {decorativeElements.map((elem, i) => (
        <motion.div
          key={i}
          className="hidden lg:block absolute rounded-full bg-amber-500/10 z-0"
          style={{
            top: elem.top || "auto",
            left: elem.left || "auto",
            right: elem.right || "auto",
            bottom: elem.bottom || "auto",
            width: elem.size,
            height: elem.size,
          }}
          animate={{
            y: [0, 10, 0],
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
          }}
        />
      ))}

      <motion.div
        custom={isImageLeft}
        variants={itemVariants}
        className="w-full lg:w-1/2 max-w-[600px] rounded-xl shadow-2xl relative z-10"
      >
        <div className="relative w-full overflow-hidden rounded-xl group">
          <div className="absolute top-4 right-4 z-20 bg-amber-500 text-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Star className="h-4 w-4" />
            <span className="text-sm font-medium">Featured</span>
          </div>

          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 rounded-xl">
              <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-xl font-bold">{project.title}</h4>
                <p className="text-white/80 mt-2 line-clamp-2">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        custom={!isImageLeft}
        variants={itemVariants}
        className="w-full lg:w-1/2 max-w-[600px] flex flex-col relative z-10"
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string, i: number) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/50 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-4 relative">
          {project.title}
          <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-12 bg-amber-500/50 rounded-r-md hidden lg:block"></span>
        </h3>

        <p className="text-muted-okinase text-lg mb-6">{project.description}</p>

        <div className="mb-6">
          <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tech: string) => (
              <div key={tech} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-sm">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 p-3 border-l-2 border-amber-500 bg-amber-500/5">
          <h4 className="text-sm font-medium">Key Achievement</h4>
          <p className="text-sm text-muted-foreground">
            {index === 0
              ? "Improved forecast accuracy by 35%"
              : index === 1
                ? "Increased marketing ROI by 42%"
                : "Achieved 92% classification accuracy"}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-auto">
          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black relative overflow-hidden group">
            <Link href={project.link}>
              <span className="relative z-10 flex items-center">
                View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-amber-600 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-500 transition-all duration-300"
          >
            <Link href={project.link}>
              <ExternalLink className="mr-2 h-4 w-4" /> Visit Project
            </Link>
          </Button>
        </div>

        <div className="hidden lg:flex items-center gap-2 mt-8">
          <span className="text-sm text-muted-foreground">Project completion</span>
          <div className="h-2 bg-muted rounded-full flex-1 max-w-[200px] overflow-hidden">
            <motion.div
              className="h-full bg-amber-500 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-sm font-medium">100%</span>
        </div>

        {index === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-4 border border-amber-500/20 rounded-lg bg-amber-500/5 relative"
          >
            <div className="absolute -top-3 -left-3 text-4xl text-amber-500/30">"</div>
            <p className="text-sm italic text-muted-foreground">
              This project revolutionized our approach to customer segmentation, resulting in a 28% increase in
              conversion rates.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-500/20"></div>
              <span className="text-xs font-medium">Sarah Johnson, Marketing Director</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}