const { Admin } = require("./admin.model");
const { Participant } = require("./participants.model");
const { Category } = require("./categories.model");
const { Level } = require("./level.model");

const { Questionnaire } = require("./questionnaire.model");
const { Question } = require("./question.model");
const { Event } = require("./event.model");
const { Answer } = require("./answers.model");

const { EventCategory } = require("./event-categories.model");
const { EventParticipant } = require("./event-participants.model");
const { EventQuestion } = require("./event-questions.model");
const { QuestionnaireQuestion } = require("./questionnaire-question.model");
const { QuestionCategory } = require("./question-category.model");

Admin.hasMany(Event, { foreignKey: "created_by" });
Event.belongsTo(Admin, { foreignKey: "created_by" });

Admin.hasMany(Questionnaire, { foreignKey: "created_by" });
Questionnaire.belongsTo(Admin, { foreignKey: "created_by" });
//-----------------------------------------------------------------------------------------
Questionnaire.hasMany(Event, { foreignKey: "questionnaire_id" });
Event.belongsTo(Questionnaire, { foreignKey: "questionnaire_id" });

QuestionnaireQuestion.belongsTo(Questionnaire, {
  foreignKey: "questionnaire_id",
});
QuestionnaireQuestion.belongsTo(Question, { foreignKey: "question_id" });

QuestionCategory.belongsTo(Question, { foreignKey: "question_id" });
QuestionCategory.belongsTo(Category, { foreignKey: "category_id" });

Questionnaire.hasMany(QuestionnaireQuestion, {
  foreignKey: "questionnaire_id",
});
Question.hasMany(QuestionnaireQuestion, { foreignKey: "question_id" });
//-----------------------------------------------------------------------------------------

Level.hasMany(Question, { foreignKey: "level_id" });
Question.belongsTo(Level, { foreignKey: "level_id" });

//-----------------------------------------------------------------------------------------

Question.hasMany(QuestionCategory, { foreignKey: "question_id" });
Category.hasMany(QuestionCategory, { foreignKey: "category_id" });

//-----------------------------------------------------------------------------------------
Event.hasMany(Answer, { foreignKey: "event_id" });
Answer.belongsTo(Event, { foreignKey: "event_id" });

Question.hasMany(Answer, { foreignKey: "question_id" });
Answer.belongsTo(Question, { foreignKey: "question_id" });

Participant.hasMany(Answer, { foreignKey: "participant_id" });
Answer.belongsTo(Participant, { foreignKey: "participant_id" });

// ----------------------------------------------------------------------------------------
Event.hasMany(EventCategory, { foreignKey: "event_id" });
Category.hasMany(EventCategory, { foreignKey: "category_id" });

EventCategory.belongsTo(Event, { foreignKey: "event_id" });
EventCategory.belongsTo(Category, { foreignKey: "category_id" });
// ----------------------------------------------------------------------------------------
Event.hasMany(EventParticipant, { foreignKey: "event_id" });
Participant.hasMany(EventParticipant, { foreignKey: "participant_id" });

EventParticipant.belongsTo(Event, { foreignKey: "event_id" });
EventParticipant.belongsTo(Participant, { foreignKey: "participant_id" });

Event.belongsToMany(Category, {
  through: EventCategory,
  foreignKey: "event_id",
  otherKey: "category_id",
  as: "categories",
});

Category.belongsToMany(Event, {
  through: EventCategory,
  foreignKey: "category_id",
  otherKey: "event_id",
  as: "events",
});

module.exports = {
  Admin,
  Participant,
  Category,
  Level,
  Questionnaire,
  Question,
  Event,
  Answer,
  QuestionCategory,
  QuestionnaireQuestion,
  EventCategory,
  EventParticipant,
  EventQuestion,
};
