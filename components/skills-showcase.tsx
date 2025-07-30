"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart4, Braces, Brain, Cpu } from "lucide-react"
import Image from "next/image"

const skillCategories = [
  {
    id: "data-analysis",
    name: "Data Analysis",
    icon: <BarChart4 className="h-5 w-5" />,
    skills: [
      { name: "Excel", level: 95 },
      { name: "SQL", level: 90 },
      { name: "Power BI", level: 85 },
      { name: "Tableau", level: 80 },
      { name: "Data Cleaning", level: 90 },
    ],
  },
  {
    id: "programming",
    name: "Programming",
    icon: <Braces className="h-5 w-5" />,
    skills: [
      { name: "Python", level: 85 },
      { name: "R", level: 35 },
      { name: "JavaScript", level: 65 },
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
    ],
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    icon: <Brain className="h-5 w-5" />,
    skills: [
      { name: "Scikit-learn", level: 40 },
      { name: "TensorFlow", level: 40 },
      { name: "PyTorch", level: 50 },
      { name: "Regression", level: 45 },
      { name: "Classification", level: 40 },
    ],
  },
  {
    id: "ai",
    name: "AI",
    icon: <Cpu className="h-5 w-5" />,
    skills: [
      { name: "Neural Networks", level: 25 },
      { name: "NLP", level: 20 },
      { name: "Computer Vision", level: 25 },
      { name: "Reinforcement Learning", level: 20 },
      { name: "LLMs", level: 20 },
    ],
  },
]
const techIcons = [

  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB" },

  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1" },
  
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#336791" },
 
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "#336791" },
 
  { name: "Tableau", icon: "https://img.icons8.com/color/100/tableau-software.png", color: "#E97627" },
  { name: "Excel", icon: "https://img.icons8.com/fluency/100/microsoft-excel-2019.png", color: "#217346" },
  { name: "Numpy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", color: "#013243" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", color: "#150458" },
  { name: "Power BI", icon: "https://img.icons8.com/color/100/power-bi.png", color: "#F2C811" },

];

export default function Skills() {
  return (
    <section id="skills" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Skills</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {techIcons.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{ backgroundColor: `${skill.color}10` }}
            >
              <img
                src={skill.icon}
                alt={`${skill.name} logo`}
                className="w-12 h-12 md:w-16 md:h-16 mb-2 object-contain"
              />
              <h4 className="text-sm md:text-base font-medium text-gray-700">{skill.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Animated skill bar component
function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-none bg-gradient-to-r from-background to-muted/50 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            <span className="text-sm font-bold text-amber-500">{level}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <motion.div
              className="h-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Animated tech icon component
function TechIcon({ name, icon, color, index }: { name: string; icon: string; color: string; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.5 },
      }}
      className="flex flex-col items-center"
    >
      <div
        className="relative w-16 h-16 md:w-20 md:h-20 mb-2 rounded-lg overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundColor: color }}></div>
        <Image src={icon || "/placeholder.svg"} alt={name} width={50} height={50} className="z-10" />
      </div>
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  )
}

export function SkillsShowcase() {
  return (
    <section className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
        <div className="h-1 w-20 bg-amber-500 mx-auto mb-6"></div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          From data analysis to advanced machine learning, I've developed a diverse set of skills throughout my journey.
        </p>
      </motion.div>

      <Tabs defaultValue="data-analysis" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-gradient-to-r from-background to-muted/50 p-1 rounded-lg">
          {skillCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-2 data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              {category.icon}
              <span className="hidden md:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {skillCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.skills.map((skill, index) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={index} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-24 text-center"
      >
        <h3 className="text-2xl font-bold mb-4">Tools & Technologies</h3>
        <div className="h-1 w-16 bg-amber-500 mx-auto mb-12"></div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center">
          {techIcons.map((tech, index) => (
            <TechIcon key={tech.name} name={tech.name} icon={tech.icon} color={tech.color} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
