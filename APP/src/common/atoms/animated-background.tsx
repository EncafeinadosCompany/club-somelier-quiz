"use client"

import { ChefHat, Utensils, Wine, Beef, Flame, Wheat, Grape, UtensilsCrossed } from "lucide-react"
import { useEffect, useState } from "react"
import clubSomelier from "@/assets/Copilot_20250603_132231.png"
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
   
  )
}
