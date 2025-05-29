const ParticipantRepository = require("../repositories/participants.repository");

class ParticipantService {
  constructor() {
    this.participantRepository = new ParticipantRepository();
  }

  async getAllParticipant() {
    return await this.participantRepository.getAll();
  }

  async getParticipantById(id) {
    return await this.participantRepository.getById(id);
  }

  async createParticipant(data) {
    const existingParticipant = await this.participantRepository.findByEmail(data.email);

    if (existingParticipant) {
      return existingParticipant;
    }

    return await this.participantRepository.create(data);
  }
}

module.exports = ParticipantService;
