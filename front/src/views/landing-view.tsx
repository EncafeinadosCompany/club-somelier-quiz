import { Button } from "@/common/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/ui/card"
import { MainLayout } from "@/common/widgets/clients/main-layout.widget"
import { Calendar, Clock, MapPin, ChevronRight, ChevronLeft, User } from "lucide-react"
import Link from "next/link"

// Simulación de eventos desde API con estado draft
const eventsFromAPI = [
  {
    id: 1,
    title: "Festival de Carnes Premium",
    description: "Degustación de los mejores cortes de carne preparados por chefs expertos",
    date: "15 de Junio, 2025",
    time: "18:00 - 22:00",
    location: "Centro Gastronómico",
    status: "draft",
  },
  {
    id: 2,
    title: "Taller de Parrilla Argentina",
    description: "Aprende técnicas de asado argentino con los mejores parrilleros",
    date: "22 de Junio, 2025",
    time: "16:00 - 20:00",
    location: "Parque Central",
    status: "draft",
  },
  {
    id: 3,
    title: "Maridaje de Vinos y Carnes",
    description: "Descubre las mejores combinaciones de vinos con diferentes cortes de carne",
    date: "29 de Junio, 2025",
    time: "19:00 - 23:00",
    location: "Vinoteca La Cepa",
    status: "draft",
  },
  {
    id: 4,
    title: "Cena Degustación Gourmet",
    description: "Una experiencia culinaria única con menú de 7 tiempos",
    date: "5 de Julio, 2025",
    time: "20:00 - 23:30",
    location: "Restaurante El Jardín",
    status: "draft",
  },
]

export default function LandingPage() {
  // Filtrar solo eventos con estado draft
  const draftEvents = eventsFromAPI.filter((event) => event.status === "draft")

  return (
    <MainLayout backgroundVariant="gradient">
    <div className="min-h-screen flex flex-col">
      {/* Navbar Simplificado */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-700 to-green-600 rounded-md flex items-center justify-center">
              <span className="font-bold text-white">F</span>
            </div>
            <span className="font-bold text-xl">FoodEvents</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
              Inicio
            </Link>
            <Link href="/contacto" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contacto
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700">
                <User className="mr-2 h-4 w-4" /> Iniciar Sesión
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section Sin Botones */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundPosition: "center 40%",
          }}
        ></div>
        <div className="container relative z-20 h-full flex flex-col justify-center items-start text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Descubre los mejores <span className="text-green-400">eventos culinarios</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Explora nuestra selección de eventos gastronómicos, talleres y experiencias únicas para los amantes de la
            buena comida.
          </p>
        </div>
      </section>

      {/* Div de transición con gradient debajo de la imagen */}
      <div className="h-16 bg-gradient-to-b from-transparent to-[var(--surface-primary)]"></div>

      {/* Events Section - Solo tarjetas con info */}
      <section id="events" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Próximos Eventos</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Descubre nuestros eventos gastronómicos en preparación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {draftEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-green-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-green-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-green-600" />
                      <span>{event.location}</span>
                    </div>
                    <div className="mt-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        En preparación
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Carousel */}
      <section id="partners" className="py-16 bg-white dark:bg-gray-800">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">Nuestros Colaboradores</h2>

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center">
                Trabajamos con los mejores chefs, restaurantes y proveedores para ofrecerte experiencias culinarias
                inolvidables.
              </p>
            </div>

            <div className="relative">
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                title="Anterior colaborador"
                aria-label="Anterior colaborador"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="flex overflow-x-auto gap-6 py-4 px-8 no-scrollbar">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex-shrink-0 w-40 text-center">
                    <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium">{partner.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{partner.type}</p>
                  </div>
                ))}
              </div>

              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Siguiente colaborador"
                title="Siguiente colaborador"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer con enlaces funcionales */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-700 to-green-600 rounded-md flex items-center justify-center">
                  <span className="font-bold text-white">F</span>
                </div>
                <span className="font-bold text-xl text-white">FoodEvents</span>
              </div>
              <p className="text-sm">
                Descubre los mejores eventos gastronómicos y experiencias culinarias en tu ciudad.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Enlaces</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-green-400 transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-green-400 transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-green-400 transition-colors">
                    Iniciar Sesión
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm">
                <li>info@foodevents.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Calle Principal 123, Ciudad</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Suscríbete</h3>
              <p className="text-sm mb-4">Recibe las últimas novedades sobre eventos y promociones.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="px-4 py-2 text-sm rounded-l-md w-full bg-gray-800 border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <Button className="rounded-l-none bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700">
                  Enviar
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} FoodEvents. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
    </MainLayout>
  )
}

// Datos de colaboradores
const partners = [
  {
    id: 1,
    name: "Chef Carlos Pérez",
    type: "Chef Ejecutivo",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Restaurante El Asador",
    type: "Restaurante",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Carnes Premium",
    type: "Proveedor",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Vinoteca La Cepa",
    type: "Patrocinador",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Escuela de Cocina",
    type: "Educación",
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Eventos Gourmet",
    type: "Organizador",
    logo: "/placeholder.svg?height=100&width=100",
  },
]
