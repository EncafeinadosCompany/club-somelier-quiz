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
    <div className={`w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ${className}`}>
      {/* Header con título responsive */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <SplitTextWelcome 
          text="¡Bienvenido a Realidad o Mito!" 
          className="mb-3 sm:mb-4 lg:mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-[var(--text-secondary)] text-center text-xs sm:text-sm lg:text-base px-2"
        >
          Completa tu información para comenzar
        </motion.p>
      </div>

      {/* Progress indicator - responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mb-6 sm:mb-8 lg:mb-10"
      >
        <div className="flex justify-center sm:justify-between items-center mb-3 sm:mb-4">
          {tabs.map((tab, index) => (
            <div key={tab.id} className="flex items-center">
              {/* Circle indicator - responsive size */}
              <motion.div 
                className={`
                  w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10
                  rounded-full flex items-center justify-center 
                  text-xs sm:text-sm lg:text-base font-bold
                  transition-all duration-300 ease-out
                  ${index <= currentTabIndex 
                    ? 'bg-[var(--accent-primary)] text-white shadow-lg scale-110' 
                    : 'bg-[var(--surface-secondary)] text-[var(--text-tertiary)] scale-100'
                  }
                `}
                animate={{
                  scale: index === currentTabIndex ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {index < currentTabIndex ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    ✓
                  </motion.span>
                ) : (
                  index + 1
                )}
              </motion.div>
              
              {/* Connection line - hidden on mobile if too cramped */}
              {index < tabs.length - 1 && (
                <motion.div 
                  className={`
                    w-8 sm:w-12 lg:w-16 h-0.5 mx-2 sm:mx-3 lg:mx-4
                    transition-all duration-500 ease-out
                    ${index < currentTabIndex 
                      ? 'bg-[var(--accent-primary)] opacity-100' 
                      : 'bg-[var(--border-primary)] opacity-50'
                    }
                  `}
                  animate={{
                    scaleX: index < currentTabIndex ? 1 : 0.7
                  }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Step labels - responsive */}
        <div className="flex justify-center sm:justify-between text-center">
          {tabs.map((tab, index) => (
            <motion.div 
              key={`${tab.id}-label`}
              className={`
                text-xs sm:text-sm lg:text-base font-medium
                transition-all duration-300
                ${index === currentTabIndex 
                  ? 'text-[var(--accent-primary)] scale-105' 
                  : index < currentTabIndex
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-tertiary)]'
                }
              `}
              animate={{
                y: index === currentTabIndex ? -2 : 0
              }}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">
                {tab.id === 'name' ? 'Nombre' : tab.id === 'email' ? 'Email' : 'Tel'}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Form content - responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mb-6 sm:mb-8 lg:mb-10"
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
                  className="space-y-4 sm:space-y-6 lg:space-y-8"
                >
                  {/* Input field with responsive sizing */}
                  <div className="relative">
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
                      className="text-base sm:text-lg" // Larger text on mobile for better UX
                    />
                  </div>
                </motion.div>
              </Tabs.Content>
            ))}
          </AnimatePresence>
        </Tabs.Root>
      </motion.div>

      {/* Navigation buttons - responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
      >
        {/* Previous button */}
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstTab}
          className={`
            w-full sm:w-auto order-2 sm:order-1
            min-h-[44px] sm:min-h-[40px] lg:min-h-[44px]
            text-sm sm:text-base
            ${isFirstTab ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
          `}
          size="sm"
        >
          <ArrowLeft size={16} className="mr-2" />
          <span className="hidden sm:inline">Anterior</span>
          <span className="sm:hidden">Atrás</span>
        </Button>

        {/* Next/Submit button */}
        <div className="w-full sm:w-auto order-1 sm:order-2">
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
              className="w-full sm:w-auto min-h-[44px] text-base sm:text-lg font-bold"
            />
          ) : (
            <Button 
              onClick={handleNext}
              className="
                w-full sm:w-auto 
                min-h-[44px] sm:min-h-[40px] lg:min-h-[44px]
                text-base sm:text-lg font-semibold
                bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)]
                hover:scale-105 active:scale-95
                transition-all duration-200
              "
              size="sm"
            >
              <span className="mr-2">Siguiente</span>
              <ArrowRight size={16} />
            </Button>
          )}
        </div>
      </motion.div>

      {/* Mobile helper text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="mt-4 sm:mt-6 text-center"
      >
        <p className="text-xs text-[var(--text-tertiary)] sm:hidden">
          Paso {currentTabIndex + 1} de {tabs.length}
        </p>
      </motion.div>
    </div>
  )
}
