"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const companies = [
  {
    id: 1,
    name: "Kukunet Digital",
    logo: "/k.jpg?height=120&width=120",
  },
  {
    id: 2,
    name: "BukariTech",
    logo: "/bu1.jpg?height=120&width=120",
  },
  {
    id: 3,
    name: "MOA",
    logo: "/moe.webp?height=120&width=120",
  },
  {
    id: 4,
    name: "Freelance",
    logo: "/Upwork-Symbol.png?height=120&width=120",
  },
]

export function CompaniesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Companies I've Worked With</h2>
          <div className="h-1 w-24 bg-amber-500 mx-auto mb-6"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="flex flex-col items-center"
            >
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={company.name}
                width={120}
                height={120}
                className="object-contain w-28 h-28 md:w-32 md:h-32 mb-4"
                priority={index < 2}
              />
              <h3 className="font-medium text-sm md:text-base text-center text-gray-700">{company.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}