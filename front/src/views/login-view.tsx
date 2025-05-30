"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/common/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/common/ui/card"
import { Input } from "@/common/ui/input"
import { Label } from "@/common/ui/label"
import { MainLayout } from '../common/widgets/clients/main-layout.widget'
import { Eye, EyeOff, User, Lock } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", formData)
    // Aquí irá tu lógica de autenticación
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <MainLayout backgroundVariant="gradient">
      <div className="flex items-center justify-center p-4 min-h-screen">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-[var(--surface-primary)]/95 backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-8 pt-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-[var(--text-primary)]">
              Iniciar Sesión
            </CardTitle>
            <p className="text-center text-[var(--text-secondary)] text-sm">
              Accede a tu cuenta para continuar
            </p>
          </CardHeader>

          <CardContent className="space-y-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-[var(--text-primary)]">
                  Usuario
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Ingresa tu usuario"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="pl-10 h-12 border-2 border-[var(--border-primary)] rounded-xl focus:border-[var(--accent-primary)] transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[var(--text-primary)]">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 h-12 border-2 border-[var(--border-primary)] rounded-xl focus:border-[var(--accent-primary)] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:from-[var(--accent-primary-hover)] hover:to-[var(--accent-secondary-hover)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
