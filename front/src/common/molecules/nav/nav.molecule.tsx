import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/common/ui/button";
import { LogOutIcon, Coffee, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, memo } from "react";
import { NavItemType } from "@/api/types/nav.types";

interface NavGeneralProps {
  isMobile: boolean;
  isExpanded: boolean;
  navItems: NavItemType[];
  setIsExpanded: (isExpanded: boolean) => void;
  logoPath?: string;
  coffeecoins?: number;
  isLoading?: boolean;
  name?: string | null;
  children?: React.ReactNode;
}

const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

// Componente memoizado para los elementos de navegación
const NavItem = memo(({ 
  item, 
  isExpanded, 
  isActive, 
  onClick 
}: { 
  item: NavItemType; 
  isExpanded: boolean; 
  isActive: boolean;
  onClick?: () => void;
}) => (
  <Link
    key={item.href}
    to={item.href}
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative",
      isActive
        ? "bg-gradient-to-r from-amber-50 to-amber-100/70 text-amber-800 font-medium"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
      isExpanded ? "" : "justify-center"
    )}
    aria-current={isActive ? "page" : undefined}
  >
    <div
      className={cn(
        "flex-shrink-0",
        isActive
          ? "text-amber-600"
          : "text-gray-500"
      )}
    >
      {item.icon}
    </div>
    <span
      className={cn(
        "font-medium whitespace-nowrap transition-opacity duration-300",
        isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
      )}
    >
      {item.title}
    </span>

    {isActive && !isExpanded && (
      <div className="absolute left-0 w-1 h-6 bg-amber-500 rounded-r-full" aria-hidden="true"></div>
    )}
  </Link>
));

export const NavGeneral = ({
  isMobile,
  isExpanded,
  navItems,
  setIsExpanded,
  name
}: NavGeneralProps) => {
  const location = useLocation();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Efecto para manejar el scroll y ocultar/mostrar la barra de navegación móvil
  useEffect(() => {
    if (!isMobile) return;
    
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      
      // Si hay un menú expandido, cerrarlo al hacer scroll
      if (isMenuExpanded && currentScrollY > lastScrollY) {
        setIsMenuExpanded(false);
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, isMenuExpanded]);

  const isRouteActive = (href: string) => {
    if (href === '/coffeelover' && location.pathname === '/coffeelover') {
      return true;
    }

    if (location.pathname.startsWith(href + '/') || location.pathname === href) {
      const moreSpecificMatch = navItems.some(item =>
        item.href !== href &&
        location.pathname.startsWith(item.href) &&
        item.href.startsWith(href) &&
        item.href.length > href.length
      );

      return !moreSpecificMatch;
    }

    return false;
  };

  // Manejar teclas para navegación por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuExpanded) {
      setIsMenuExpanded(false);
    }
  };

  return (
    <div className="flex h-full bg-gray-50 w-full overflow-hidden" onKeyDown={handleKeyDown}>
      {!isMobile && (
        <div
          className={cn(
            "md:flex flex-col sticky top-0 h-full bg-white shadow-lg border-r border-gray-100 z-50 transition-all duration-400 overflow-hidden flex-shrink-0",
            isExpanded ? "w-56 lg:w-64" : "w-16"
          )}
          role="navigation"
          aria-label="Navegación principal"
        >
          <div
            className={cn(
              "transition-all duration-400 relative",
              isExpanded ? "pt-5 pb-4" : "py-4"
            )}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 to-amber-500"></div>
            <div
              className={cn(
                "flex items-center",
                isExpanded ? "px-4 flex-row gap-2" : "justify-center"
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 relative",
                  isExpanded ? "w-9 h-4" : "w-8 h-8"
                )}
              >
                <div className="absolute inset-0 p-0.5">
                  {/* Aquí puedes añadir un logo o icono */}
                </div>
              </div>
              {isExpanded && (
                <div className="flex-grow min-w-0 overflow-hidden">
                  <h1 className="font-medium text-[#6F4E37] leading-tight truncate max-w-[120px]">
                    <span className="text-sm">
                      {name || "Bienvenido"}
                    </span>
                  </h1>
                </div>
              )}

              {isExpanded && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Contraer menú"
                  className="h-7 w-7 hover:bg-amber-50 rounded-lg text-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
            </div>

            {!isExpanded && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(true)}
                aria-label="Expandir menú"
                className="w-full flex justify-center mt-2 text-amber-700 hover:bg-amber-50 focus:ring-2 focus:ring-amber-500 focus:ring-offset-1"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}

            <div className="mt-3 mx-3 h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
          </div>

          <nav 
            className="flex flex-col gap-1 p-2 mt-1 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200"
            aria-label="Menú principal"
          >
            {navItems.map((item) => (
              <NavItem 
                key={item.href}
                item={item} 
                isExpanded={isExpanded} 
                isActive={isRouteActive(item.href)} 
              />
            ))}
          </nav>

          <div className="mt-auto border-t border-gray-100 ">
            <div className="px-2 py-3">
              <Link
                to="/"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300",
                  "text-gray-600 hover:bg-red-50/50 hover:text-red-700",
                  isExpanded ? "" : "justify-center"
                )}
                aria-label="Cerrar sesión"
                // onClick={clearAuthStorage}
              >
                <div className="flex-shrink-0 text-gray-500">
                  <LogOutIcon className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "font-medium whitespace-nowrap transition-opacity duration-300",
                    isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  Salir
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col h-full mx-auto item-center justify-center min-w-0 overflow-hidden">        
        <main className={`flex-1 w-full h-full relative ${isMobile ? 'has-mobile-nav pb-16' : ''}`}>
          <Outlet />
        </main>

        {isMobile && (
          <div 
            className={cn(
              "md:hidden fixed bottom-0 left-0 right-0 bg-white mobile-navbar shadow-[0_-4px_30px_-1px_rgba(0,0,0,0.08)] border-t border-gray-100 transition-all duration-300",
              scrollPosition > 50 && !isMenuExpanded ? "translate-y-full" : "translate-y-0"
            )}
            role="navigation"
            aria-label="Navegación móvil"
          >
            {isMenuExpanded && navItems.length > 4 && (
              <div 
                className="absolute bottom-full w-full bg-white shadow-[0_-4px_30px_-1px_rgba(0,0,0,0.08)] rounded-t-2xl border-t border-gray-100 transition-all duration-300"
                aria-expanded={isMenuExpanded}
                aria-label="Menú expandido"
              >
                <nav className="grid grid-cols-4 gap-2 p-4">
                  {navItems.slice(4).map((item) => (
                    <NavItem 
                      key={item.href}
                      item={item} 
                      isExpanded={true} 
                      isActive={isRouteActive(item.href)}
                      onClick={() => setIsMenuExpanded(false)}
                    />
                  ))}
                  <Link
                    to="/"
                    className="flex flex-col items-center justify-center px-2 py-1.5 rounded-xl transition-all duration-300 text-gray-500 hover:text-red-600 hover:bg-red-50/30"
                    aria-label="Cerrar sesión"
                    // onClick={clearAuthStorage}
                  >
                    <div className="p-1">
                      <LogOutIcon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-medium mt-0.5">Salir</span>
                  </Link>
                </nav>
              </div>
            )}

            <nav 
              className="flex justify-around items-center h-16 px-2 bg-white shadow-[0_-4px_30px_-1px_rgba(0,0,0,0.08)] border-t border-gray-100 safe-area-bottom"
              aria-label="Menú principal móvil"
            >
              {navItems.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center px-2 py-1.5 rounded-xl transition-all duration-300 relative",
                    isRouteActive(item.href)
                      ? "text-amber-800 bg-amber-50"
                      : "text-gray-500 hover:text-amber-600 hover:bg-amber-50/30"
                  )}
                  aria-current={isRouteActive(item.href) ? "page" : undefined}
                >
                  <div className={cn(
                    "p-1 rounded-lg",
                    isRouteActive(item.href) ? "bg-amber-100" : ""
                  )}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-medium mt-0.5 truncate max-w-[60px] text-center">
                    {item.title}
                  </span>
                </Link>
              ))}

              {navItems.length > 5 ? (
                <button
                  onClick={() => setIsMenuExpanded(!isMenuExpanded)}
                  className={cn(
                    "flex flex-col items-center justify-center px-2 py-1.5 rounded-xl transition-all duration-300",
                    isMenuExpanded ? "text-amber-800 bg-amber-50" : "text-gray-500 hover:text-amber-600 hover:bg-amber-50/30"
                  )}
                  aria-expanded={isMenuExpanded}
                  aria-label={isMenuExpanded ? "Contraer menú" : "Expandir menú"}
                >
                  <div className="p-1 rounded-lg">
                    {isMenuExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-[10px] font-medium mt-0.5">Más</span>
                </button>
              ) : (
                <Link
                  to="/"
                  className="flex flex-col items-center justify-center px-2 py-1.5 rounded-xl transition-all duration-300 text-gray-500 hover:text-red-600 hover:bg-red-50/30"
                  aria-label="Cerrar sesión"
                //   onClick={clearAuthStorage}
                >
                  <div className="p-1">
                    <LogOutIcon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-medium mt-0.5">Salir</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};