"use client"

import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Solomon Abate (Ph.D)",
    role: "Project Initiator & Manager",
    org: "Kukunet Digital",
    content:
      "''Working with Remedan was a fantastic experience. His innovative ideas and technical expertise were truly inspiring! Remedan successfully completed all tasks assigned to him, including building the Digital Address Registration System (DARS) for Ethiopia and providing tutoring on programming languages. Both tasks were delivered perfectly.''",
  },
  {
    id: 2,
    name: "Lemlem Tajebe (Ph.D)",
    role: "Project Manager",
    org: "Ministry of Agriculture (MoA)",
    content:
      "''Remedan consistently delivers high-quality work on time. His dedication and skills are unmatched. Remedan's expertise was crucial in the development of the Agricultural Investment Support System (AISS), a full-stack solution that was completed perfectly. The project was executed flawlessly, meeting all objectives and delivering outstanding results.''",
  },
]

export function TestimonialsSection() {
  return (
    <section className="px-6 md:px-16 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-amber-500 mb-2">TESTIMONIALS</h2>
        <div className="h-1 w-20 bg-amber-500 mx-auto mb-4"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-muted/50 border border-gray-700 shadow-lg">
            <CardContent className="p-6">
              <h4 className="text-2xl font-bold text-amber-500 mb-1">{testimonial.name}</h4>
              <p className="italic text-base text-gray-300">{testimonial.role} | {testimonial.org}</p>
              <p className="text-base text-gray-200 mt-4 leading-relaxed">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
