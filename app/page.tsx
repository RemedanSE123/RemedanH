import { HeroSection } from "@/components/hero-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { SkillsShowcase } from "@/components/skills-showcase"
import { Timeline } from "@/components/timeline"
import { EducationSection } from "@/components/education-section"
import { CompaniesSection } from "@/components/companies-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pb-20">
      <HeroSection />
      <EducationSection />
      <FeaturedProjects />
      <SkillsShowcase />
      <Timeline />
      <CompaniesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
