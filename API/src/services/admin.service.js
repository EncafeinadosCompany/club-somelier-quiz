const bcrypt = require('bcrypt');

const AdminRepository = require('../repositories/admin.repository');
const EventRepo = require('../repositories/event.repository');
const AnswerRepo = require('../repositories/answer.repository');
const QuestionnaireRepo = require('../repositories/questionnaire.repository');

const LiveEventService = require('./live-event.service')

class AdminService {
  constructor() {
    this.adminRepository = new AdminRepository();
    this.eventRepo = new EventRepo();
    this.answerRepo = new AnswerRepo();
    this.questionnaireRepo = new QuestionnaireRepo();
    this.liveEvents = LiveEventService;
  }

  // async createAdmin(data) {
  //   const existingAdmin = await this.adminRepository.findByEmail(data.email);
  //   if (existingAdmin) return new Error('Admin with this email already exists');

  //   const hashedPassword = await bcrypt.hash(data.password, 10);
  //   const adminData = {
  //     ...data,
  //     password: hashedPassword
  //   };

  //   const newAdmin = await this.adminRepository.create(adminData);

  //   const { password, ...adminWithoutPassword } = newAdmin.toJSON();
  //   return adminWithoutPassword;
  // }

  async getAdminById(id) {
    return await this.adminRepository.getById(id);
  }

  async startEvent(accessCode) {
    if (this.liveEvents.has(accessCode)) throw new Error("Event is already live");

    const event = await this.eventRepo.getByCode(accessCode);
    await this.eventRepo.update(event.id, { status: 'live' });
    
    const qn = await this.questionnaireRepo.findById(event.questionnaire_id);

    const questions = qn.questions
      .sort((a, b) => a.questionnaire_questions.position - b.questionnaire_questions.position)
      .map(q => q);

    this.liveEvents.set(accessCode, {
      eventId: event.id,
      questions,
      currentIdx: -1,
      questionStart: null,
    });

    return questions.length;
  }

  nextQuestion(accessCode) {
    const live = this.liveEvents.getOrFail(accessCode);

    live.currentIdx += 1;
    if (live.currentIdx >= live.questions.length) return { done: true };

    live.questionStart = Date.now();
    const question = live.questions[live.currentIdx];

    return {
      done: false,
      question: {
        questionId: question.id,
        position: live.currentIdx + 1,
        total: live.questions.length,
        text: question.question,
      },
    };

  }

  async endEvent(accessCode) {
    const live = this.liveEvents.getOrFail(accessCode);

    await this.eventRepo.update(live.eventId, { status: 'closed' });
    const scores = await this.answerRepo.getScoresByEvent(live.eventId);

    this.liveEvents.delete(accessCode);

    return scores;
  }


}

module.exports = AdminService;