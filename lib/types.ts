
export interface User {
  id: string
  email: string
  name: string
  companyName?: string | null
  credits: number
  stripeCustomerId?: string | null
  isActive: boolean
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ApiClient {
  id: string
  userId: string
  apiKey: string
  apiKeyHash: string
  isActive: boolean
  lastUsedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface ApiUsageLog {
  id: string
  apiClientId: string
  endpoint: string
  requestId: string
  creditsUsed: number
  wasSuccessful: boolean
  wasDuplicate: boolean
  responseTime: number
  ipAddress?: string | null
  userAgent?: string | null
  errorMessage?: string | null
  createdAt: Date
}

export interface ApiTransaction {
  id: string
  apiClientId: string
  type: string
  amount: number
  creditsChanged: number
  balanceBefore: number
  balanceAfter: number
  stripePaymentId?: string | null
  description: string
  createdAt: Date
}

export interface VerificationCache {
  id: string
  searchHash: string
  userId: string
  resultData: any
  expiresAt: Date
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface VerificationResponse {
  success: boolean
  data?: any
  fromCache: boolean
  creditsUsed: number
  currentBalance?: number
  requestId: string
}

export interface RateLimitHeaders {
  'X-RateLimit-Limit': string
  'X-RateLimit-Remaining': string
  'X-RateLimit-Reset': string
  'Retry-After'?: string
}

// Dashboard Types
export interface UsageStats {
  totalRequests: number
  successfulRequests: number
  duplicateRequests: number
  totalCreditsUsed: number
  successRate: number
  duplicateRate: number
  averageResponseTime: number
}

export interface CooldownStatus {
  smartVerify: {
    cooldownSeconds: number
    remainingCooldown: number
  }
  exactVerify: {
    cooldownSeconds: number
    remainingCooldown: number
  }
}
