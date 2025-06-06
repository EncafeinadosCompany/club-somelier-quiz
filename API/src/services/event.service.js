const EventRepository = require('../repositories/event.repository');

class EventService {
  constructor() {
    this.eventRepository = new EventRepository();
  }

  async getAllEvents() {
    return await this.eventRepository.getAll();
  }

  async getAllEventsByStatus(event){
    const validStatuses = ['draft', 'closed', 'live'];
    if(!validStatuses.includes(event)){
      const error = new Error('Status is not already exists.')
      error.status=404
      throw error
    }

    return await this.eventRepository.getEventByStatus(event)
  }

  async getEventById(id) {
    return await this.eventRepository.getById(id);
  }

  async getEventByCode(code) {
    return await this.eventRepository.getByCode(code);
  }

  async createEvent(data) {
    // Generate a random access code for the event
    const accessCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    data.access_code = accessCode;

    return await this.eventRepository.create(data);
  }

  async updateEvent(id, data) {
    return await this.eventRepository.update(id, data);
  }

  async deleteEvent(id) {
    return await this.eventRepository.delete(id);
  }
}

module.exports = EventService;
