import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Tabs from '@radix-ui/react-tabs'
import { User, Mail, Phone, ArrowRight, ArrowLeft } from 'lucide-react'
import { SplitTextWelcome } from '../atoms/SplitTextWelcome'
import { InputField } from '../atoms/InputField'
import { Button } from '../atoms/Button'
import { MultiStateBadge, BadgeState } from '../atoms/MultiStateBadge'

interface UserData {
  name: string
  email: string
  phone: string
}

interface WelcomeFormProps {
  onComplete?: (userData: UserData) => void
  className?: string
}

export function WelcomeForm({ onComplete, className = '' }: WelcomeFormProps) {
  const [currentTab, setCurrentTab] = useState('name')
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState<Partial<UserData>>({})
  const [submitState, setSubmitState] = useState<BadgeState>('pending')

  const tabs = [
    { id: 'name', label: 'Nombre', icon: User, field: 'name' as keyof UserData },
    { id: 'email', label: 'Correo', icon: Mail, field: 'email' as keyof UserData },
    { id: 'phone', label: 'Teléfono', icon: Phone, field: 'phone' as keyof UserData }
  ]

  const currentTabIndex = tabs.findIndex(tab => tab.id === currentTab)
  const isLastTab = currentTabIndex === tabs.length - 1
  const isFirstTab = currentTabIndex === 0

  const validateField = (field: keyof UserData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        return value.length < 2 ? 'El nombre debe tener al menos 2 caracteres' : undefined
      case 'email':
        return !/\S+@\S+\.\S+/.test(value) ? 'Ingresa un correo válido' : undefined
      case 'phone':
        return !/^\+?[\d\s-()]{8,}$/.test(value) ? 'Ingresa un teléfono válido' : undefined
      default:
        return undefined
    }
  }

  const handleNext = () => {
    const currentField = tabs[currentTabIndex].field
    const error = validateField(currentField, userData[currentField])
    
    if (error) {
      setErrors(prev => ({ ...prev, [currentField]: error }))
      return
    }
    
    setErrors(prev => ({ ...prev, [currentField]: undefined }))
    
    if (isLastTab) {
      handleSubmit()
    } else {
      setCurrentTab(tabs[currentTabIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    if (!isFirstTab) {
      setCurrentTab(tabs[currentTabIndex - 1].id)
    }
  }

  const handleSubmit = async () => {
    setSubmitState('loading')
    
    setTimeout(() => {
      setSubmitState('success')
      onComplete?.(userData)
    }, 1500)
  }

  const updateUserData = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="mb-8">
        <SplitTextWelcome 
          text="¡Bienvenido a Realidad o Mito!" 
          className="mb-4"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-[var(--text-secondary)] text-center text-sm"
        >
          Completa tu información para comenzar
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mb-6"
      >
        <div className="flex justify-between mb-2">
          {tabs.map((tab, index) => (
            <div key={tab.id} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                transition-all duration-300
                ${index <= currentTabIndex 
                  ? 'bg-[var(--accent-primary)] text-white' 
                  : 'bg-[var(--surface-secondary)] text-[var(--text-tertiary)]'
                }
              `}>
                {index < currentTabIndex ? '✓' : index + 1}
              </div>
              {index < tabs.length - 1 && (
                <div className={`
                  w-12 h-0.5 mx-2 transition-all duration-300
                  ${index < currentTabIndex 
                    ? 'bg-[var(--accent-primary)]' 
                    : 'bg-[var(--border-primary)]'
                  }
                `} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
          <AnimatePresence mode="wait">
            {tabs.map((tab) => (
              <Tabs.Content key={tab.id} value={tab.id}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <InputField
                    label={tab.label}
                    type={tab.field === 'email' ? 'email' : tab.field === 'phone' ? 'tel' : 'text'}
                    placeholder={
                      tab.field === 'name' ? 'Tu nombre completo' :
                      tab.field === 'email' ? 'tu@correo.com' :
                      '+1 234 567 8900'
                    }
                    icon={tab.icon}
                    value={userData[tab.field]}
                    onChange={(value) => updateUserData(tab.field, value)}
                    error={errors[tab.field]}
                    required
                  />
                </motion.div>
              </Tabs.Content>
            ))}
          </AnimatePresence>

          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstTab}
              className={`${isFirstTab ? 'opacity-50' : ''}`}
            >
              <ArrowLeft size={16} className="mr-2" />
              Anterior
            </Button>

            {isLastTab ? (
              <MultiStateBadge
                state={submitState}
                text={
                  submitState === 'pending' ? 'Comenzar' :
                  submitState === 'loading' ? 'Iniciando...' :
                  '¡Listo!'
                }
                onClick={submitState === 'pending' ? handleNext : undefined}
                disabled={submitState !== 'pending'}
              />
            ) : (
              <Button onClick={handleNext}>
                Siguiente
                <ArrowRight size={16} className="ml-2" />
              </Button>
            )}
          </div>
        </Tabs.Root>
      </motion.div>
    </div>
  )
}
