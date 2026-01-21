import { apiClient } from "..//config/api"

export const contactService = {
  async submitContact(data: { name: string; email: string; subject: string; message: string }) {
    return apiClient.post("/contact", data)
  },
}
