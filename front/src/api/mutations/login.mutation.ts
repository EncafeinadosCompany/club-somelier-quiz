import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import AuthClient from '../client/axios'
import { LoginRequest, LoginResponse } from '../types/login.type'

const apiClient = new AuthClient()

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      try {
        const response = await apiClient.post<LoginResponse>(
          '/auth/login',
          credentials
        )
        return response
      } catch (error) {
        console.error('Error logging in:', error)
        throw error
      }
    },
    onSuccess: (data) => {
      // Guardar token y datos del usuario
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('admin', JSON.stringify(data.admin))
      
      console.log('Login exitoso:')
      
      // Redirigir a eventos
      navigate('/event')
    },
    onError: (error: Error) => {
      console.error('Error de login:', error.message)
    },
  })
}