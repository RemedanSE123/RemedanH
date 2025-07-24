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
  Play,
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

// Technology icons mapping
const techIcons = {
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
    title: "Predictive Sales Analysis",
    description:
      "Built a machine learning model to predict future sales based on historical data, improving forecast accuracy by 35%.",
    fullDescription: `
      This project involved developing a sophisticated machine learning model to predict future sales for a retail client. 
      By analyzing historical sales data, seasonal trends, and external factors, I created a predictive model that significantly 
      improved forecast accuracy by 35% compared to their previous methods.
      
      The solution incorporated multiple regression algorithms and ensemble methods to capture complex patterns in the data. 
      I implemented feature engineering techniques to extract meaningful insights from raw sales data, customer demographics, 
      and market indicators.
      
      The final model was deployed as an interactive dashboard that allows business users to generate forecasts, adjust parameters, 
      and visualize predictions across different product categories and time horizons.
    `,
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Data+Visualization",
      "/placeholder.svg?height=600&width=800&text=Model+Architecture",
      "/placeholder.svg?height=600&width=800&text=Dashboard+Interface",
      "/placeholder.svg?height=600&width=800&text=Results+Comparison",
    ],
    videoUrl: "/Project/bandicam 2025-07-20 13-05-20-651.mp4",
    videoThumbnail: "/placeholder.svg?height=600&width=800&text=Video+Thumbnail",
    tags: ["Python", "ML", "Pandas", "Scikit-learn", "Time Series Analysis", "Forecasting"],
    categories: ["ML", "Python"],
    slug: "predictive-sales-analysis",
    achievements: [
      "Improved sales forecast accuracy by 35%",
      "Reduced inventory costs by 22% through optimized stocking",
      "Implemented automated weekly forecasting process",
      "Created interactive visualization dashboard for business users",
    ],
    technologies: [
      { name: "Python", icon: "🐍" },
      { name: "Pandas", icon: "🐼" },
      { name: "Scikit-learn", icon: "🤖" },
      { name: "Matplotlib", icon: "📊" },
      { name: "Jupyter", icon: "📓" },
    ],
    timeline: "3 months (Jan 2023 - Mar 2023)",
    team: "Solo project with guidance from senior data scientist",
    links: [
      { type: "github", url: "https://github.com/yourusername/predictive-sales" },
      { type: "live", url: "https://example.com/demo" },
    ],
  },
  {
    id: 2,
    title: "Customer Segmentation Dashboard",
    description:
      "Created an interactive Power BI dashboard for customer segmentation, enabling targeted marketing strategies.",
    fullDescription: `
      This project focused on developing a comprehensive customer segmentation solution using Power BI for a major retail client. 
      The dashboard provides deep insights into customer behavior, preferences, and purchasing patterns.
      
      I implemented RFM (Recency, Frequency, Monetary) analysis along with k-means clustering to identify distinct customer segments. 
      The interactive dashboard allows marketing teams to explore different segments, understand their characteristics, and develop 
      targeted marketing strategies.
      
      The solution connects directly to the company's SQL database and automatically refreshes data, providing up-to-date insights. 
      Custom DAX measures were created to calculate complex metrics like customer lifetime value, churn probability, and segment migration.
    `,
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Segmentation+Overview",
      "/placeholder.svg?height=600&width=800&text=RFM+Analysis",
      "/placeholder.svg?height=600&width=800&text=Segment+Profiles",
      "/placeholder.svg?height=600&width=800&text=Marketing+Recommendations",
    ],
    videoUrl: "https://www.example.com/video",
    videoThumbnail: "/placeholder.svg?height=600&width=800&text=Video+Thumbnail",
    tags: ["Power BI", "SQL", "Excel", "Customer Analytics", "Data Visualization"],
    categories: ["Excel", "SQL", "Power BI"],
    slug: "customer-segmentation-dashboard",
    achievements: [
      "Identified 5 distinct high-value customer segments",
      "Increased marketing campaign ROI by 28%",
      "Reduced customer churn by 15% through targeted retention strategies",
      "Implemented automated monthly reporting process",
    ],
    technologies: [
      { name: "Power BI", icon: "📊" },
      { name: "SQL", icon: "🗃️" },
      { name: "Excel", icon: "📑" },
      { name: "DAX", icon: "🔢" },
      { name: "R", icon: "📈" },
    ],
    timeline: "2 months (Apr 2023 - May 2023)",
    team: "Led a team of 2 data analysts",
    links: [
      { type: "github", url: "https://github.com/yourusername/customer-segmentation" },
      { type: "live", url: "https://example.com/demo" },
    ],
  },
  {
    id: 3,
    title: "Neural Network for Image Classification",
    description: "Developed a convolutional neural network for classifying satellite imagery with 92% accuracy.",
    fullDescription: `
      This project involved building a sophisticated convolutional neural network (CNN) for classifying satellite imagery. 
      The model was trained to identify different land use categories, including urban areas, forests, agricultural land, 
      and water bodies with remarkable 92% accuracy.
      
      I implemented a custom CNN architecture using TensorFlow and Keras, incorporating techniques like data augmentation, 
      transfer learning with pre-trained models, and hyperparameter tuning to optimize performance.
      
      The final solution includes a web interface where users can upload satellite images and receive instant classification 
      results with confidence scores. The model was deployed using TensorFlow Serving for efficient inference.
    `,
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=CNN+Architecture",
      "/placeholder.svg?height=600&width=800&text=Training+Results",
      "/placeholder.svg?height=600&width=800&text=Classification+Examples",
      "/placeholder.svg?height=600&width=800&text=Web+Interface",
    ],
    videoUrl: "https://www.example.com/video",
    videoThumbnail: "/placeholder.svg?height=600&width=800&text=Video+Thumbnail",
    tags: ["Python", "TensorFlow", "AI", "ML", "CNN", "Computer Vision"],
    categories: ["ML", "AI", "Python"],
    slug: "neural-network-image-classification",
    achievements: [
      "Achieved 92% classification accuracy on test dataset",
      "Processed and classified over 10,000 satellite images",
      "Reduced classification time from hours to seconds",
      "Implemented web interface for real-time classification",
    ],
    technologies: [
      { name: "Python", icon: "🐍" },
      { name: "TensorFlow", icon: "⚙️" },
      { name: "Keras", icon: "🧠" },
      { name: "OpenCV", icon: "👁️" },
      { name: "Flask", icon: "🌐" },
    ],
    timeline: "4 months (Jun 2023 - Sep 2023)",
    team: "Collaborated with a GIS specialist",
    links: [
      { type: "github", url: "https://github.com/yourusername/satellite-classification" },
      { type: "live", url: "https://example.com/demo" },
    ],
  },
  {
    id: 4,
    title: "Sales Performance Excel Dashboard",
    description:
      "Created a comprehensive Excel dashboard with advanced formulas and pivot tables to track sales performance.",
    fullDescription: `
      This project involved developing a sophisticated Excel dashboard to track and analyze sales performance for a medium-sized 
      retail company. The solution leverages advanced Excel features including pivot tables, dynamic arrays, and custom VBA macros 
      to provide actionable insights.
      
      The dashboard automatically processes raw sales data and presents key metrics such as revenue trends, product performance, 
      regional comparisons, and sales rep productivity. Interactive filters allow users to drill down into specific time periods, 
      product categories, or sales territories.
      
      I implemented custom VBA scripts to automate data refresh and report generation, significantly reducing the time required 
      for monthly reporting. The solution also includes forecasting models based on historical trends and seasonality factors.
    `,
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Dashboard+Overview",
      "/placeholder.svg?height=600&width=800&text=Sales+Trends",
      "/placeholder.svg?height=600&width=800&text=Regional+Performance",
      "/placeholder.svg?height=600&width=800&text=Product+Analysis",
    ],
    videoUrl: "https://www.example.com/video",
    videoThumbnail: "/placeholder.svg?height=600&width=800&text=Video+Thumbnail",
    tags: ["Excel", "Data Analysis", "VBA", "Dashboard Design", "Business Intelligence"],
    categories: ["Excel"],
    slug: "sales-performance-excel-dashboard",
    achievements: [
      "Reduced monthly reporting time from 2 days to 2 hours",
      "Identified underperforming products leading to $120K in cost savings",
      "Improved sales team productivity by 18% through targeted insights",
      "Created automated email reporting system using VBA",
    ],
    technologies: [
      { name: "Excel", icon: "📑" },
      { name: "VBA", icon: "⌨️" },
      { name: "Power Query", icon: "🔄" },
      { name: "Pivot Tables", icon: "📊" },
      { name: "Excel Charts", icon: "📈" },
    ],
    timeline: "1 month (Oct 2023)",
    team: "Solo project with input from sales managers",
    links: [
      { type: "github", url: "https://github.com/yourusername/excel-sales-dashboard" },
      { type: "live", url: "https://example.com/demo" },
    ],
  },
  {
    id: 5,
    title: "SQL Database Optimization",
    description:
      "Optimized database queries and structure, reducing query execution time by 40% and improving application performance.",
    fullDescription: `
      This project focused on optimizing a large-scale SQL database for an e-commerce platform that was experiencing performance issues 
      as their data volume grew. I conducted a comprehensive analysis of database structure, query patterns, and performance bottlenecks.
      
      The optimization strategy included redesigning table schemas, implementing appropriate indexing strategies, normalizing data where 
      needed, and rewriting inefficient queries. I also implemented partitioning for large tables to improve query performance on 
      historical data.
      
      Additionally, I developed a monitoring system to track query performance over time and identify potential issues before they 
      impact users. The solution included detailed documentation and training for the development team on database best practices.
    `,
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Performance+Comparison",
      "/placeholder.svg?height=600&width=800&text=Database+Schema",
      "/placeholder.svg?height=600&width=800&text=Query+Optimization",
      "/placeholder.svg?height=600&width=800&text=Monitoring+Dashboard",
    ],
    videoUrl: "https://www.example.com/video",
    videoThumbnail: "/placeholder.svg?height=600&width=800&text=Video+Thumbnail",
    tags: ["SQL", "Database Design", "Performance Tuning", "Query Optimization", "Database Administration"],
    categories: ["SQL"],
    slug: "sql-database-optimization",
    achievements: [
      "Reduced average query execution time by 40%",
      "Decreased database size by 35% through proper normalization",
      "Improved application response time by 25%",
      "Implemented automated performance monitoring system",
    ],
    technologies: [
      { name: "SQL", icon: "🗃️" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Database Indexing", icon: "🔍" },
      { name: "Query Optimization", icon: "⚡" },
      { name: "Performance Monitoring", icon: "📉" },
    ],
    timeline: "3 months (Nov 2023 - Jan 2024)",
    team: "Collaborated with 2 backend developers",
    links: [
      { type: "github", url: "https://github.com/yourusername/sql-optimization" },
      { type: "live", url: "https://example.com/demo" },
    ],
  },
  {
    id: 6,
    title: "Power BI Sales Analytics",
    description:
      "Developed interactive Power BI dashboards for sales analytics, providing real-time insights for decision-making.",
    fullDescription: `
      This project involved creating a comprehensive Power BI solution for sales analytics at a multinational retail company. 
      The dashboards provide real-time insights into sales performance across multiple dimensions including products, regions, 
      time periods, and sales channels.
      
      I designed and implemented a star schema data model to efficiently handle large volumes of sales data. The solution includes 
      custom DAX measures for complex calculations such as year-over-year growth, moving averages, and contribution margins.
      
      The interactive dashboards allow executives and sales managers to explore data through intuitive visualizations, drill down 
      into specific areas of interest, and identify trends or anomalies. Automated data refresh ensures that decision-makers always 
      have access to the latest information.
    `,
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Executive+Dashboard",
      "/placeholder.svg?height=600&width=800&text=Regional+Analysis",
      "/placeholder.svg?height=600&width=800&text=Product+Performance",
      "/placeholder.svg?height=600&width=800&text=Trend+Analysis",
    ],
    videoUrl: "https://www.example.com/video",
    videoThumbnail: "/placeholder.svg?height=600&width=800&text=Video+Thumbnail",
    tags: ["Power BI", "DAX", "Data Modeling", "Business Intelligence", "Data Visualization"],
    categories: ["Power BI"],
    slug: "power-bi-sales-analytics",
    achievements: [
      "Consolidated data from 5 different source systems",
      "Reduced executive reporting time by 75%",
      "Identified $1.2M in revenue opportunities through trend analysis",
      "Implemented automated daily refresh and distribution",
    ],
    technologies: [
      { name: "Power BI", icon: "📊" },
      { name: "DAX", icon: "🔢" },
      { name: "Power Query", icon: "🔄" },
      { name: "SQL", icon: "🗃️" },
      { name: "Data Modeling", icon: "🏗️" },
    ],
    timeline: "2 months (Feb 2024 - Mar 2024)",
    team: "Led a team of 3 BI developers",
    links: [
      { type: "github", url: "https://github.com/yourusername/power-bi-sales" },
      { type: "live", url: "https://example.com/demo" },
    ],
  },
  {
    id: 7,
    title: "Sentiment Analysis Tool",
    description: "Built an NLP-based sentiment analysis tool to analyze customer feedback and social media mentions.",
    fullDescription: `
      This project involved developing a sophisticated sentiment analysis tool that processes customer feedback from multiple 
      channels including surveys, support tickets, and social media. The solution uses natural language processing (NLP) techniques 
      to classify text as positive, negative, or neutral, and extract key themes and topics.
      
      I implemented a hybrid approach combining lexicon-based methods with machine learning models to achieve high accuracy across 
      different types of text. The system can handle industry-specific terminology and context, providing more relevant insights 
      than generic sentiment tools.
      
      The final solution includes an interactive dashboard that displays sentiment trends over time, highlights emerging issues, 
      and allows users to drill down into specific feedback categories. Automated alerts notify stakeholders when significant 
      sentiment shifts occur.
    `,
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Sentiment+Dashboard",
      "/placeholder.svg?height=600&width=800&text=Topic+Modeling",
      "/placeholder.svg?height=600&width=800&text=Trend+Analysis",
      "/placeholder.svg?height=600&width=800&text=Alert+System",
    ],
    videoUrl: "https://www.example.com/video",
    videoThumbnail: "/placeholder.svg?height=600&width=800&text=Video+Thumbnail",
    tags: ["Python", "NLP", "ML", "AI", "NLTK", "spaCy", "Sentiment Analysis"],
    categories: ["ML", "AI", "Python"],
    slug: "sentiment-analysis-tool",
    achievements: [
      "Achieved 87% accuracy in sentiment classification",
      "Processed over 100,000 customer feedback items monthly",
      "Identified 3 major product issues before they affected sales",
      "Reduced time to identify emerging issues from weeks to hours",
    ],
    technologies: [
      { name: "Python", icon: "🐍" },
      { name: "NLTK", icon: "📝" },
      { name: "spaCy", icon: "🔍" },
      { name: "scikit-learn", icon: "🤖" },
      { name: "Flask", icon: "🌐" },
    ],
    timeline: "3 months (Apr 2024 - Jun 2024)",
    team: "Collaborated with marketing and customer support teams",
    links: [
      { type: "github", url: "https://github.com/yourusername/sentiment-analysis" },
      { type: "live", url: "https://example.com/demo" },
    ],
  },
  {
    id: 8,
    title: "Anomaly Detection System",
    description:
      "Developed a machine learning system to detect anomalies in manufacturing processes, reducing defects by 25%.",
    fullDescription: `
      This project focused on developing an advanced anomaly detection system for a manufacturing client to identify unusual 
      patterns in production data that might indicate equipment failures or quality issues. The system processes real-time 
      sensor data from manufacturing equipment and alerts operators to potential problems before they cause defects.
      
      I implemented multiple anomaly detection algorithms including statistical methods, isolation forests, and deep learning 
      approaches to handle different types of anomalies. The system was trained on historical data with known issues to recognize 
      patterns that precede failures.
      
      The solution includes a real-time monitoring dashboard that displays equipment status, highlights anomalies, and provides 
      recommendations for corrective actions. Integration with the factory's control systems allows for automated adjustments 
      in some scenarios.
    `,
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800&text=Monitoring+Dashboard",
      "/placeholder.svg?height=600&width=800&text=Anomaly+Visualization",
      "/placeholder.svg?height=600&width=800&text=Alert+System",
      "/placeholder.svg?height=600&width=800&text=Performance+Metrics",
    ],
    videoUrl: "https://www.example.com/video",
    videoThumbnail: "/placeholder.svg?height=600&width=800&text=Video+Thumbnail",
    tags: ["Python", "ML", "Statistical Analysis", "Time Series", "IoT", "Real-time Processing"],
    categories: ["ML", "Python"],
    slug: "anomaly-detection-system",
    achievements: [
      "Reduced manufacturing defects by 25%",
      "Decreased unplanned downtime by 30%",
      "Saved approximately $500K annually in waste and rework",
      "Implemented predictive maintenance scheduling",
    ],
    technologies: [
      { name: "Python", icon: "🐍" },
      { name: "scikit-learn", icon: "🤖" },
      { name: "TensorFlow", icon: "⚙️" },
      { name: "Kafka", icon: "📊" },
      { name: "Grafana", icon: "📈" },
    ],
    timeline: "5 months (Jul 2024 - Nov 2024)",
    team: "Collaborated with manufacturing engineers and data scientists",
    links: [
      { type: "github", url: "https://github.com/yourusername/anomaly-detection" },
      { type: "live", url: "https://example.com/demo" },
    ],
  },
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
      <div className="container py-24 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="h-4 bg-muted rounded w-40"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12 md:py-16 min-h-screen">
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
          <div className="relative aspect-video overflow-hidden rounded-xl border border-amber-500/20 shadow-lg">
            <Image
              src={project.videoThumbnail || "/placeholder.svg"}
              alt={`${project.title} video thumbnail`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Button
                size="lg"
                className="rounded-full w-16 h-16 p-0 bg-amber-500 hover:bg-amber-600 text-black"
                onClick={() => window.open(project.videoUrl, "_blank")}
              >
                <Play className="h-8 w-8" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                Overview
              </TabsTrigger>
              <TabsTrigger value="gallery" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                Gallery
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
              >
                Achievements
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
              <div className="relative aspect-video overflow-hidden rounded-xl border border-amber-500/20 shadow-lg">
                <Image
                  src={project.gallery[activeImageIndex] || "/placeholder.svg"}
                  alt={`${project.title} gallery image ${activeImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {project.gallery.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`relative aspect-video overflow-hidden rounded-lg border cursor-pointer transition-all duration-200 ${
                      activeImageIndex === index
                        ? "border-amber-500 ring-2 ring-amber-500/50 scale-[0.98]"
                        : "border-muted hover:border-amber-500/50"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
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
                    className="justify-start gap-2 hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/50"
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
                  className="justify-start gap-2 hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/50"
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
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={relatedProject.image || "/placeholder.svg"}
                        alt={relatedProject.title}
                        fill
                        className="object-cover"
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
