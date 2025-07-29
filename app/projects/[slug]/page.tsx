"use client"
import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  ExternalLink,
  Github,
  Globe,
  Share2,
  Trophy,
  Users,
  Code,
  Database,
  LineChart,
  BarChart,
  PieChart,
  Cpu,
  Brain,
  FileSpreadsheet,
  Server,
  Layers,
  Gauge,
} from "lucide-react"
import type { JSX } from "react/jsx-runtime"

// Technology icons mapping with proper typing
const techIcons: Record<string, JSX.Element> = {
  Python: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#306998]/10 text-[#306998]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16.5 8.25V8.25a4.5 4.5 0 01-4.5 4.5H9A6.75 6.75 0 002.25 19.5v-2.625A4.875 4.875 0 017.125 12h1.5v-.75A4.875 4.875 0 0113.5 6.375h1.5v-.75A4.875 4.875 0 0119.875 0h1.5v3.75a4.875 4.875 0 01-4.875 4.5z" />
        <path d="M7.5 15.75V15.75a4.5 4.5 0 014.5-4.5H15A6.75 6.75 0 0121.75 4.5v2.625A4.875 4.875 0 0116.875 12h-1.5v.75A4.875 4.875 0 0110.5 17.625H9v.75A4.875 4.875 0 014.125 24h-1.5v-3.75A4.875 4.875 0 017.5 15.75z" />
      </svg>
    </div>
  ),
  Pandas: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#150458]/10 text-[#150458]">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16.5 8.25V8.25a4.5 4.5 0 01-4.5 4.5H9A6.75 6.75 0 002.25 19.5v-2.625A4.875 4.875 0 017.125 12h1.5v-.75A4.875 4.875 0 0113.5 6.375h1.5v-.75A4.875 4.875 0 0119.875 0h1.5v3.75a4.875 4.875 0 01-4.875 4.5z" />
        <path d="M7.5 15.75V15.75a4.5 4.5 0 014.5-4.5H15A6.75 6.75 0 0121.75 4.5v2.625A4.875 4.875 0 0116.875 12h-1.5v.75A4.875 4.875 0 0110.5 17.625H9v.75A4.875 4.875 0 014.125 24h-1.5v-3.75A4.875 4.875 0 017.5 15.75z" />
      </svg>
    </div>
  ),
  "Scikit-learn": (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F89939]/10 text-[#F89939]">
      <Brain className="w-6 h-6" />
    </div>
  ),
  Matplotlib: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#11557C]/10 text-[#11557C]">
      <LineChart className="w-6 h-6" />
    </div>
  ),
  Jupyter: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F37626]/10 text-[#F37626]">
      <Code className="w-6 h-6" />
    </div>
  ),
  "Power BI": (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F2C811]/10 text-[#F2C811]">
      <BarChart className="w-6 h-6" />
    </div>
  ),
  SQL: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4479A1]/10 text-[#4479A1]">
      <Database className="w-6 h-6" />
    </div>
  ),
  Excel: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#217346]/10 text-[#217346]">
      <FileSpreadsheet className="w-6 h-6" />
    </div>
  ),
  DAX: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F2C811]/10 text-[#F2C811]">
      <PieChart className="w-6 h-6" />
    </div>
  ),
  R: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#276DC3]/10 text-[#276DC3]">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25zm-2.625 14.25c-.415 0-.75-.336-.75-.75s.335-.75.75-.75.75.336.75.75-.335.75-.75.75zm3.375-6.75c-1.036 0-1.875-.84-1.875-1.875s.84-1.875 1.875-1.875 1.875.84 1.875 1.875-.84 1.875-1.875 1.875zm5.625 5.625c-.415 0-.75-.336-.75-.75s.335-.75.75-.75.75.336.75.75-.335.75-.75.75z" />
      </svg>
    </div>
  ),
  TensorFlow: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF6F00]/10 text-[#FF6F00]">
      <Cpu className="w-6 h-6" />
    </div>
  ),
  Keras: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D00000]/10 text-[#D00000]">
      <Brain className="w-6 h-6" />
    </div>
  ),
  OpenCV: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5C3EE8]/10 text-[#5C3EE8]">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm0 8a5 5 0 110-10 5 5 0 010 10zm0-16a1 1 0 110 2 1 1 0 010-2z" />
      </svg>
    </div>
  ),
  Flask: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#000000]/10 text-[#000000]">
      <Server className="w-6 h-6" />
    </div>
  ),
  PostgreSQL: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#336791]/10 text-[#336791]">
      <Database className="w-6 h-6" />
    </div>
  ),
  "Database Indexing": (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4479A1]/10 text-[#4479A1]">
      <Layers className="w-6 h-6" />
    </div>
  ),
  "Query Optimization": (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4479A1]/10 text-[#4479A1]">
      <Gauge className="w-6 h-6" />
    </div>
  ),
  "Performance Monitoring": (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4479A1]/10 text-[#4479A1]">
      <LineChart className="w-6 h-6" />
    </div>
  ),
  "Power Query": (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F2C811]/10 text-[#F2C811]">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25zm-2.625 14.25c-.415 0-.75-.336-.75-.75s.335-.75.75-.75.75.336.75.75-.335.75-.75.75zm3.375-6.75c-1.036 0-1.875-.84-1.875-1.875s.84-1.875 1.875-1.875 1.875.84 1.875 1.875-.84 1.875-1.875 1.875zm5.625 5.625c-.415 0-.75-.336-.75-.75s.335-.75.75-.75.75.336.75.75-.335.75-.75.75z" />
      </svg>
    </div>
  ),
  VBA: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#217346]/10 text-[#217346]">
      <Code className="w-6 h-6" />
    </div>
  ),
  "Pivot Tables": (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#217346]/10 text-[#217346]">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3 4.5h18v3H3v-3zm0 6h18v3H3v-3zm0 6h18v3H3v-3z" />
      </svg>
    </div>
  ),
  "Excel Charts": (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#217346]/10 text-[#217346]">
      <BarChart className="w-6 h-6" />
    </div>
  ),
  "Data Modeling": (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4479A1]/10 text-[#4479A1]">
      <Layers className="w-6 h-6" />
    </div>
  ),
  NLTK: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3776AB]/10 text-[#3776AB]">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25zm-2.625 14.25c-.415 0-.75-.336-.75-.75s.335-.75.75-.75.75.336.75.75-.335.75-.75.75zm3.375-6.75c-1.036 0-1.875-.84-1.875-1.875s.84-1.875 1.875-1.875 1.875.84 1.875 1.875-.84 1.875-1.875 1.875zm5.625 5.625c-.415 0-.75-.336-.75-.75s.335-.75.75-.75.75.336.75.75-.335.75-.75.75z" />
      </svg>
    </div>
  ),
  spaCy: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#09A3D5]/10 text-[#09A3D5]">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25zm-2.625 14.25c-.415 0-.75-.336-.75-.75s.335-.75.75-.75.75.336.75.75-.335.75-.75.75zm3.375-6.75c-1.036 0-1.875-.84-1.875-1.875s.84-1.875 1.875-1.875 1.875.84 1.875 1.875-.84 1.875-1.875 1.875zm5.625 5.625c-.415 0-.75-.336-.75-.75s.335-.75.75-.75.75.336.75.75-.335.75-.75.75z" />
      </svg>
    </div>
  ),
  Kafka: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#000000]/10 text-[#000000]">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25zm-2.625 14.25c-.415 0-.75-.336-.75-.75s.335-.75.75-.75.75.336.75.75-.335.75-.75.75zm3.375-6.75c-1.036 0-1.875-.84-1.875-1.875s.84-1.875 1.875-1.875 1.875.84 1.875 1.875-.84 1.875-1.875 1.875zm5.625 5.625c-.415 0-.75-.336-.75-.75s.335-.75.75-.75.75.336.75.75-.335.75-.75.75z" />
      </svg>
    </div>
  ),
  Grafana: (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F46800]/10 text-[#F46800]">
      <LineChart className="w-6 h-6" />
    </div>
  ),
}

// Project data - expanded with more details for individual project pages
const projectsData = [
  {
    id: 1,
    title: "AI-Powered Excel Insight System",
    description:
      "Upload Excel files and instantly analyze trends, detect anomalies, generate visualizations, and chat with your data—powered by Groq API and advanced AI.",
    fullDescription: `
        AI-Powered Excel Insight System is an intelligent, web-based platform designed to transform static Excel files into dynamic, meaningful insights—instantly and effortlessly. Tailored for users without any coding experience, this system offers a seamless way to extract value from spreadsheets with just a few clicks.

With instant upload and analysis, users can simply drag and drop any .xlsx file to kickstart real-time data exploration. There’s no complicated setup—just fast, interactive insights right out of the box.

One of the platform’s most powerful features is its natural language chatbot interface, powered by Groq’s high-speed AI API. Users can chat directly with their data and ask questions like “What’s the total revenue in Q1 2023?”, “Are there any outliers?”, or “Summarize the performance trend for the last 5 years.” The chatbot understands the context and delivers accurate, easy-to-digest answers in seconds.

Backed by advanced AI capabilities, the system offers smart intelligence features such as automatic anomaly detection, statistical summaries, pattern recognition, and even predictive insights. These tools work together to uncover hidden trends and help users make data-driven decisions confidently.

For visual learners and professionals who rely on dashboards, the platform includes a powerful chart builder. Users can select any two columns from their Excel file and generate bar charts, pie charts, line charts, and more—without writing a single line of code.

Built with a clean, responsive dashboard interface, the system is not only easy to navigate but also robust enough to handle messy or inconsistent Excel data. Even users with complex or incomplete files will benefit from the platform’s smart error handling and user-friendly design.

    `,
    image: "/Project/28.png?height=600&width=800",
    gallery: [
      "/Project/27.png?height=600&width=800&text=Data+Visualization",
      "/Project/29.png?height=600&width=800&text=Model+Architecture",
      "/Project/30.png?height=600&width=800&text=Dashboard+Interface",
      "/Project/31.png?height=600&width=800&text=Results+Comparison",
    ],
    videoUrl: "/Project/excel.mp4",
    videoPoster: "/Project/28.png?height=600&width=800&text=Sales+Analysis+Preview",
    videoDuration: "2:15",
    videoThumbnail: "/Project/23.png?height=600&width=800&text=Video+Thumbnail",
    tags: ["AI", "Python"],
    categories: ["AI", "Python"],
    slug: "Excel",
    achievements: [
     "Powered by Groq’s blazing-fast API for ultra-responsive chatbot interaction",

      "Interactive graph builder from any Excel column combination",

      "Natural language support — ask any question and get contextual responses",

      "No-code needed — accessible to anyone familiar with Excel",

      "Real-time insights on trends, anomalies, summaries, and visualizations",

      "Smart insight engine that automatically surfaces patterns and flags issues",


    ],
    technologies: [
      { name: "Python", icon: "🐍" },
     { name: "Excel", icon: "📑" },
     { name: "AI", icon: "🤖" },
    ],
    timeline: "3 months (Jan 2023 - Mar 2023)",
    team: "Solo project with guidance from senior Data scientist",
    links: [
      { type: "github", url: "https://github.com/yourusername/predictive-sales" },
      { type: "live", url: "https://example.com/demo" },
    ],
  },
  {
    id: 2,
    title: "Ethiopia Interactive Map Explorer",
     description:
      "An advanced web-based mapping tool that enables users to explore, customize, and export geographic data across all administrative levels of Ethiopia — from regions to zones and woredas.",
  fullDescription: `
  🚀 **Ethiopia Interactive Map Explorer** is a first-of-its-kind, fully dynamic GIS platform designed to revolutionize how spatial data is accessed and utilized in Ethiopia. Built with precision, interactivity, and performance in mind, it empowers users with unmatched control over national-level geographic data — covering **10+ regions**, **100+ zones**, and **1,000+ woredas**.

  🌐 Whether you're a **researcher**, **data analyst**, **planner**, or **policy maker**, this tool gives you the power to visualize, annotate, and export maps like never before.

  🧩 **4 Powerful Modules. One Seamless Experience:**

  🔹 **Select Area** – Instantly click to dive into any region, zone, or woreda with smooth transitions and real-time highlighting.

  🔹 **Customize Map** – Draw, label, and mark your own paths. Choose colors, shapes, and layers to reflect your data story.

  🔹 **Add Metadata** – Enrich the map with  text, and descriptive context to transform plain geography into meaningful insight.

  🔹 **Export Map** – Download high-quality, presentation-ready visuals with all your custom layers intact — in just one click.

  💡 This innovative platform sets a new standard for geospatial exploration in Ethiopia — making it an essential tool for those shaping the future through data.
`,
    image: "/Project/24.png?height=600&width=800",
    gallery: [
      "/Project/56.png?height=600&width=800&text=Segmentation+Overview",
      "/Project/55.png?height=600&width=800&text=Segmentation+Overview",
      "/Project/57.png?height=600&width=800&text=Segmentation+Overview",
      "/Project/23.png?height=600&width=800&text=Segmentation+Overview",
      "/Project/24.png?height=600&width=800&text=RFM+Analysis",
      "/Project/25.png?height=600&width=800&text=Segment+Profiles",
      "/Project/26.png?height=600&width=800&text=Marketing+Recommendations",
    ],
    videoUrl: "/Project/ethiopia.mp4",
    videoPoster: "/Project/23.png?height=600&width=800&text=Dashboard+Demo+Preview",
    
    videoThumbnail: "/Project/.png?height=600&width=800&text=Video+Thumbnail",
    tags: [ "SQL", "Excel", "Python","Node.js", "Express", "React" ],
    categories: ["Excel", "SQL" ],
    slug: "ethiopia",
    achievements: [
      " Full administrative coverage across Ethiopia",
      " Dynamic map customization with metadata support",
      " Intuitive UI built for researchers, analysts, and planners",
      " Fast and seamless export functionality",
      " Already in use by research teams and GIS professionals",
    ],
    technologies: [
      { name: "Python", icon: "📊" },
      { name: "PostgreSQL", icon: "🗃️" },
      { name: "Excel", icon: "📑" },
      { name: "Query Optimization", icon: "⚡" },
    ],
    timeline: "4 months (Jan 2025 - April 2025)",
    team: "Solo project ",
    links: [
      { type: "github", url: "https://github.com/RemedanSE123/Ethiopia_map_customization-" },
      { type: "live", url: "https://ethiopia-map-customization.vercel.app/" },
    ],
  },
  {
    id: 3,
    title: "Data Jobs Dashbord",
    description: "Created a Power BI dashboard to explore how data job salaries vary by role, region, and required skills.",
    fullDescription: `
      "This project aimed to help people understand how different roles in the data field—like Data Analyst, Data Scientist, and Data Engineer—are paid across countries and what skills are most important. I started by collecting job data that included job titles, salaries, experience levels, locations, and listed skills. I used SQL to store and query the data, and Excel to clean and organize it for analysis.

Once the data was prepared, I built a dynamic dashboard using Power BI. I created multiple charts to show salary comparisons, popular skills, job counts per country, and more. Users can interact with the dashboard through slicers and filters, making it easy to focus on specific roles or regions. The visuals were designed to be clear and readable for both technical and non-technical users.

The dashboard is useful for students, job seekers, or even companies wanting to understand hiring trends in data fields. It gives a quick view of what roles are growing, what skills are frequently asked for, and where the highest salaries are offered. This makes it easier for users to make smart career or business decisions based on real data.
    `,
    image: "/Project/32.png?height=600&width=800",
    gallery: [
      "/Project/32.png?height=600&width=800&text=CNN+Architecture",
      "/Project/33.png?height=600&width=800&text=Training+Results",
      "/Project/34.png?height=600&width=800&text=Classification+Examples",
      "/Project/35.png?height=600&width=800&text=Web+Interface",
    ],
    videoUrl: "/Project/1.mp4",
    videoPoster: "/Project/32.png?height=600&width=800&text=AI+Model+Training+Preview",
    videoDuration: "4:28",
    videoThumbnail: "/Project/23.png?height=600&width=800&text=Video+Thumbnail",
    tags: ["Excel", "Data Analysis", "VBA", "SQL","Dashboard Design"],
    categories: ["Excel","Python", "SQL"],
    slug: "data0",
    achievements: [
        "Used SQL to organize job-related data",
        "Cleaned and shaped raw data using Excel",
        "Built charts in Power BI to show salary and job trends",
        "Added interactive slicers for easy filtering",
        "Helped users explore valuable roles, locations, and skills",
   ,
    ],
    technologies: [
      { name: "DAX", icon: "🔢" },
       { name: "Excel", icon: "📑" },
      { name: "VBA", icon: "⌨️" },
      { name: "Power Query", icon: "🔄" },
      { name: "Pivot Tables", icon: "📊" },
      { name: "Excel Charts", icon: "📈" },
    ],
    timeline: "1 month (Jun 2025 )",
    team: "Solo project",
    links: [
      { type: "github", url: "https://github.com/RemedanSE123/Power-BI-Project_1" },
     
    ],
  },

   {
    id: 4,
    title: "Highest Paying Job in Data?",
    description:
      "Built an Power BI dashboard to identify the highest paying roles and skills in data-related careers",
    fullDescription: `
     This project was created to answer a simple question: Which data job pays the most? Using a dataset that included salary, job title, experience level, and country, I analyzed the relationship between skills and income. I didn’t use any advanced tools like machine learning—everything was done using Excel, focusing on simplicity and usefulness.

After cleaning the data, I used Excel functions and pivot tables to explore patterns. I grouped the data by role, region, and required skills to see which combinations had the highest salaries. Then I used Excel charts—like bar charts and pie charts—to visualize the results in a way that’s easy to understand. I also added slicers to allow users to filter by experience or country.

The result was a clean, interactive dashboard that can help users discover which roles are in demand, what skills increase earning potential, and where the best-paying jobs are located. This is especially helpful for students and career changers deciding which skill to focus on or which job path to follow.
    `,
    image: "/Project/36.png?height=600&width=800",
    gallery: [
      "/Project/36.png?height=600&width=800&text=Dashboard+Overview",
      "/Project/37.png?height=600&width=800&text=Sales+Trends",
      "/Project/38.png?height=600&width=800&text=Regional+Performance",
      "/Project/40.png?height=600&width=800&text=Product+Analysis",
    ],
    videoUrl: "/Project/2.mp4",
    videoPoster: "/Project/36.png?height=600&width=800&text=AI+Model+Training+Preview",
    videoThumbnail: "/Project/.png?height=600&width=800&text=Video+Thumbnail",
    tags: ["Excel","Power BI", "Data Analysis", "VBA", "SQL","Dashboard Design"],
    categories: ["Excel","Python", "SQL","Power BI"],
    slug: "data",
    achievements: [
     "Organized and analyzed job data fully in Excel",
      "Used pivot tables to find top-paying roles and skills",
      "Created easy-to-read charts to display salary comparisons",
      "Added slicers for filtering data by country and experience",
      "Built a helpful tool for job seekers exploring data careers",
    ],
    technologies: [
      {name:"Power BI", icone: BarChart},
      { name: "Excel", icon: "📑" },
      { name: "VBA", icon: "⌨️" },
      { name: "Power Query", icon: "🔄" },
      { name: "Pivot Tables", icon: "📊" },
      { name: "Excel Charts", icon: "📈" },
    ],
    timeline: "1 month (Oct 2023)",
    team: "Solo project, Data from Kaggle",
    links: [
      { type: "github", url: "https://github.com/RemedanSE123/Power-BI-Project_2" },
    
    ],
  },
  {
    id: 5,
    title: "Agriculture Investment Support System",
    description:
      "Built a system to help investors choose the best places in Ethiopia for Agriculture Investment based on land type, water, and legal information.",
    fullDescription: `
      This project helps investors, government agencies, and local stakeholders find where and how to invest in Ethiopia's agriculture sector. I focused on creating a system that displays detailed agricultural information for different crops like Teff, Sorghum, and Coffee across regions. I collected and organized the data in a structured SQL database, making it easier to connect each product with investment details, locations, and benefits.
      The goal was to support smarter investment decisions and promote transparency. The project does not use advanced technologies like machine learning, but it offers a solid and user-friendly tool that connects agricultural data with regional planning. It gives users direct insight into potential returns, land availability, and the best-suited regions for different crops.
    `,
    image: "/Project/41.jpg?height=600&width=800",
    gallery: [
      "/Project/42.jpg?height=600&width=800&text=Performance+Comparison",
      "/Project/43.jpg?height=600&width=800&text=Database+Schema",
      "/Project/44.jpg?height=600&width=800&text=Query+Optimization",
      "/Project/45.jpg?height=600&width=800&text=Monitoring+Dashboard",
    ],
    videoUrl: "/Project/3.mp4",
     videoPoster: "/Project/41.jpg?height=600&width=800&text=AI+Model+Training+Preview",
    videoThumbnail: "/Project/.png?height=600&width=800&text=Video+Thumbnail",
    tags: ["SQL", "Database Design","Query Optimization", "Database Administration"],
    categories: ["SQL","Python"],
    slug: "agri",
    achievements: [
      "Created a structured SQL database for agricultural products",
      "Linked products to regions, zones, and woredas with clear relationships",
      "Designed interactive map-based access to data",
      "Built individual product pages with investment details",
      "Added admin form for easy data updates",
      "Supported decision-making for investors and planners in agriculture",
    ],
    technologies: [
     
      { name: "PostgreSQL", icon: "🐘" },
       { name: "Python", icon: "🐍" },
      { name: "Database Indexing", icon: "🔍" },
      { name: "Query Optimization", icon: "⚡" },
      { name: "Performance Monitoring", icon: "📉" },
       { name: "Data Modeling", icon: "🏗️" },
       
    ],
    timeline: "3 months (Nov 2023 - Jan 2024)",
    team: "(Internship)Collaborated with  a representative from the Ministry of Agriculture.",
    links: [
      { type: "github", url: "http://github.com/RemedanSE123/Agricultural-Investment-Support-System" },
   
    ],
  },
  {
    id: 6,
    title: "Data Jobs Dashbord 2.0",
    description:
      "Created an interactive dashboard using Power BI, Excel, and SQL to analyze job counts, skills, and salaries in data-related roles.",
    fullDescription: `
     This project was focused on building an updated and interactive dashboard that shows detailed insights about jobs in the data industry. I used SQL to manage and query large datasets containing job postings, skill requirements, and salary data. Excel was used for initial data cleaning and preparation to ensure accuracy and consistency.

     Power BI was the main tool to create the dashboard visuals. I designed cards to display key metrics like total job count, average skills per job, and median salaries. Bar charts show skill popularity and hourly salary by job title. Filters allow users to select specific job titles or countries to drill down into the data. The interface is clean and easy to use for quick decision-making.

     This dashboard helps job seekers, recruiters, and analysts understand the job market better by highlighting which skills are most demanded, how many jobs are available, and the salary ranges across different roles and locations. No advanced machine learning techniques were used; the focus was on data organization, visualization, and interactivity with familiar tools.
    `,
    image: "/Project/48.png?height=600&width=800",
    gallery: [
      "/Project/48.png?height=600&width=800&text=Executive+Dashboard",
      "/Project/46.png?height=600&width=800&text=Regional+Analysis",
      "/Project/47.png?height=600&width=800&text=Product+Performance",
      "/Project/49.png?height=600&width=800&text=Trend+Analysis",
    ],
    videoUrl: "/Project/4.mp4",
     videoPoster: "/Project/48.png?height=600&width=800&text=AI+Model+Training+Preview",
    videoThumbnail: "/Project/.png?height=600&width=800&text=Video+Thumbnail",
    tags: ["Power BI", "DAX", "Data Modeling", "SQL", "Data Visualization"],
    categories: ["Power BI", "SQL"],
    slug: "data2",
    achievements: [
        "Organized job and salary data using SQL queries",
        "Cleaned and prepared datasets using Excel",
        "Built interactive, filterable dashboards with Power BI",
        "Displayed key metrics and skill popularity visually",
        "Made data easy to explore for non-technical users",
       ],
    technologies: [
      {name:"Power BI", icone: BarChart},
      { name: "DAX", icon: "🔢" },
      { name: "Power Query", icon: "🔄" },
      { name: "SQL", icon: "🗃️" },
      { name: "Data Modeling", icon: "🏗️" },
    ],
    timeline: "1 month (Feb 2024 - Mar 2024)",
    team: "Solo project",
    links: [
      { type: "github", url: "https://github.com/RemedanSE123/Power-BI-Project_4" },
   
    ],
  },
  {
    id: 7,
    title: "Digital Address Registration System",
    description: "Designed a national address registration system for Ethiopia that allows users to contribute verified location data, from region down to house number, with interactive mapping and approval workflow.",
    fullDescription: `
      This system solves the problem of missing or inconsistent address data in Ethiopia. It lets users register their address hierarchically—from region → zone → woreda → kebele → mender → house number. Users submit their address via a form with GPS location and supporting documents or images.

The system uses an admin-based workflow for review and approval. Once validated, the address becomes part of the national database. The platform also includes:

GIS-based interactive maps for all administrative levels

Role-based dashboards for users, verifiers, and admins

Real-time validation and address lookup system

Dynamic filtering to navigate through Ethiopia’s full administrative structure

Built using SQL and modern front-end tools, this system can integrate with national ID systems, utility services, and e-commerce platforms.
    `,
    image: "/Project/50.png?height=600&width=800",
    gallery: [
      "/Project/50.png?height=600&width=800&text=Sentiment+Dashboard",
      "/Project/51.png?height=600&width=800&text=Topic+Modeling",
      "/Project/52.png?height=600&width=800&text=Trend+Analysis",
      "/Project/53.png?height=600&width=800&text=Alert+System",
    ],
    videoUrl: "/Project/5.mp4",
    videoThumbnail: "/Project/.png?height=600&width=800&text=Video+Thumbnail",
     videoPoster: "/Project/50.png?height=600&width=800&text=AI+Model+Training+Preview",
    tags: ["Python", "SQL","Excel"],
    categories: ["Python", "SQL","Excel"],
    slug: "address",
    achievements: [
      "Digitized address data for thousands of users across all regions",
      "Enabled community-based address submission and evidence upload",
      "Built a multi-level map system down to the household level",
      "Streamlined government validation workflow with real-time updates",
     ],
    technologies: [
      { name: "Python", icon: "🐍" },
      { name: "SQL", icon: "🗃️" },
      { name: "Excel", icon: "📑" },
       { name: "Database Indexing", icon: "🔍" },
      { name: "Query Optimization", icon: "⚡" },
      { name: "Performance Monitoring", icon: "📉" },
    ],
    timeline: "3 months (Apr 2024 - Jun 2024)",
    team: "Collaborated with Kukunet Digital team",
    links: [
      { type: "github", url: "https://github.com/RemedanSE123/Digital-Address-Registration-System" },
      { type: "live", url: "kaddress,kukunetdigital.com" },
    ],
  },
  // {
  //   id: 8,
  //   title: "Anomaly Detection System",
  //   description:
  //     "Developed a machine learning system to detect anomalies in manufacturing processes, reducing defects by 25%.",
  //   fullDescription: `
  //     This project focused on developing an advanced anomaly detection system for a manufacturing client to identify unusual 
  //     patterns in production data that might indicate equipment failures or quality issues. The system processes real-time 
  //     sensor data from manufacturing equipment and alerts operators to potential problems before they cause defects.
      
  //     I implemented multiple anomaly detection algorithms including statistical methods, isolation forests, and deep learning 
  //     approaches to handle different types of anomalies. The system was trained on historical data with known issues to recognize 
  //     patterns that precede failures.
      
  //     The solution includes a real-time monitoring dashboard that displays equipment status, highlights anomalies, and provides 
  //     recommendations for corrective actions. Integration with the factory's control systems allows for automated adjustments 
  //     in some scenarios.
  //   `,
  //   image: "/Project/.png?height=600&width=800",
  //   gallery: [
  //     "/Project/.png?height=600&width=800&text=Monitoring+Dashboard",
  //     "/Project/.png?height=600&width=800&text=Anomaly+Visualization",
  //     "/Project/.png?height=600&width=800&text=Alert+System",
  //     "/Project/.png?height=600&width=800&text=Performance+Metrics",
  //   ],
  //   videoUrl: "https://www.example.com/video",
  //   videoThumbnail: "/Project/.png?height=600&width=800&text=Video+Thumbnail",
  //   tags: ["Python", "ML", "Statistical Analysis", "Time Series", "IoT", "Real-time Processing"],
  //   categories: ["ML", "Python"],
  //   slug: "anomaly-detection-system",
  //   achievements: [
  //     "Reduced manufacturing defects by 25%",
  //     "Decreased unplanned downtime by 30%",
  //     "Saved approximately $500K annually in waste and rework",
  //     "Implemented predictive maintenance scheduling",
  //   ],
  //   technologies: [
  //     { name: "Python", icon: "🐍" },
  //     { name: "scikit-learn", icon: "🤖" },
  //     { name: "TensorFlow", icon: "⚙️" },
  //     { name: "Kafka", icon: "📊" },
  //     { name: "Grafana", icon: "📈" },
  //   ],
  //   timeline: "5 months (Jul 2024 - Nov 2024)",
  //   team: "Collaborated with manufacturing engineers and data scientists",
  //   links: [
  //     { type: "github", url: "https://github.com/yourusername/anomaly-detection" },
  //     { type: "live", url: "https://example.com/demo" },
  //   ],
  // },
  // Add more projects as needed...
]

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    // Find the project by slug
    const foundProject = projectsData.find((p) => p.slug === slug)
    if (foundProject) {
      setProject(foundProject)
    }
    setIsLoading(false)
  }, [slug])

  // If project not found and not loading, return 404
  if (!isLoading && !project) {
    notFound()
  }

  if (isLoading || !project) {
    return (
      <div className="container py-24 min-h-screen flex items-center justify-center font-serif">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="h-4 bg-muted rounded w-40"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12 md:py-16 min-h-screen font-serif">
      <style jsx global>{`
        * {
          font-family: 'Times New Roman', Times, serif !important;
        }
      `}</style>

      <div className="mb-8">
        <Button asChild variant="ghost" className="group mb-4">
          <Link href="/projects" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </Button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/50"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative aspect-video overflow-hidden rounded-xl border border-amber-500/20 shadow-lg bg-black">
            <video
              controls
              className="w-full h-full"
              poster={project.videoPoster || project.videoThumbnail || "/Project/.svg"}
              preload="metadata"
              style={{ objectFit: "contain" }}
            >
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {project.videoDuration || "0:00"}
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                Overview
              </TabsTrigger>
             
             <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
              >
                Achievements
              </TabsTrigger>
              
              <TabsTrigger value="gallery" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                Gallery
              </TabsTrigger>
              
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-300/5 p-6 rounded-xl border border-amber-500/20 shadow-inner mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-amber-500">Project Overview</h2>
                  {project.fullDescription.split("\n").map((paragraph: string, i: number) => (
                    <p key={i} className={`${paragraph.trim() === "" ? "my-4" : "mb-4 last:mb-0"} leading-relaxed`}>
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <Card className="overflow-hidden border-amber-500/20 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4 text-amber-500">
                        <Calendar className="h-6 w-6" />
                        <h3 className="text-xl font-semibold">Project Timeline</h3>
                      </div>
                      <p className="text-lg">{project.timeline}</p>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden border-amber-500/20 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4 text-amber-500">
                        <Users className="h-6 w-6" />
                        <h3 className="text-xl font-semibold">Team Composition</h3>
                      </div>
                      <p className="text-lg">{project.team}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-6">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-amber-500/20 shadow-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Image
                  src={project.gallery[activeImageIndex] || "/Project/.svg"}
                  alt={`${project.title} gallery image ${activeImageIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {project.gallery.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`relative aspect-video overflow-hidden rounded-lg border cursor-pointer transition-all duration-200 bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${
                      activeImageIndex === index
                        ? "border-amber-500 ring-2 ring-amber-500/50 scale-[0.98]"
                        : "border-muted hover:border-amber-500/50"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image || "/Project/.svg"}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid gap-4">
                {project.achievements.map((achievement: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="mt-1 bg-amber-500 rounded-full p-1 text-black">
                      <Trophy className="h-4 w-4" />
                    </div>
                    <p className="font-medium">{achievement}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-muted/30 rounded-xl p-6 border border-amber-500/20">
            <h3 className="text-xl font-semibold mb-6 text-center">Technologies Used</h3>
            <div className="grid grid-cols-2 gap-6">
              {project.technologies.map((tech: { name: string; icon: string }) => (
                <div key={tech.name} className="flex flex-col items-center gap-2 text-center">
                  {techIcons[tech.name] || <div className="text-3xl">{tech.icon}</div>}
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-muted">
              <h3 className="text-xl font-semibold mb-4 text-center">Project Links</h3>
              <div className="flex flex-col gap-3">
                {project.links.map((link: { type: string; url: string }) => (
                  <Button
                    key={link.type}
                    asChild
                    variant="outline"
                    className="justify-start gap-2 hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/50 bg-transparent"
                  >
                    <Link href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.type === "github" ? <Github className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                      {link.type === "github" ? "View Code" : "Live Demo"}
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </Link>
                  </Button>
                ))}
                <Button
                  variant="outline"
                  className="justify-start gap-2 hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/50 bg-transparent"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: project.title,
                        text: project.description,
                        url: window.location.href,
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                      alert("Link copied to clipboard!")
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  Share Project
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-amber-500/20">
            <h3 className="text-xl font-semibold mb-4">More Projects</h3>
            <div className="space-y-4">
              {projectsData
                .filter((p: any) => p.id !== project.id)
                .slice(0, 3)
                .map((relatedProject: any) => (
                  <Link
                    key={relatedProject.id}
                    href={`/projects/${relatedProject.slug}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Image
                        src={relatedProject.image || "/Project/.svg"}
                        alt={relatedProject.title}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-amber-500 transition-colors line-clamp-1">
                        {relatedProject.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{relatedProject.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                  </Link>
                ))}
            </div>
            <Button asChild variant="link" className="mt-4 text-amber-500 hover:text-amber-600">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
