import { Link } from "react-router-dom"
import { Button } from "@/common/atoms/Button"
import { User, Coffee, Beef } from "lucide-react"
import { motion } from "framer-motion"

interface NavbarProps {
  currentPage?: 'landing' | 'contact' | 'login'
}

export function NavbarLandind({ currentPage = 'landing' }: NavbarProps) {
  const linkVariants = {
    hover: { y: -2 },
    tap: { y: 0 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.98 }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-amber-950/20 bg-[#1e120a] backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a67c52] to-[#8b5a2b] flex items-center justify-center">
            <Beef className="h-4 w-4 text-[#f8f5f1]" />
          </div>
          <span className="font-serif italic text-[#e8c8a9] text-sm tracking-wide">Club Sommelier</span>
        </motion.div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <motion.div
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${currentPage === 'landing'
                  ? 'text-[#e8c8a9]'
                  : 'text-[#a67c52] hover:text-[#e8c8a9]'
                }`}
            >
              <span className="relative">
                Inicio
                {currentPage === 'landing' && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#a67c52]"
                    layoutId="underline"
                  />
                )}
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/login" tabIndex={-1}>
              <Button
                size="sm"
                className="flex items-center gap-2 px-4 py-1 h-10 bg-gradient-to-r from-[#8b5a2b] to-[#a67c52] hover:from-[#a67c52] hover:to-[#c89d76] text-[#f8f5f1] border border-[#a67c52]/30 shadow-md transition-all duration-200 focus:ring-2 focus:ring-[#a67c52] focus:outline-none"
              >
                <User className="h-4 w-4 mr-1" />
                <span className="text-[14px] font-semibold tracking-wide">Iniciar Sesión</span>
              </Button>
            </Link>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  )
}