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
    description: "Focused on developing web applications, system design, and programming in various languages.",
    skills: [
      "Web Development",
      "Programming Languages: Java, Python, C++",
      "Database Design",
      "Security Best Practices",
    ],
    logo: "/adama.jpg?height=120&width=120",
    color: "#FCD34D", // amber-300
    icon: GraduationCap,
  },
  {
    id: 2,
    institution: "St. Mary's University",
    degree: "B.Sc. in Accounting and Finance",
    description: "Equipped with a strong foundation in financial analysis and economic theory.",
    skills: ["Financial Analysis", "Accounting Principles", "Budgeting & Forecasting"],
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
      "Continually expanding knowledge through various online platforms, focusing on Machine Learning, Data Science, and advanced Web Development.",
    skills: [
      "Machine Learning Algorithms and Data Modeling",
      "Advanced Data Analysis with Python (Pandas, NumPy)",
      "Building Real-time Web Applications (React, Node.js)",
      "Automation with Cloud Technologies (AWS, Azure)",
    ],
    logo: "/c.jpg?height=120&width=120",
    color: "#D97706", // amber-600
    icon: Briefcase,
  },
]

export function EducationSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.03]"></div>
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-amber-500/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-amber-500/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <GraduationCap className="h-8 w-8 text-amber-500" />
            Educational Journey
          </h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic background and continuous learning path that shapes my professional expertise
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700"></div>

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

  // Animation variants
  const containerVariants = {
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

  const IconComponent = item.icon

  return (
    <div className="flex justify-center items-start mb-16 last:mb-0 relative" ref={ref}>
      {/* Timeline dot */}
      <div
        className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 z-10"
        style={{
          backgroundColor: "var(--background)",
          borderColor: item.color,
          top: "30px",
        }}
      ></div>

      {/* Main content - positioned on left or right side */}
      <motion.div
        variants={containerVariants}
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

      {/* Skills section - always visible on desktop */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`hidden md:block absolute top-0 w-[45%] ${isEven ? "right-0 md:pl-12" : "left-0 md:pr-12"}`}
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

      {/* Mobile skills section (always visible below the card on mobile) */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={isInView ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden w-full ${isEven ? "ml-auto" : "mr-auto"} mt-4`}
      >
        <div className="rounded-xl p-6 shadow-lg bg-background" style={{ borderTop: `4px solid ${item.color}` }}>
          <h4 className="font-semibold mb-3 flex items-center">
            <Award className="h-4 w-4 mr-2 text-amber-500" />
            Key Skills & Achievements
          </h4>
          <div className="space-y-2">
            {item.skills.map((skill: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
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
                <span className="text-sm">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}