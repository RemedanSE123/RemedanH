"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"

const timelineItems = [
  {
    year: "Present",
    title: "AI Specialist",
    company: "Next Frontier",
    description:
      "Currently working on cutting-edge AI applications, including generative models and reinforcement learning systems.",
  },
  {
    year: "2023",
    title: "ML Engineer",
    company: "Neural Systems",
    description: "Specialized in building and deploying neural networks and deep learning models at scale.",
  },
  {
    year: "2022",
    title: "Data Scientist",
    company: "Future Tech",
    description:
      "Developed end-to-end machine learning solutions for business problems, focusing on NLP and computer vision.",
  },
  {
    year: "2021",
    title: "Junior Data Scientist",
    company: "AI Innovations",
    description:
      "Transitioned to data science, building predictive models using Python and machine learning algorithms.",
  },
  
]

export function Timeline() {
  return (
    <section className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">My Data Journey</h2>
        <div className="h-1 w-20 bg-amber-500 mx-auto mb-6"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The evolution of my career from internships to artificial intelligence specialist.
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-300" />

        <div className="space-y-12">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } md:flex-row-reverse md:even:flex-row`}
            >
              <div className="flex-1 md:w-1/2" />

              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-amber-500 z-10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-background animate-pulse"></div>
              </div>

              <div className="flex-1 md:w-1/2">
                <Card className="border-none hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-background to-muted/50">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-amber-500" />
                        {item.title}
                      </CardTitle>
                      <span className="text-sm font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-500">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        {item.year}
                      </span>
                    </div>
                    <CardDescription className="text-base font-medium">{item.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
