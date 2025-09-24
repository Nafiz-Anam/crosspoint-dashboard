import BaseService from '../services/BaseService'

class ClientService extends BaseService {
  constructor() {
    super('/clients')
  }

  // Get all clients with filters (maintains backward compatibility)
  async getClients(token = null, params = {}) {
    return this.getAll(params, token)
  }

  // Get single client by ID (maintains backward compatibility)
  async getClientById(id, token = null) {
    return this.getById(id, token)
  }

  // Create new client (maintains backward compatibility)
  async createClient(clientData, token = null) {
    return this.create(clientData, token)
  }

  // Update client (maintains backward compatibility)
  async updateClient(id, clientData, token = null) {
    return this.update(id, clientData, token)
  }

  // Delete client (maintains backward compatibility)
  async deleteClient(id, token = null) {
    return this.delete(id, token)
  }
}

export default new ClientService()
