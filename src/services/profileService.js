class ProfileService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL
  }

  async getMyProfile(token = null) {
    try {
      const response = await fetch(`${this.baseURL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile')
      }

      return data
    } catch (error) {
      console.error('Get profile error:', error)
      throw error
    }
  }

  async updateMyProfile(profileData, token = null) {
    try {
      const response = await fetch(`${this.baseURL}/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile')
      }

      return data
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }

  async changePassword(passwordData, token = null) {
    try {
      const response = await fetch(`${this.baseURL}/profile/change-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(passwordData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password')
      }

      return data
    } catch (error) {
      console.error('Change password error:', error)
      throw error
    }
  }
}

export const profileService = new ProfileService()
