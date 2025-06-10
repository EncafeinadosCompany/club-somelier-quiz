import { Card} from "@/common/ui/card"
import { Calendar, Clock, AlertCircle, Loader2, Coffee, Wine, BookOpen, Users, ArrowRight, MessageSquare, Phone, Mail, Beef } from "lucide-react"
import { NavbarLandind } from "@/common/molecules/nav/nav-landing.molecule"
import { Footer } from "@/common/molecules/nav/footer.molecule"
import { useEventsByStatusQuery} from "@/api/query/events.queries"
import { Button } from "@/common/ui/button"
import imageSommelier from "@/assets/cubSommelierFont.png"
import { Contacts } from "@/common/utils/contacts-list"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  hover: { 
    y: -10,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  }
}

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.98 }
}

export default function LandingPage() {
  const { data: events, isLoading, error} = useEventsByStatusQuery()
  const [scrollY, setScrollY] = useState(0)

  // Handle scroll effect for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div 
      className="max-h-[100vh] flex flex-col overflow-y-auto scrollbar-thumb bg-[#f8f5f1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Navbar */}
      <NavbarLandind currentPage="landing" />

      {/* Hero Section - Enhanced with motion */}
      <section className="relative min-h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#33150a]/90 to-[#33150a]/70 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        
        <motion.div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url(${imageSommelier})`,
            backgroundPosition: "center 40%",
            y: scrollY * 0.2 // Parallax effect
          }}
        ></motion.div>
        
        <div className="container mx-auto px-8 relative z-20 h-full flex flex-col justify-center items-start text-white">
          <motion.div 
            className="max-w-3xl pt-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="inline-block mb-3 px-4 py-1 bg-[#8b5a2b]/30 backdrop-blur-sm rounded-full"
              variants={fadeInUp}
            >
              <span className="text-sm font-medium tracking-wide text-[#e8c8a9]">Experiencias Exclusivas</span>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight tracking-tight"
              variants={fadeInUp}
            >
              <span className="text-white block">CLUB</span>
              <span className="text-[#e8c8a9] font-medium">SOMMELIER</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl max-w-2xl mb-10 text-slate-200 font-light leading-relaxed"
              variants={fadeInUp}
            >
              Descubre nuestra exclusiva selección de eventos, talleres y experiencias únicas
              para los verdaderos conocedores de la alta cocina y los mejores cortes.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeInUp}
            >
              <motion.a
                href="#events"
                className="px-6 py-1 bg-gradient-to-r from-[#8b5a2b] to-[#a67c52] text-white rounded-md flex items-center"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                 <span className="text-[14px]">Ver Eventos</span>  <ArrowRight className="ml-2 h-4 w-4" />
              </motion.a>
              
              <motion.a
                href="#quizzes"
                className="px-6 py-1 bg-transparent border border-[#a67c52] text-white rounded-md flex items-center"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span className="text-[14px]">Explorar Cuestionarios</span> <BookOpen className="ml-2 h-4 w-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Social links and status */}
        <motion.div 
          className="absolute bottom-16 left-0 right-0 z-20 py-6 px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4 relative items-center text-center">
              <span className="w-3 h-3 bg-[#8b5a2b] rounded-full animate-pulse"></span>
              <p className="px-6 text-white/90 text-sm">Reservaciones abiertas</p>
            </div>
            <div className="flex items-center gap-8 flex-wrap justify-center">
              {
                Contacts.map((contact, index) => (
                  <motion.a
                    key={contact.name}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img src={contact.icon} alt={contact.name} className="w-5 h-5 rounded-full" />
                    {contact.name}
                  </motion.a>
                ))
              }
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator arrow */}
        <motion.div 
          className="absolute bottom-1/6 xl:bottom-1/8 left-0 right-0 z-20 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.a
            href="#events"
            className="flex flex-col items-center text-white/80 hover:text-white transition-all"
            whileHover={{ y: 5 }}
          >
            <span className="text-sm mb-2">Próximos Eventos</span>
            <svg
              className="w-6 h-6 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </section>

      {/* Events Section - Enhanced with motion */}
      <section id="events" className="py-16 bg-gradient-to-b from-[#d3b89d] via-[#e9d7c7] to-[#f5e8d6]">
        <div className="container mx-auto px-4 w-full ">
          <motion.div 
            className=" mb-10 flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#5c3c10]">Próximos Eventos</h2>
            <p className="text-[#7a5222] max-w-4xl mx-auto">
              Descubre nuestros exclusivos eventos gastronómicos diseñados para los amantes del buen gusto y la experiencia sensorial
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div 
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader2 className="h-12 w-12 text-[#8b5a2b] animate-spin mb-4" />
              <p className="text-[#5c3c10]">Cargando eventos...</p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div 
              className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-lg border border-red-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <p className="text-slate-800 font-medium mb-2">Error al cargar los eventos</p>
              <p className="text-slate-600">Por favor, intenta de nuevo más tarde</p>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="mt-4 px-4 py-2 bg-[#8b5a2b] text-white rounded-md"
              >
                Reintentar
              </motion.button>
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && !error && events?.length === 0 && (
            <motion.div 
              className="flex flex-col items-center justify-center py-12 bg-[#f8f5f1] rounded-lg border border-[#d9c4ad]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Calendar className="h-12 w-12 text-[#8b5a2b] mb-4" />
              <p className="text-[#5c3c10] font-medium mb-2">No hay eventos próximos</p>
              <p className="text-[#7a5222]">Estamos preparando nuevas experiencias culinarias</p>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="mt-4 px-4 py-2 bg-[#8b5a2b] text-white rounded-md"
              >
                Suscríbete para notificaciones
              </motion.button>
            </motion.div>
          )}

          {/* Events Grid */}
          {!isLoading && !error && (events?.length ?? 0) > 0 && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {(events ?? []).map((event) => (
                <motion.div
                  key={event.id}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className="border-none overflow-hidden w-full mx-auto bg-gradient-to-br from-[#e2b591] to-[#d9c4ad] shadow-md">
                    {/* Card inner with business card styling */}
                    <div className="p-4 pb-3 relative">
                      {/* Corner decoration elements */}
                      <div className="absolute top-0 right-0 text-black/30 text-[8px] rotate-90 tracking-widest">RSVP</div>
                      <div className="absolute bottom-0 left-0 text-black/30 text-[8px] -rotate-90 tracking-widest">RSVP</div>

                      {/* Event title with elegant typography */}
                      <div className="text-center mb-2.5">
                        <h4 className="text-[#5c3c10] text-lg font-light italic leading-tight">
                          {event.name?.length > 18 ? `${event.name.substring(0, 18)}...` : event.name}
                        </h4>
                        <div className="w-8 h-0.5 bg-[#5c3c10]/50 mx-auto my-1.5"></div>
                      </div>

                      {/* Event details with tight spacing */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-center">
                          <Calendar className="h-3 w-3 text-[#5c3c10]/70 mr-1.5" />
                          <span className="text-[#5c3c10]/80 text-xs">
                            {new Date(event.start_time).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                        </div>

                        <div className="flex items-center justify-center">
                          <Clock className="h-3 w-3 text-[#5c3c10]/70 mr-1.5" />
                          <span className="text-[#5c3c10]/80 text-xs">
                            {new Date(event.start_time).toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Event status with centered text */}
                      <div className="text-center mt-3 pt-2 border-t border-[#5c3c10]/20">
                        <div className="text-[10px] tracking-wider uppercase text-[#5c3c10]/70 font-medium">
                          {event.status === 'draft' ? 'Próximamente' : 'En proceso'}
                        </div>
                        <div className="text-[8px] tracking-wide text-[#5c3c10]/60 mt-1">
                          DESDE {new Date().getFullYear()}
                        </div>
                      </div>

                      {/* Event type indicator with styling from business card */}
                      <div className="absolute top-0 left-0 text-[8px] tracking-widest text-[#5c3c10]/30">
                        CLUB SOMMELIER
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* New Section - Quiz & Questionnaires */}
      <section id="quizzes" className="py-16 bg-[#f8f5f1]">
        <div className="container mx-auto px-4 ">
          <motion.div 
            className="text-center mb-12 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#5c3c10]">Cuestionarios & Quiz</h2>
            <p className="text-[#7a5222] max-w-2xl mx-auto">
              Pon a prueba tus conocimientos sobre carnes, cortes, sabores y técnicas de preparación con nuestros cuestionarios interactivos.
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Quiz Card 1 - Cortes de Carne */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-none overflow-hidden w-full mx-auto bg-gradient-to-br from-[#d3b89d] to-[#e9d7c7] shadow-md">
          <div className="p-6 relative">
            <div className="mb-4 bg-[#8b5a2b]/10 w-12 h-12 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-[#8b5a2b]" />
            </div>
            <h3 className="text-lg font-semibold text-[#5c3c10] mb-2">Quiz de Cortes de Carne</h3>
            <p className="text-[#7a5222] text-sm mb-4">
              ¿Reconoces los diferentes cortes y sus características? Demuestra cuánto sabes sobre los cortes más populares y especiales.
            </p>
          </div>
              </Card>
            </motion.div>

            {/* Quiz Card 2 - Sabores y Preparaciones */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-none overflow-hidden w-full mx-auto bg-gradient-to-br from-[#d3b89d] to-[#e9d7c7] shadow-md">
          <div className="p-6 relative">
            <div className="mb-4 bg-[#8b5a2b]/10 w-12 h-12 rounded-full flex items-center justify-center">
              <Beef className="h-6 w-6 text-[#8b5a2b]" />
            </div>
            <h3 className="text-lg font-semibold text-[#5c3c10] mb-2">Quiz de Sabores y Preparaciones</h3>
            <p className="text-[#7a5222] text-sm mb-4">
              Descubre si puedes identificar los sabores, marinados y acompañamientos ideales para cada tipo de carne.
            </p>
          </div>
              </Card>
            </motion.div>

            {/* Quiz Card 3 - Técnicas de Cocción de Carne */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-none overflow-hidden w-full mx-auto bg-gradient-to-br from-[#d3b89d] to-[#e9d7c7] shadow-md">
          <div className="p-6 relative">
            <div className="mb-4 bg-[#8b5a2b]/10 w-12 h-12 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-[#8b5a2b]" />
            </div>
            <h3 className="text-lg font-semibold text-[#5c3c10] mb-2">Quiz de Técnicas de Cocción</h3>
            <p className="text-[#7a5222] text-sm mb-4">
              ¿Sabes diferenciar entre asar, sellar, ahumar y otras técnicas para preparar carne? Pon a prueba tus conocimientos.
            </p>

          </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
    

      {/* Footer */}
      <Footer />

      {/* Quick Contact Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.3 }}
      >
        <motion.a
          href="tel:+573128716875"
          className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#8b5a2b] to-[#a67c52] rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Phone className="h-4 w-4 text-white" />
        </motion.a>
      </motion.div>
    </motion.div>
  )
}