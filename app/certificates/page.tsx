// "use client"

// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   FileText,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   Eye,
//   Download,
//   X,
//   ExternalLink,
//   Maximize2,
//   ZoomIn,
//   ZoomOut,
// } from "lucide-react"
// import Image from "next/image"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// // Certificate data
// const certificates = [
//   {
//     id: 1,
//     title: "Data Science Professional Certificate",
//     issuer: "IBM",
//     date: "2025",
   
//     categories: ["Data Science", "Python"],
//     link: "https://example.com/certificate1",
//     image: "/Certificate/db.png?height=600&width=600",
//     pdfUrl: "/Certificate/ds.pdf?height=6s00&width=600",

//   },
//   {
//     id: 2,
//     title: "Machine Learning Specialization",
//     issuer: "Stanford University",
//     date: "2025",
     
//     categories: ["ML", "AI"],
//     link: "https://example.com/certificate2",
//     image: "/Certificate/bs.png?height=600&width=600",
//     pdfUrl: "/Certificate/Business Analyst Certification.pdf",
//   },
//   {
//     id: 3,
//     title: "Deep Learning Specialization",
//     issuer: "DeepLearning.AI",
//     date: "2025",
//     image: "/Certificate/?height=400&width=600",
//     categories: ["ML", "AI"],
//     link: "https://example.com/certificate3",
//     pdfUrl: "/Certificate/Deep Learning Specialization.pdf",
//   },
//   {
//     id: 4,
//     title: "Excel Expert Certification",
//     issuer: "Microsoft",
//     date: "2019",
//     image: "/Certificate/?height=400&width=600",
//     categories: ["Excel"],
//     link: "https://example.com/certificate4",
//     pdfUrl: "/Certificate/Advanced Excel.pdf",
//   },
//   {
//     id: 5,
//     title: "SQL Advanced Certification",
//     issuer: "Oracle",
//     date: "2019",
//     image: "/Certificate/?height=400&width=600",
//     categories: ["SQL"],
//     link: "https://example.com/certificate5",
//     pdfUrl: "/Certificate/SQL Advanced Certification.pdf",
//   },
//   {
//     id: 6,
//     title: "Power BI Data Analyst",
//     issuer: "Microsoft",
//     date: "2025",
//     image: "/Certificate/?height=400&width=600",
//     categories: ["Power BI"],
//     link: "https://example.com/certificate6",
//     pdfUrl: "/Certificate/Power BI Data Analyst.pdf",
//   },
//   {
//     id: 7,
//     title: "TensorFlow Developer Certificate",
//     issuer: "Google",
//     date: "2022",
//     image: "/Certificate/?height=400&width=600",
//     categories: ["ML", "AI"],
//     link: "https://example.com/certificate7",
//     pdfUrl: "/Certificate/TensorFlow Developer Certificate.pdf",
//   },
//   {
//     id: 8,
//     title: "Natural Language Processing Specialization",
//     issuer: "DeepLearning.AI",
//     date: "2022",
//     image: "/Certificate/?height=400&width=600",
//     categories: ["ML", "AI"],
//     link: "https://example.com/certificate8",
//     pdfUrl: "/Certificate/Natural Language Processing Specialization.pdf",
//   },
// ]

// // Filter categories
// const categories = ["All", "Excel", "SQL", "Power BI", "Data Science", "Python", "ML", "AI"]

// export default function CertificatesPage() {
//   const [activeCategory, setActiveCategory] = useState("All")
//   const [filteredCertificates, setFilteredCertificates] = useState(certificates)
//   const tabsRef = useRef<HTMLDivElement>(null)
//   const [canScrollLeft, setCanScrollLeft] = useState(false)
//   const [canScrollRight, setCanScrollRight] = useState(false)

//   // Modal state
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[0] | null>(null)
//   const [viewMode, setViewMode] = useState<"image" | "pdf">("image")
//   const [zoomLevel, setZoomLevel] = useState(1)

//   // Update filtered certificates when category changes
//   useEffect(() => {
//     setFilteredCertificates(
//       activeCategory === "All" ? certificates : certificates.filter((cert) => cert.categories.includes(activeCategory)),
//     )
//   }, [activeCategory])

//   // Check if tabs can be scrolled
//   useEffect(() => {
//     const checkScroll = () => {
//       if (tabsRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
//         setCanScrollLeft(scrollLeft > 0)
//         setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5) // 5px buffer
//       }
//     }

//     // Initial check
//     checkScroll()

//     // Add event listener for resize
//     window.addEventListener("resize", checkScroll)

//     // Add event listener for scroll
//     if (tabsRef.current) {
//       tabsRef.current.addEventListener("scroll", checkScroll)
//     }

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", checkScroll)
//       if (tabsRef.current) {
//         tabsRef.current.removeEventListener("scroll", checkScroll)
//       }
//     }
//   }, [])

//   const scrollTabs = (direction: "left" | "right") => {
//     if (tabsRef.current) {
//       const scrollAmount = 200 // Adjust as needed
//       const newScrollLeft =
//         direction === "left" ? tabsRef.current.scrollLeft - scrollAmount : tabsRef.current.scrollLeft + scrollAmount

//       tabsRef.current.scrollTo({
//         left: newScrollLeft,
//         behavior: "smooth",
//       })
//     }
//   }

//   // Function to handle PDF download
//   const handleDownloadPDF = (url: string, title: string) => {
//     // Create a link to the PDF file
//     const link = document.createElement("a")
//     link.href = url
//     link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.pdf`
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   // Function to open certificate modal
//   const openCertificateModal = (certificate: (typeof certificates)[0], mode: "image" | "pdf") => {
//     setSelectedCertificate(certificate)
//     setViewMode(mode)
//     setZoomLevel(1) // Reset zoom level when opening modal
//     setIsModalOpen(true)
//   }

//   // Function to handle zoom
//   const handleZoom = (direction: "in" | "out") => {
//     if (direction === "in" && zoomLevel < 2) {
//       setZoomLevel((prev) => prev + 0.1)
//     } else if (direction === "out" && zoomLevel > 0.5) {
//       setZoomLevel((prev) => prev - 0.1)
//     }
//   }

//   return (
//     <div className="container py-16 md:py-24 min-h-screen">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">
//           My Certificates
//         </h1>
//         <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//           Professional certifications and courses I've completed to enhance my skills in data science, machine learning,
//           and AI.
//         </p>
//       </motion.div>

//       {/* Desktop Filter Categories */}
//       <div className="relative hidden md:block mb-12">
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-300/10 blur-xl rounded-xl"
//           animate={{
//             opacity: [0.5, 0.8, 0.5],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Number.POSITIVE_INFINITY,
//             repeatType: "reverse",
//           }}
//         />
//         <div className="relative z-10 flex items-center">
//           <Button
//             variant="ghost"
//             size="icon"
//             className={`mr-1 flex-shrink-0 ${!canScrollLeft ? "opacity-0" : "opacity-100"}`}
//             onClick={() => scrollTabs("left")}
//             disabled={!canScrollLeft}
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </Button>

//           <div
//             ref={tabsRef}
//             className="flex-1 overflow-x-auto scrollbar-hide"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             <div className="flex p-1 bg-background/80 backdrop-blur-sm rounded-xl border border-amber-500/20 w-fit mx-auto">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setActiveCategory(category)}
//                   className={`px-4 py-2 mx-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
//                     activeCategory === category ? "bg-amber-500 text-black" : "hover:bg-muted"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <Button
//             variant="ghost"
//             size="icon"
//             className={`ml-1 flex-shrink-0 ${!canScrollRight ? "opacity-0" : "opacity-100"}`}
//             onClick={() => scrollTabs("right")}
//             disabled={!canScrollRight}
//           >
//             <ChevronRight className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>

//       {/* Mobile Filter Categories */}
//       <div className="md:hidden mb-8">
//         <div className="flex items-center justify-between gap-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="w-full flex justify-between items-center border-amber-500/20">
//                 <div className="flex items-center">
//                   <Filter className="mr-2 h-4 w-4" />
//                   <span>Filter: {activeCategory}</span>
//                 </div>
//                 <ChevronRight className="h-4 w-4 ml-2 opacity-70" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="w-48">
//               {categories.map((category) => (
//                 <DropdownMenuItem
//                   key={category}
//                   className={activeCategory === category ? "bg-amber-500/10 text-amber-500 font-medium" : ""}
//                   onClick={() => setActiveCategory(category)}
//                 >
//                   {category}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       <AnimatePresence>
//         <motion.div
//           layout
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           initial="hidden"
//           animate="visible"
//           variants={{
//             hidden: { opacity: 0 },
//             visible: {
//               opacity: 1,
//               transition: {
//                 staggerChildren: 0.1,
//               },
//             },
//           }}
//         >
//           {filteredCertificates.map((certificate, index) => (
//             <motion.div
//               key={certificate.id}
//               layout
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//               }}
//             >
//               <Card className="overflow-hidden h-full border border-amber-500/10 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-background to-muted/30">
//                 <div
//                   className="relative h-48 overflow-hidden group cursor-pointer"
//                   onClick={() => openCertificateModal(certificate, "image")}
//                 >
//                   <Image
//                     src={certificate.image || "/Certificate/"}
//                     alt={certificate.title}
//                     fill
//                     className="object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                     <div className="p-2 bg-amber-500 rounded-full">
//                       <Maximize2 className="h-6 w-6 text-black" />
//                     </div>
//                   </div>
//                 </div>
//                 <CardHeader>
//                   <CardTitle className="line-clamp-2">{certificate.title}</CardTitle>
//                   <CardDescription className="flex items-center gap-1 text-sm">
//                     <span className="font-medium">{certificate.issuer}</span>
//                     <span className="text-muted-foreground">•</span>
//                     <span>{certificate.date}</span>
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-wrap gap-2">
//                     {certificate.categories.map((category) => (
//                       <Badge
//                         key={category}
//                         variant="outline"
//                         className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/50"
//                       >
//                         {category}
//                       </Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//                 <CardFooter className="flex gap-2">
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="rounded-full border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-500"
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             openCertificateModal(certificate, "image")
//                           }}
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>View Certificate</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>

//                   <Button
//                     variant="outline"
//                     className="flex-1 border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-500"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       openCertificateModal(certificate, "pdf")
//                     }}
//                   >
//                     <FileText className="mr-2 h-4 w-4" />
//                     View PDF
//                   </Button>

//                   <Button
//                     variant="default"
//                     className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleDownloadPDF(certificate.pdfUrl, certificate.title)
//                     }}
//                   >
//                     <Download className="mr-2 h-4 w-4" />
//                     Download
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>
//       </AnimatePresence>

//       {filteredCertificates.length === 0 && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
//           <p className="text-xl text-muted-foreground">No certificates found in this category.</p>
//           <Button variant="link" className="text-amber-500 mt-2" onClick={() => setActiveCategory("All")}>
//             View all certificates
//           </Button>
//         </motion.div>
//       )}

//       {/* Certificate Viewer Modal */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] p-0 overflow-hidden">
//           <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b">
//             <div className="flex-1">
//               <DialogTitle className="text-xl">{selectedCertificate?.title}</DialogTitle>
//               <DialogDescription>
//                 {selectedCertificate?.issuer} • {selectedCertificate?.date}
//               </DialogDescription>
//             </div>
//             <div className="flex items-center gap-2">
//               {viewMode === "image" && (
//                 <>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="rounded-full"
//                     onClick={() => handleZoom("in")}
//                     disabled={zoomLevel >= 2}
//                   >
//                     <ZoomIn className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="rounded-full"
//                     onClick={() => handleZoom("out")}
//                     disabled={zoomLevel <= 0.5}
//                   >
//                     <ZoomOut className="h-4 w-4" />
//                   </Button>
//                 </>
//               )}
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className={`${viewMode === "image" ? "bg-amber-500/10 text-amber-500 border-amber-500/50" : ""}`}
//                 onClick={() => setViewMode("image")}
//               >
//                 Image
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className={`${viewMode === "pdf" ? "bg-amber-500/10 text-amber-500 border-amber-500/50" : ""}`}
//                 onClick={() => setViewMode("pdf")}
//               >
//                 PDF
//               </Button>
//               <Button variant="outline" size="icon" className="rounded-full" onClick={() => setIsModalOpen(false)}>
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           <div className="p-4 overflow-auto max-h-[calc(95vh-140px)]">
//             {viewMode === "image" ? (
//               <div
//                 className="relative w-full mx-auto overflow-hidden"
//                 style={{
//                   height: "70vh",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <div
//                   style={{
//                     transform: `scale(${zoomLevel})`,
//                     transition: "transform 0.2s ease-out",
//                     maxWidth: "100%",
//                     maxHeight: "100%",
//                     position: "relative",
//                     width: "100%",
//                     height: "100%",
//                   }}
//                 >
//                   <Image
//                     src={selectedCertificate?.image || "/Certificate/"}
//                     alt={selectedCertificate?.title || "Certificate"}
//                     fill
//                     className="object-contain"
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className="w-full h-[70vh] bg-muted rounded-md overflow-hidden">
//                 <iframe
//                   src={`${selectedCertificate?.pdfUrl}#toolbar=1&navpanes=1`}
//                   className="w-full h-full"
//                   title={selectedCertificate?.title}
//                 />
//               </div>
//             )}
//           </div>

//           <div className="sticky bottom-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-t">
//             <Button
//               variant="outline"
//               size="sm"
//               className="gap-2"
//               onClick={() => window.open(selectedCertificate?.link, "_blank")}
//             >
//               <ExternalLink className="h-4 w-4" />
//               View Original
//             </Button>
//             <Button
//               variant="default"
//               size="sm"
//               className="gap-2 bg-amber-500 hover:bg-amber-600 text-black"
//               onClick={() =>
//                 selectedCertificate && handleDownloadPDF(selectedCertificate.pdfUrl, selectedCertificate.title)
//               }
//             >
//               <Download className="h-4 w-4" />
//               Download PDF
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }



"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Certificate data
const certificates = [
  {
    id: 1,
    title: "Data Science  Certificate",
    issuer: "Udemy",
    date: "2025",
    categories: ["Data Science", "ML"],
    link: "https://example.com/certificate1",
    image: "/Certificate/db.png?height=600&width=600",
    pdfUrl: "/Certificate/ds.pdf?height=6s00&width=600",
  },
  {
    id: 2,
    title: "Business Analyst Certificate",
    issuer: "Agile Enterprise ",
    date: "2025",
    categories: ["Data Analysis"],

    image: "/Certificate/bs.png?height=600&width=600",

  },
  {
    id: 3,
    title: "Tableau: Data Visualization",
    issuer: "Udemy",
    date: "2025",
    image: "/Certificate/1.png?height=400&width=600",
    categories: ["Power BI/ Tableau"],
  },
  {
    id: 4,
    title: "Complete SQL Course 2025",
    issuer: "Udemy",
    date: "2025",
    image: "/Certificate/2.png?height=400&width=600",
    categories: ["SQL/Database"],
  },
  {
    id: 5,
    title: "Time Series Analysis",
    issuer: "Udemy",
    date: "2025",
    image: "/Certificate/3.png?height=400&width=600",
    categories: ["Python"],
  },
  {
    id: 6,
    title: "N8N: AI Agent Creation",
    issuer: "Udemy",
    date: "2025",
    image: "/Certificate/4.png?height=400&width=600",
    categories: ["AI"],
  },
  {
    id: 7,
    title: "Power BI: Data Visualization",
    issuer: "Udemy",
    date: "2025",
    image: "/Certificate/5.png?height=400&width=600",
    categories: ["Power BI/ Tableau"],
  },
  {
    id: 8,
    title: "Microsoft Power BI & AI Dashboards",
    issuer: "Udemy",
    date: "2025",
    image: "/Certificate/6.png?height=400&width=600",
    categories: ["Power BI/ Tableau"],
  },
   {
    id: 9,
    title: "Git: Version Control",
    issuer: "Udemy",
    date: "2025",
    image: "/Certificate/7.png?height=400&width=600",
    categories: ["ALL"],
  },
   {
    id: 10,
    title: "Microsoft Excel",
    issuer: "Udemy",
    date: "2025",
    image: "/Certificate/8.png?height=400&width=600",
    categories: ["Excel"],
  },
   {
    id: 11,
    title: "Master Data Anaysis & Analytics",
    issuer: "Udemy",
    date: "2025",
    image: "/Certificate/9.png?height=400&width=600",
    categories: ["Data Analysis"],
  },
   {
    id: 12,
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI",
    date: "2022",
    image: "/Certificate/10.png?height=400&width=600",
    categories: ["ML", "AI"],
  },
   {
    id: 13,
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI",
    date: "2022",
    image: "/Certificate/11.png?height=400&width=600",
    categories: ["ML", "AI"],
  },
   {
    id: 14,
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI",
    date: "2022",
    image: "/Certificate/12.png?height=400&width=600",
    categories: ["ML", "AI"],
  },
   {
    id: 15,
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI",
    date: "2022",
    image: "/Certificate/13.png?height=400&width=600",
    categories: ["ML", "AI"],
  },
   {
    id: 16,
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI",
    date: "2022",
    image: "/Certificate/14.png?height=400&width=600",
    categories: ["ML", "AI"],
  },
]

// Filter categories
const categories = ["All", "Excel", "SQL/Database", "Python", "Data Analysis", "Data Science" ,"Power BI/ Tableau",  "ML", "AI"]

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredCertificates, setFilteredCertificates] = useState(certificates)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [selectedCertificateId, setSelectedCertificateId] = useState<number | null>(null)
  const certificateViewRef = useRef<HTMLDivElement>(null)

  // Update filtered certificates when category changes
  useEffect(() => {
    setFilteredCertificates(
      activeCategory === "All" ? certificates : certificates.filter((cert) => cert.categories.includes(activeCategory)),
    )
  }, [activeCategory])

  // Check if tabs can be scrolled
  useEffect(() => {
    const checkScroll = () => {
      if (tabsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5) // 5px buffer
      }
    }

    // Initial check
    checkScroll()

    // Add event listener for resize
    window.addEventListener("resize", checkScroll)

    // Add event listener for scroll
    if (tabsRef.current) {
      tabsRef.current.addEventListener("scroll", checkScroll)
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkScroll)
      if (tabsRef.current) {
        tabsRef.current.removeEventListener("scroll", checkScroll)
      }
    }
  }, [])

  // Scroll to certificate view when selected
  useEffect(() => {
    if (selectedCertificateId && certificateViewRef.current) {
      setTimeout(() => {
        certificateViewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [selectedCertificateId])

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200 // Adjust as needed
      const newScrollLeft =
        direction === "left" ? tabsRef.current.scrollLeft - scrollAmount : tabsRef.current.scrollLeft + scrollAmount

      tabsRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  const toggleCertificateView = (id: number) => {
    if (selectedCertificateId === id) {
      setSelectedCertificateId(null)
    } else {
      setSelectedCertificateId(id)
    }
  }

  const selectedCertificate = certificates.find((cert) => cert.id === selectedCertificateId)

  return (
    <div className="container py-16 md:py-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">
          My Certificates
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Professional certifications and courses I've completed to enhance my skills in data science, machine learning,
          and AI.
        </p>
      </motion.div>

      {/* Desktop Filter Categories */}
      <div className="relative hidden md:block mb-12">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-300/10 blur-xl rounded-xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <div className="relative z-10 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className={`mr-1 flex-shrink-0 ${!canScrollLeft ? "opacity-0" : "opacity-100"}`}
            onClick={() => scrollTabs("left")}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div
            ref={tabsRef}
            className="flex-1 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex p-1 bg-background/80 backdrop-blur-sm rounded-xl border border-amber-500/20 w-fit mx-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 mx-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === category ? "bg-amber-500 text-black" : "hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`ml-1 flex-shrink-0 ${!canScrollRight ? "opacity-0" : "opacity-100"}`}
            onClick={() => scrollTabs("right")}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Filter Categories */}
      <div className="md:hidden mb-8">
        <div className="flex items-center justify-between gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between items-center border-amber-500/20">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Filter: {activeCategory}</span>
                </div>
                <ChevronRight className="h-4 w-4 ml-2 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  className={activeCategory === category ? "bg-amber-500/10 text-amber-500 font-medium" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Certificate Viewer (when a certificate is selected) */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            ref={certificateViewRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full mb-12 relative"
          >
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40"
                onClick={() => setSelectedCertificateId(null)}
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>
            <div className="w-full bg-black rounded-xl overflow-hidden">
              <div className="relative w-full aspect-[3/2] max-h-[90vh]">
                <Image
                  src={selectedCertificate.image || "/Certificate/"}
                  alt={selectedCertificate.title}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredCertificates.map((certificate) => (
            <motion.div
              key={certificate.id}
              layout
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card
                className={`overflow-hidden h-full border border-amber-500/10 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-background to-muted/30 cursor-pointer ${
                  selectedCertificateId === certificate.id ? "ring-2 ring-amber-500" : ""
                }`}
                onClick={() => toggleCertificateView(certificate.id)}
              >
                <div className="relative aspect-[3/2] overflow-hidden group">
                  <Image
                    src={certificate.image || "/Certificate/"}
                    alt={certificate.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{certificate.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-sm">
                    <span className="font-medium">{certificate.issuer}</span>
                    <span className="text-muted-foreground">•</span>
                    <span>{certificate.date}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {certificate.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/50"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredCertificates.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p className="text-xl text-muted-foreground">No certificates found in this category.</p>
          <Button variant="link" className="text-amber-500 mt-2" onClick={() => setActiveCategory("All")}>
            View all certificates
          </Button>
        </motion.div>
      )}
    </div>
  )
}
