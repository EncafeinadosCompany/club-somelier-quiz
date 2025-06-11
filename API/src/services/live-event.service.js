const liveEvents = new Map(); // key: accessCode, value: { eventId, questions, currentIdx, questionStart }

const LiveEventService = {
  set(accessCode, data) {
    liveEvents.set(accessCode, data);
  },

  get(accessCode) {
    return liveEvents.get(accessCode);
  },

  getOrFail(accessCode) {
    const session = liveEvents.get(accessCode);
    if (!session) throw new Error("No active session");
    return session;
  },

  delete(accessCode) {
    liveEvents.delete(accessCode);
  },
  
  has(accessCode) {
    return liveEvents.has(accessCode);
  }
};

module.exports = LiveEventService
