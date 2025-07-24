"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import emailjs from "emailjs-com"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      console.log("Sending email with data:", formData)

      const result = await emailjs.send(
        "service_5sz1l4b", // Your EmailJS Service ID
        "template_qbl4ile", // Your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: "Remedan", // Add recipient name
        },
        "H7VUZygK-oNFioOa7", // Your EmailJS Public Key
      )

      console.log("EmailJS result:", result)

      if (result.status === 200) {
        toast({
          title: "Message sent successfully! ✅",
          description: "Thank you for your message. I'll get back to you soon.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setErrors({})
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("EmailJS error:", error)
      toast({
        title: "Error sending message ❌",
        description: "Failed to send message. Please try again later or contact me directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-24 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Me</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Let's discuss how we can work together on your next Data Analysis, Data Science or ML project.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Feel free to reach out through any of these channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">remedanhyeredin@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+251 929517703</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">Ethiopia, Addis Ababa</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Connect with me</h3>
                <div className="flex space-x-4">
                  <Link
                    href="https://github.com/RemedanSE123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted p-3 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/remedan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted p-3 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link
                    href="mailto:remedanhyeredin@gmail.com"
                    className="bg-muted p-3 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Resume</h3>
                <Button asChild className="w-full">
                  <Link href="/Certificate/Remedan Resume.pdf" target="_blank">
                    Download Resume
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>Fill out the form and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "border-red-500" : ""}
                  />
                  {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or question... "
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                  
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>

               
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
