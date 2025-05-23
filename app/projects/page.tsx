"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ExternalLink, Play, Search, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
    slug: "predictive-sales-analysis",
  },
  {
    id: 2,
    title: "Customer Segmentation Dashboard",
    description:
      "Created an interactive Power BI dashboard for customer segmentation, enabling targeted marketing strategies.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Power BI", "SQL", "Excel"],
    categories: ["Excel", "SQL", "Power BI"],
    slug: "customer-segmentation-dashboard",
  },
  {
    id: 3,
    title: "Neural Network for Image Classification",
    description: "Developed a convolutional neural network for classifying satellite imagery with 92% accuracy.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "TensorFlow", "AI", "ML"],
    categories: ["ML", "AI", "Python"],
    slug: "neural-network-image-classification",
  },
  {
    id: 4,
    title: "Sales Performance Excel Dashboard",
    description:
      "Created a comprehensive Excel dashboard with advanced formulas and pivot tables to track sales performance.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Excel", "Data Analysis", "VBA"],
    categories: ["Excel"],
    slug: "sales-performance-excel-dashboard",
  },
  {
    id: 5,
    title: "SQL Database Optimization",
    description:
      "Optimized database queries and structure, reducing query execution time by 40% and improving application performance.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["SQL", "Database Design", "Performance Tuning"],
    categories: ["SQL"],
    slug: "sql-database-optimization",
  },
  {
    id: 6,
    title: "Power BI Sales Analytics",
    description:
      "Developed interactive Power BI dashboards for sales analytics, providing real-time insights for decision-making.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Power BI", "DAX", "Data Modeling"],
    categories: ["Power BI"],
    slug: "power-bi-sales-analytics",
  },
  {
    id: 7,
    title: "Sentiment Analysis Tool",
    description: "Built an NLP-based sentiment analysis tool to analyze customer feedback and social media mentions.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "NLP", "ML", "AI"],
    categories: ["ML", "AI", "Python"],
    slug: "sentiment-analysis-tool",
  },
  {
    id: 8,
    title: "Anomaly Detection System",
    description:
      "Developed a machine learning system to detect anomalies in manufacturing processes, reducing defects by 25%.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "ML", "Statistical Analysis"],
    categories: ["ML", "Python"],
    slug: "anomaly-detection-system",
  },
]

// Filter categories
const categories = ["All", "Excel", "SQL", "Power BI", "Python", "ML", "AI"]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [isLoaded, setIsLoaded] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    // Filter projects based on both category and search query
    const filtered = projects.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.categories.includes(activeCategory)
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })

    setFilteredProjects(filtered)

    // Set loaded after initial render
    if (!isLoaded) {
      setIsLoaded(true)
    }
  }, [activeCategory, searchQuery, isLoaded])

  // Check if tabs can be scrolled
  useEffect(() => {
    const checkScroll = () => {
      if (tabsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5) // 5px buffer
      }
    }

    // Initial check
    checkScroll()

    // Add event listener for resize
    window.addEventListener("resize", checkScroll)

    // Add event listener for scroll
    if (tabsRef.current) {
      tabsRef.current.addEventListener("scroll", checkScroll)
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkScroll)
      if (tabsRef.current) {
        tabsRef.current.removeEventListener("scroll", checkScroll)
      }
    }
  }, [])

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200 // Adjust as needed
      const newScrollLeft =
        direction === "left" ? tabsRef.current.scrollLeft - scrollAmount : tabsRef.current.scrollLeft + scrollAmount

      tabsRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="container py-16 md:py-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">
          My Projects
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A showcase of my data science, machine learning, and AI projects demonstrating my technical skills and
          problem-solving abilities.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mb-12 space-y-6"
      >
        {/* Desktop Filter Categories */}
        <div className="relative hidden md:block">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-300/10 blur-xl rounded-xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <div className="relative z-10 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className={`mr-1 flex-shrink-0 ${!canScrollLeft ? "opacity-0" : "opacity-100"}`}
              onClick={() => scrollTabs("left")}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div ref={tabsRef} className="flex-1 overflow-x-auto scrollbar-hide">
              <Tabs defaultValue="All" className="w-full">
                <TabsList className="flex p-1 bg-background/80 backdrop-blur-sm rounded-xl border border-amber-500/20 w-fit mx-auto">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      onClick={() => setActiveCategory(category)}
                      className="text-sm md:text-base data-[state=active]:bg-amber-500 data-[state=active]:text-black px-4 py-2"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={`ml-1 flex-shrink-0 ${!canScrollRight ? "opacity-0" : "opacity-100"}`}
              onClick={() => scrollTabs("right")}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Filter Categories */}
        <div className="md:hidden">
          <div className="flex items-center justify-between gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between items-center border-amber-500/20">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Filter: {activeCategory}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-2 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    className={activeCategory === category ? "bg-amber-500/10 text-amber-500 font-medium" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects by title, description or technology..."
            className="pl-10 border-amber-500/20 focus-visible:ring-amber-500/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + searchQuery}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants} className="h-full">
                <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-b from-background to-muted/30">
                  <div className="relative h-52 overflow-hidden group">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                      <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                        <Play className="h-5 w-5 text-black" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2">{project.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="bg-muted/50 hover:bg-muted">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base line-clamp-3">{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild variant="default" className="bg-amber-500 hover:bg-amber-600 text-black">
                      <Link href={`/projects/${project.slug}`}>
                        View Project <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="rounded-full border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-500"
                    >
                      <Link href={`/projects/${project.slug}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
              <Button
                variant="link"
                className="text-amber-500 mt-2"
                onClick={() => {
                  setActiveCategory("All")
                  setSearchQuery("")
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
