import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from '@/components/ui/use-toast'

class ApiService {
  private api: AxiosInstance
  private static instance: ApiService

  private constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          localStorage.removeItem('token')
          window.location.href = '/login'
        } else if (error.response?.status === 403) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to perform this action",
            variant: "destructive"
          })
        } else {
          toast({
            title: "Error",
            description: error.response?.data?.message || "Something went wrong",
            variant: "destructive"
          })
        }
        return Promise.reject(error)
      }
    )
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.api.get<T>(url, { params })
    return response.data
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.post<T>(url, data)
    return response.data
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.put<T>(url, data)
    return response.data
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.api.delete<T>(url)
    return response.data
  }
}

export const api = ApiService.getInstance() 