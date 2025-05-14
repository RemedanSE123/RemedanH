"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, ArrowDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Certificate data
const certificates = [
  {
    id: 1,
    title: "Data Science Professional Certificate",
    issuer: "IBM",
    date: "2020",
    image: "/placeholder.svg?height=400&width=600",
    categories: ["Data Science", "Python"],
    link: "https://example.com/certificate1",
  },
  {
    id: 2,
    title: "Machine Learning Specialization",
    issuer: "Stanford University",
    date: "2021",
    image: "/placeholder.svg?height=400&width=600",
    categories: ["ML", "AI"],
    link: "https://example.com/certificate2",
  },
  {
    id: 3,
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2021",
    image: "/placeholder.svg?height=400&width=600",
    categories: ["ML", "AI"],
    link: "https://example.com/certificate3",
  },
  {
    id: 4,
    title: "Excel Expert Certification",
    issuer: "Microsoft",
    date: "2019",
    image: "/placeholder.svg?height=400&width=600",
    categories: ["Excel"],
    link: "https://example.com/certificate4",
  },
  {
    id: 5,
    title: "SQL Advanced Certification",
    issuer: "Oracle",
    date: "2019",
    image: "/placeholder.svg?height=400&width=600",
    categories: ["SQL"],
    link: "https://example.com/certificate5",
  },
  {
    id: 6,
    title: "Power BI Data Analyst",
    issuer: "Microsoft",
    date: "2020",
    image: "/placeholder.svg?height=400&width=600",
    categories: ["Power BI"],
    link: "https://example.com/certificate6",
  },
  {
    id: 7,
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2022",
    image: "/placeholder.svg?height=400&width=600",
    categories: ["ML", "AI"],
    link: "https://example.com/certificate7",
  },
  {
    id: 8,
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI",
    date: "2022",
    image: "/placeholder.svg?height=400&width=600",
    categories: ["ML", "AI"],
    link: "https://example.com/certificate8",
  },
]

// Filter categories
const categories = ["All", "Excel", "SQL", "Power BI", "Data Science", "Python", "ML", "AI"]

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredCertificates =
    activeCategory === "All" ? certificates : certificates.filter((cert) => cert.categories.includes(activeCategory))

  return (
    <div className="container py-24 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Certificates</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Professional certifications and courses I've completed to enhance my skills in data science, machine learning,
          and AI.
        </p>
      </div>

      <Tabs defaultValue="All" className="mb-12">
        <TabsList className="flex flex-wrap justify-center">
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
      </Tabs>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((certificate, index) => (
          <motion.div
            key={certificate.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden card-hover">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={certificate.image || "/placeholder.svg"}
                  alt={certificate.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{certificate.title}</CardTitle>
                <CardDescription>
                  {certificate.issuer} • {certificate.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {certificate.categories.map((category) => (
                    <Badge key={category} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button asChild variant="ghost" className="flex-1">
                  <Link href={certificate.link} target="_blank" rel="noopener noreferrer">
                    View <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-amber-500 text-amber-500 hover:bg-amber-500/10"
                >
                  <Link href={`${certificate.link}/pdf`} target="_blank" rel="noopener noreferrer">
                    PDF <ArrowDown className="ml-2 h-4 w-4" />
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
