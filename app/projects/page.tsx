"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ExternalLink, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Project data
const projects = [
  {
    id: 1,
    title: "Predictive Sales Analysis",
    description:
      "Built a machine learning model to predict future sales based on historical data, improving forecast accuracy by 35%.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "ML", "Pandas", "Scikit-learn"],
    categories: ["ML", "Python"],
    link: "/projects/predictive-sales",
  },
  {
    id: 2,
    title: "Customer Segmentation Dashboard",
    description:
      "Created an interactive Power BI dashboard for customer segmentation, enabling targeted marketing strategies.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Power BI", "SQL", "Excel"],
    categories: ["Excel", "SQL", "Power BI"],
    link: "/projects/customer-segmentation",
  },
  {
    id: 3,
    title: "Neural Network for Image Classification",
    description: "Developed a convolutional neural network for classifying satellite imagery with 92% accuracy.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "TensorFlow", "AI", "ML"],
    categories: ["ML", "AI", "Python"],
    link: "/projects/neural-network",
  },
  {
    id: 4,
    title: "Sales Performance Excel Dashboard",
    description:
      "Created a comprehensive Excel dashboard with advanced formulas and pivot tables to track sales performance.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Excel", "Data Analysis", "VBA"],
    categories: ["Excel"],
    link: "/projects/excel-dashboard",
  },
  {
    id: 5,
    title: "SQL Database Optimization",
    description:
      "Optimized database queries and structure, reducing query execution time by 40% and improving application performance.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["SQL", "Database Design", "Performance Tuning"],
    categories: ["SQL"],
    link: "/projects/sql-optimization",
  },
  {
    id: 6,
    title: "Power BI Sales Analytics",
    description:
      "Developed interactive Power BI dashboards for sales analytics, providing real-time insights for decision-making.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Power BI", "DAX", "Data Modeling"],
    categories: ["Power BI"],
    link: "/projects/power-bi-analytics",
  },
  {
    id: 7,
    title: "Sentiment Analysis Tool",
    description: "Built an NLP-based sentiment analysis tool to analyze customer feedback and social media mentions.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "NLP", "ML", "AI"],
    categories: ["ML", "AI", "Python"],
    link: "/projects/sentiment-analysis",
  },
  {
    id: 8,
    title: "Anomaly Detection System",
    description:
      "Developed a machine learning system to detect anomalies in manufacturing processes, reducing defects by 25%.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "ML", "Statistical Analysis"],
    categories: ["ML", "Python"],
    link: "/projects/anomaly-detection",
  },
]

// Filter categories
const categories = ["All", "Excel", "SQL", "Power BI", "Python", "ML", "AI"]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.categories.includes(activeCategory))

  return (
    <div className="container py-24 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A showcase of my data science, machine learning, and AI projects demonstrating my technical skills and
          problem-solving abilities.
        </p>
      </div>

      <Tabs defaultValue="All" className="mb-12">
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-300/10 blur-xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <TabsList className="relative z-10 flex flex-wrap justify-center p-2 bg-background/80 backdrop-blur-sm rounded-xl border border-amber-500/20">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className="text-sm md:text-base data-[state=active]:bg-amber-500 data-[state=active]:text-black"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-b from-background to-muted/30">
              <div className="relative h-48 overflow-hidden group">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {project.id % 2 === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                      <Play className="h-6 w-6 text-black" />
                    </div>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="ghost" className="hover:bg-amber-500/10 hover:text-amber-500">
                  <Link href={project.link}>
                    View Details <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="rounded-full border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-500"
                >
                  <Link href={project.link}>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
