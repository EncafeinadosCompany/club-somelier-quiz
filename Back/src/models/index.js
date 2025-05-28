
const { Admin } = require("./admin.model");
const { Participant } = require('./participants.model');
const { Category } = require("./categories.model");
const { Level } = require("./level.model");

const { Questionnaire } = require("./questionnaire.model");
const { Question } = require("./question.model");
const { Event } = require("./event.model");
const { Answer } = require('./answers.model');

const { EventCategory } = require('./event-categories.model');
const { EventParticipant } = require('./event-participants.model');
const { EventQuestion } = require('./event-questions.model');
const { QuestionnaireQuestion } = require("./questionnaire-question.model");
const { QuestionCategory } = require("./question-category.model");

Admin.hasMany(Event, { foreignKey: "created_by" });
Event.belongsTo(Admin, { foreignKey: "created_by" });

Admin.hasMany(Questionnaire, { foreignKey: "created_by" });
Questionnaire.belongsTo(Admin, { foreignKey: "created_by" });

Event.hasMany(Answer, { foreignKey: "event_id" });
Answer.belongsTo(Event, { foreignKey: "event_id" });

Questionnaire.hasMany(Event, { foreignKey: "questionnaire_id" });
Event.belongsTo(Questionnaire, { foreignKey: "questionnaire_id" });

Level.hasMany(Question, { foreignKey: "level_id" });
Question.belongsTo(Level, { foreignKey: "level_id" });

Question.hasMany(Answer, { foreignKey: "question_id" });
Answer.belongsTo(Question, { foreignKey: "question_id" });

Participant.hasMany(Answer, { foreignKey: "participant_id" });
Answer.belongsTo(Participant, { foreignKey: "participant_id" });


//-----------------------------------------------------------------------------------------

Questionnaire.belongsToMany(Question, {
    through: QuestionnaireQuestion,
    foreignKey: 'questionnaire_id',
    otherKey: 'question_id',
    as: 'questions',
});

Question.belongsToMany(Questionnaire, {
    through: QuestionnaireQuestion,
    foreignKey: 'question_id',
    otherKey: 'questionnaire_id',
    as: 'questionnaires',
});


Question.belongsToMany(Category, {
    through: QuestionCategory,
    foreignKey: 'question_id',
    otherKey: 'category_id',
    as: 'categories',
});

Category.belongsToMany(Question, {
    through: QuestionCategory,
    foreignKey: 'category_id',
    otherKey: 'question_id',
    as: 'questions',
});


Event.belongsToMany(Category, {
    through: EventCategory,
    foreignKey: 'event_id',
    otherKey: 'category_id',
    as: 'categories',
});

Category.belongsToMany(Event, {
    through: EventCategory,
    foreignKey: 'category_id',
    otherKey: 'event_id',
    as: 'events',
});

Event.belongsToMany(Participant, {
    through: EventParticipant,
    foreignKey: 'event_id',
    otherKey: 'participant_id',
    as: 'participants',
});

Participant.belongsToMany(Event, {
    through: EventParticipant,
    foreignKey: 'participant_id',
    otherKey: 'event_id',
    as: 'events',
});

Event.belongsToMany(Question, {
    through: EventQuestion,
    foreignKey: 'event_id',
    otherKey: 'question_id',
    as: 'liveQuestions',
});
Question.belongsToMany(Event, {
    through: EventQuestion,
    foreignKey: 'question_id',
    otherKey: 'event_id',
    as: 'eventsRunningThis',
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
    EventQuestion
};
