"use client"

import { ChefHat, Utensils, Wine, Beef, Flame, Wheat, Grape, UtensilsCrossed } from "lucide-react"
import { useEffect, useState } from "react"
import clubSomelier from "@/assets/clubSomelier.png"
interface FloatingIcon {
  id: number
  Icon: any
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  scaleDelay: number
  moveDelay: number
}

export default function AnimatedBackground() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])

  const iconComponents = [ChefHat, Utensils, Wine, Beef, Flame, Wheat, Grape, UtensilsCrossed]

  useEffect(() => {
    const generateIcons = () => {
      const newIcons: FloatingIcon[] = []

      for (let i = 0; i < 15; i++) {
        newIcons.push({
          id: i,
          Icon: iconComponents[Math.floor(Math.random() * iconComponents.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 25, // 25-55px (más grandes)
          duration: Math.random() * 25 + 20, // 20-45s
          delay: Math.random() * 15,
          opacity: Math.random() * 0.25 + 0.08, // 0.08-0.33 (más visibles)
          scaleDelay: Math.random() * 10,
          moveDelay: Math.random() * 8,
        })
      }

      setIcons(newIcons)
    }

    generateIcons()
  }, [])

  return (
      <img

        src={clubSomelier}
        alt="Beautiful mountain landscape"
        className="object-cover absolute h-full w-full overflow-hidden"
      />
    // <div className="fixed inset-0 -z-10 overflow-hidden">
    //   {/* Gradiente de fondo principal */}
    // <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-900 to-red-950" />

    //   {/* Gradiente superpuesto para profundidad */}
    //  <div className="absolute inset-0 bg-gradient-to-t from-blue-100/30 via-red-950 to-blue-100/20" />

    //   {/* Patrón sutil de textura */}
    //   <div className="absolute inset-0 opacity-[0.02]">
    //     <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,_rgba(139,69,19,0.3)_1px,_transparent_0)] bg-[length:24px_24px]" />
    //   </div>

    //   {/* Iconos flotantes */}
    //   {icons.map((icon) => (
    //     <div
    //       key={icon.id}
    //       className="absolute animate-float"
    //       style={{
    //         left: `${icon.x}%`,
    //         top: `${icon.y}%`,
    //         animationDuration: `${icon.duration}s`,
    //         animationDelay: `${icon.delay}s`,
    //         opacity: icon.opacity,
    //       }}
    //     >
    //       <icon.Icon
    //         size={icon.size}
    //         className="text-white animate-scale-breath animate-gentle-sway"
    //         style={{
    //           animationDuration: `${icon.duration * 0.8}s, ${icon.duration * 1.2}s`,
    //           animationDelay: `${icon.scaleDelay}s, ${icon.moveDelay}s`,
    //         }}
    //       />
    //     </div>
    //   ))}

    //   {/* Partículas adicionales */}
    //   <div className="absolute inset-0">
    //     {Array.from({ length: 8 }).map((_, i) => (
    //       <div
    //         key={`particle-${i}`}
    //         className="absolute w-1 h-1 bg-amber-600/20 rounded-full animate-float-slow"
    //         style={{
    //           left: `${Math.random() * 100}%`,
    //           top: `${Math.random() * 100}%`,
    //           animationDuration: `${Math.random() * 30 + 20}s`,
    //           animationDelay: `${Math.random() * 15}s`,
    //         }}
    //       />
    //     ))}
    //   </div>

    //   {/* Efecto de vignette sutil */}
    //   <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-amber-900/5" />
    // </div>
  )
}
