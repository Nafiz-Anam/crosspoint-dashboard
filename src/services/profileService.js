import apiClient, { createApiClient } from './apiClient'

class ProfileService {
  constructor() {
    this.endpoint = '/profile'
  }

  // Get API client with optional token
  getApiClient(token = null) {
    if (token) {
      return createApiClient(token)
    }
    return apiClient
  }

  async getMyProfile(token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.get(this.endpoint)
      return response.data
    } catch (error) {
      console.error('Get profile error:', error)
      throw error
    }
  }

  async updateMyProfile(profileData, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.patch(this.endpoint, profileData)
      return response.data
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }

  async changePassword(passwordData, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.patch(`${this.endpoint}/change-password`, passwordData)
      return response.data
    } catch (error) {
      console.error('Change password error:', error)
      throw error
    }
  }
}

export const profileService = new ProfileService()

export default profileService
