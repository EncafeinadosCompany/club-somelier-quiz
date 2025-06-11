const registerAdminHandlers = require("./handlers/admin.handler");
const registerParticipantHandlers = require("./handlers/participant.handler");
const registerSharedHandlers = require("./handlers/shared.handler");

const liveEvents = require("../../services/live-event.service");

const AdminService = require("../../services/admin.service");
const EventService = require("../../services/event.service");
const AnswerService = require("../../services/answer.service");
const QuestionnairesService = require("../../services/questionnaires.service");

const adminService = new AdminService();
const eventService = new EventService();
const answerService = new AnswerService();
const questionnaireService = new QuestionnairesService();

function initializeWebSockets(io) {
  io.on("connection", (socket) => {
    console.log("🔌 Connect:", socket.id);

    const services = {
      liveEvents,
      adminService,
      answerService,
      eventService,
      questionnaireService,
    };

    registerAdminHandlers(socket, io, services);
    registerParticipantHandlers(socket, io, services);
    registerSharedHandlers(socket, services);

    socket.on("disconnect", () => {
      console.log("❌ Disconnect:", socket.id);
    });
  });
}

module.exports = { initializeWebSockets };
