const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const apiClient = {
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    const headers = new Headers({
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    })

    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return response.json()
  },

  get<T>(endpoint: string, token?: string) {
    return this.request<T>(endpoint, { method: "GET" }, token)
  },

  post<T>(endpoint: string, body: unknown, token?: string) {
    return this.request<T>(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
      token
    )
  },

  put<T>(endpoint: string, body: unknown, token?: string) {
    return this.request<T>(
      endpoint,
      {
        method: "PUT",
        body: JSON.stringify(body),
      },
      token
    )
  },

  delete<T>(endpoint: string, token?: string) {
    return this.request<T>(endpoint, { method: "DELETE" }, token)
  },
}
