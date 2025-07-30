"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { GraduationCap, Award, BookOpen, Briefcase, Clock } from "lucide-react"

const educationData = [
  {
    id: 1,
    institution: "Adama Science and Technology University",
    degree: "B.Sc. in Software Engineering",
    description:
      "Built a strong foundation in software development, with emphasis on programming, system design, and advanced applications of data science, data analysis, machine learning, artificial intelligence, and statistical computing.",
    skills: [
      "Programming Languages: Java, Python, C++, R",
      "Data Science & Statistical Modeling",
      "Data Structures & Algorithms",
      "Database Design & Management",
      "Advanced Data Analysis & Visualization",
      "Machine Learning & AI Techniques",
      "Software Development Life Cycle",
    ],
    logo: "/adama.jpg?height=120&width=120",
    color: "#FCD34D", // amber-300
    icon: GraduationCap,
  },
  {
    id: 2,
    institution: "St. Mary's University",
    degree: "B.Sc. in Accounting and Finance(2026)",
    period: "2026",
    description:
      "Developed expertise in financial analysis and quantitative methods, leveraging data for economic decision-making.",
    skills: [
      "Financial Data Analysis",
      "Accounting Principles",
      "Budgeting & Forecasting",
      "Statistical Methods for Finance",
    ],
    logo: "/8271.jpg?height=120&width=120",
    color: "#F59E0B", // amber-500
    icon: BookOpen,
  },
  {
    id: 3,
    institution: "Online Courses",
    degree: "Continuous Learning",
    period: "Ongoing",
    description:
      "Dedicated to advancing skills in data science, artificial intelligence (AI), machine learning, and advanced analytics through diverse online platforms.",
  skills: [
  "Artificial Intelligence (AI) & Machine Learning Algorithms",
  "Advanced Data Analysis with Python (Pandas,  Scikit-learn)",
  " Web Applications (React, Node.js, Express)",
  "SQL & NoSQL Database Management (PostgreSQL, MongoDB)",
  "Cloud Automation & Data Pipelines (AWS, Azure, GCP)",
  "Interactive Dashboards & Reporting (Power BI, Tableau, Excel)",
  "Web Scraping & Data Collection (BeautifulSoup, Selenium, APIs)",
],

    logo: "/ud.webp?height=120&width=120",
    color: "#D97706", // amber-600
    icon: Briefcase,
  },
]

export function EducationSection() {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.03]"></div>
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-amber-500/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-amber-500/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-amber-500" />
            Educational Journey
          </h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            My academic background and continuous learning path that shapes my professional expertise
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Timeline center line - desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700"></div>

          {/* Timeline left line - mobile */}
          <div className="md:hidden absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700"></div>

          {educationData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ item, index }: { item: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const isEven = index % 2 === 0

  // Animation variants for desktop
  const desktopContainerVariants = {
    hidden: { opacity: 0, x: isEven ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Animation variants for mobile
  const mobileContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const IconComponent = item.icon

  return (
    <div className="relative mb-12 md:mb-16 last:mb-0" ref={ref}>
      {/* Desktop Layout */}
      <div className="hidden md:flex justify-center items-start relative">
        {/* Timeline dot - desktop */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 z-10"
          style={{
            backgroundColor: "var(--background)",
            borderColor: item.color,
            top: "30px",
          }}
        ></div>

        {/* Main content - positioned on left or right side */}
        <motion.div
          variants={desktopContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`w-full md:w-[45%] ${isEven ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}
        >
          {/* Content card */}
          <div
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group"
            style={{ borderColor: item.color }}
          >
            {/* Header with gradient background */}
            <div
              className="p-6 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`,
              }}
            >
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center relative z-10">
                {/* Logo */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white/90 flex items-center justify-center shadow-md">
                  <Image
                    src={item.logo || "/placeholder.svg"}
                    alt={item.institution}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>

                {/* Institution info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.institution}</h3>
                  {item.period === "Ongoing" && (
                    <div className="flex items-center text-muted-foreground mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.period}
                    </div>
                  )}
                </div>

                {/* Degree badge */}
                <div
                  className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm"
                  style={{ backgroundColor: `${item.color}30`, color: item.color }}
                >
                  <IconComponent className="h-4 w-4" />
                  {item.degree}
                </div>
              </div>

              {/* Decorative elements */}
              <div
                className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-20"
                style={{ background: `radial-gradient(circle, ${item.color}, transparent 70%)` }}
              ></div>
            </div>

            {/* Description */}
            <div className="p-6 bg-background">
              <p className="text-muted-foreground mb-4">{item.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Skills section - desktop side layout */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`absolute top-0 w-[45%] ${isEven ? "right-0 md:pl-12" : "left-0 md:pr-12"}`}
          style={{ minHeight: "100px" }}
        >
          <div
            className="rounded-xl p-6 shadow-lg bg-background relative overflow-hidden"
            style={{
              borderLeft: isEven ? `4px solid ${item.color}` : "none",
              borderRight: !isEven ? `4px solid ${item.color}` : "none",
            }}
          >
            {/* Connecting line to timeline */}
            <div
              className="absolute top-8 h-[2px] z-0"
              style={{
                background: item.color,
                left: isEven ? "-12px" : "auto",
                right: !isEven ? "-12px" : "auto",
                width: "12px",
              }}
            ></div>

            <h4 className="font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-amber-500" />
              Key Skills & Achievements
            </h4>

            <div className="space-y-3">
              {item.skills.map((skill: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start"
                >
                  <div
                    className="h-5 w-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  </div>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>

            {/* Decorative corner */}
            <div
              className="absolute bottom-0 right-0 w-24 h-24 opacity-10"
              style={{
                background: `radial-gradient(circle at bottom right, ${item.color}, transparent 70%)`,
              }}
            ></div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Timeline dot - mobile */}
        <div
          className="absolute left-6 transform -translate-x-1/2 w-4 h-4 rounded-full border-3 z-10 bg-background"
          style={{
            borderColor: item.color,
            top: "30px",
          }}
        ></div>

        {/* Content container - mobile */}
        <motion.div
          variants={mobileContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="pl-16"
        >
          {/* Main content card */}
          <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group bg-background">
            {/* Header with gradient background */}
            <div
              className="p-4 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`,
              }}
            >
              <div className="flex flex-col gap-3 relative z-10">
                {/* Logo and Institution info */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/90 flex items-center justify-center shadow-md flex-shrink-0">
                    <Image
                      src={item.logo || "/placeholder.svg"}
                      alt={item.institution}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold leading-tight">{item.institution}</h3>
                    {item.period && (
                      <div className="flex items-center text-muted-foreground mt-1 text-sm">
                        <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span>{item.period}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Degree badge */}
                <div
                  className="px-3 py-2 rounded-full text-xs font-medium flex items-center gap-2 shadow-sm self-start"
                  style={{ backgroundColor: `${item.color}30`, color: item.color }}
                >
                  <IconComponent className="h-3 w-3 flex-shrink-0" />
                  <span>{item.degree}</span>
                </div>
              </div>

              {/* Decorative elements */}
              <div
                className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-20"
                style={{ background: `radial-gradient(circle, ${item.color}, transparent 70%)` }}
              ></div>
            </div>

            {/* Description */}
            <div className="p-4">
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>

          {/* Skills section - mobile (below card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4"
          >
            <div
              className="rounded-xl p-4 shadow-lg bg-background relative overflow-hidden"
              style={{ borderTop: `4px solid ${item.color}` }}
            >
              <h4 className="font-semibold mb-3 flex items-center text-sm">
                <Award className="h-4 w-4 mr-2 text-amber-500 flex-shrink-0" />
                Key Skills & Achievements
              </h4>

              <div className="space-y-2">
                {item.skills.map((skill: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-start"
                  >
                    <div
                      className="h-4 w-4 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    </div>
                    <span className="text-xs leading-relaxed">{skill}</span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative corner */}
              <div
                className="absolute bottom-0 right-0 w-16 h-16 opacity-10"
                style={{
                  background: `radial-gradient(circle at bottom right, ${item.color}, transparent 70%)`,
                }}
              ></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
