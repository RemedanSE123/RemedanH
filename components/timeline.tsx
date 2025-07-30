"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Search, Database, BarChart3, Code, Target } from "lucide-react"

const workflowSteps = [
  {
    step: "01",
    title: "Problem Understanding",
    tool: "Strategic Thinking • Domain Research",
    description:
      "Starting with a sharp focus on business context — translating real-world challenges into data problems. Collaborate cross-functionally to define KPIs, stakeholder goals, and success metrics that actually move the needle.",
    icon: Target,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    step: "02",
    title: "Data Acquisition & Web Scraping",
    tool: "Python • BeautifulSoup • APIs • Selenium",
    description:
      "Acquire structured and unstructured data from real-time web sources, APIs, and enterprise systems. Built resilient scrapers and automated pipelines ensuring up-to-date and scalable ingestion strategies.",
    icon: Search,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    step: "03",
    title: "Data Cleaning & Feature Engineering",
    tool: "Pandas • NumPy • Pyjanitor • Regex",
    description:
      "Cleaned millions of rows of messy real-world data, resolved schema mismatches, engineered meaningful features, and transformed data into actionable formats ready for modeling and dashboarding.",
    icon: Code,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    step: "04",
    title: "Advanced SQL Analytics",
    tool: "PostgreSQL • CTEs • Window Functions",
    description:
      "Performed complex joins, aggregations, and rolling calculations using SQL. Delivered insights at scale by optimizing queries and leveraging database indexes for performance on real-world data volumes.",
    icon: Database,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    step: "05",
    title: "Machine Learning & Predictive Modeling",
    tool: "Scikit-learn • XGBoost • TensorFlow",
    description:
      "Built supervised and unsupervised ML models for classification, regression, and clustering. Tuned hyperparameters, validated models, and explained results to business stakeholders with real impact metrics.",
    icon: Brain,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    step: "06",
    title: "Data Visualization & Storytelling",
    tool: "Power BI • Tableau • Matplotlib • Seaborn",
    description:
      "Translated insights into interactive dashboards and visual stories. Helped executives and non-technical teams understand trends, outliers, and business levers visually and intuitively.",
    icon: BarChart3,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
]

export function Timeline() {
  return (
    <section className="container py-8 md:py-16 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8 md:mb-12"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
  My Data Science Workflow
</h2>

        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "5rem" }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="h-1 md:h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 mx-auto mb-6 md:mb-8 rounded-full shadow-lg"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed"
        >
          A systematic approach to solving complex data problems - from understanding requirements to delivering
          actionable insights that drive business value and competitive advantage.
        </motion.p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        {/* Desktop Timeline line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 via-indigo-500 to-amber-500 rounded-full opacity-40 shadow-sm" />

        {/* Mobile Timeline line */}
        <div className="md:hidden absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 rounded-full opacity-50" />

        <div className="space-y-6 md:space-y-16">
          {workflowSteps.map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* DESKTOP LAYOUT - Enhanced PC View Style */}
                <div className={`hidden md:flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className="flex-1" />

                  {/* Desktop Timeline dot - Enhanced */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-background to-muted z-20 flex items-center justify-center border-4 border-background shadow-2xl`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center shadow-inner border border-white/20`}
                    >
                      <IconComponent className={`h-6 w-6 ${item.color}`} />
                    </div>
                  </motion.div>

                  {/* Desktop Content Card - Enhanced */}
                  <div className="flex-1 max-w-lg">
                    <motion.div
                      whileHover={{
                        scale: 1.03,
                        y: -10,
                        transition: { duration: 0.3 },
                      }}
                      className="group"
                    >
                      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden backdrop-blur-sm">
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        {/* Enhanced step number */}
                        <div
                          className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br ${item.bgColor} border-2 border-white/30 flex items-center justify-center shadow-lg backdrop-blur-sm`}
                        >
                          <span className={`text-sm font-bold ${item.color}`}>{item.step}</span>
                        </div>

                        <CardHeader className="pb-3 pt-6">
                          <CardTitle className="flex items-center text-xl font-bold">
                            <IconComponent className={`h-6 w-6 mr-3 ${item.color} flex-shrink-0`} />
                            <span className="leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                              {item.title}
                            </span>
                          </CardTitle>
                          <CardDescription className="text-sm font-semibold opacity-90 mt-2 text-muted-foreground/90">
                            {item.tool}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 pb-6">
                          <p className="text-sm leading-relaxed text-foreground/85 font-medium">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>

                {/* MOBILE LAYOUT - Enhanced Mobile Style */}
                <div className="md:hidden flex items-center">
                  <div className="absolute left-6 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-background to-muted z-20 flex items-center justify-center border-3 border-background shadow-xl">
                    <div
                      className={`w-8 h-8 rounded-full ${item.bgColor} flex items-center justify-center border border-white/20`}
                    >
                      <IconComponent className={`h-4 w-4 ${item.color}`} />
                    </div>
                  </div>
                  <div className="flex-1 ml-16">
                    <motion.div
                      whileHover={{
                        scale: 1.02,
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                      className="group"
                    >
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <div
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full ${item.bgColor} border border-white/20 flex items-center justify-center shadow-lg`}
                        >
                          <span className={`text-xs font-bold ${item.color}`}>{item.step}</span>
                        </div>

                        <CardHeader className="pb-2 pt-4">
                          <CardTitle className="flex items-center text-base font-bold">
                            <IconComponent className={`h-4 w-4 mr-2 ${item.color} flex-shrink-0`} />
                            <span className="leading-tight">{item.title}</span>
                          </CardTitle>
                          <CardDescription className="text-xs font-semibold opacity-90 mt-1">
                            {item.tool}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4">
                          <p className="text-xs leading-relaxed text-foreground/90 font-medium">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Enhanced Bottom summary */}
      
    </section>
  )
}
