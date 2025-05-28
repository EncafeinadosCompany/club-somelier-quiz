import { useState, useEffect } from "react"

import { NavGeneral } from "../molecules/nav/nav.molecule"
import { NavItemType } from "@/api/types/nav.types"
import { navAdmin } from "../utils/nav_admin"


export type NavItem = {
  navItems?: NavItemType[]
  isloading?: boolean | null
}

export default function Navbar({ navItems, isloading}: NavItem) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsExpanded(false)
      } else {
        setIsExpanded(true)
      }
    }

    checkIfMobile()

    window.addEventListener("resize", checkIfMobile)

    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
      <NavGeneral
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isMobile={isMobile}
        navItems={navAdmin}
        isLoading={isloading? isloading : false}
        >
      </NavGeneral>
   
  )
}