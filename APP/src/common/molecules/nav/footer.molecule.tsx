
import { motion } from "framer-motion"
import { Clock, Mail, MessageSquare, Phone } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {


  const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.98 }
}
  return (
    <footer className="py-16 bg-gradient-to-r from-[#5c3c10] to-[#8b5a2b] text-white">
       <motion.section 
        className=""
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                ¿Interesado en organizar un evento?
              </motion.h2>
              <motion.p 
                className="text-white/80 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Contáctanos para organizar una experiencia gastronómica inolvidable o resolver cualquier duda sobre nuestros servicios.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link to="/contact">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="px-6 py-3 bg-white text-[#5c3c10] rounded-md flex items-center font-medium"
                  >
                    <span className="text-[14px]">Contactar</span> <MessageSquare className="ml-2 h-4 w-4" />
                  </motion.button>
                </Link>
                <motion.a
                  href="https://wa.me/573128716875"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-6 py-2  bg-transparent border border-white text-white rounded-md flex items-center"
                >
                 <span className="text-[14px]"> WhatsApp</span> <Phone className="ml-2 h-4 w-4" />
                </motion.a>
              </motion.div>
            </div>
            
            <motion.div 
              className="bg-black/10 backdrop-blur-sm p-6 rounded-lg w-full max-w-3xl flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="font-bold text-xl mb-4">Contacto rápido</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>info@foodevents.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+57 312 871 68 75</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span>24 horas disponible</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </footer>
  )
}