
const { Participant } = require('./participants.model');
const { Admin } = require("./admins.model");
const { Question } = require("./questions.model");
const { Category } = require("./categories.model");
const { Level } = require("./level.model");
const { Event } = require("./event.model");
const { QuestionnaireQuestion } = require("./questionnaire-question.model");
const { QuestionCategory } = require("./question-category.model");
const { Answer } = require('./answers.model');
const { EventCategory } = require('./event-categories.model');
const { EventParticipant } = require('./event-participants.model');
const { EventQuestion } = require('./event-questions.model');

Questionnaire.hasMany(Event, { foreignKey: "questionnaire_id" });
Event.belongsTo(Questionnaire, { foreignKey: "questionnaire_id" });


Admin.hasMany(Event, { foreignKey: "created_by" });
Event.belongsTo(Admin, { foreignKey: "created_by" });

Question.hasMany(QuestionCategory, { foreignKey: "question_id" });
Category.hasMany(QuestionCategory, { foreignKey: "category_id" });

QuestionCategory.belongsTo(Question, { foreignKey: "question_id" });
QuestionCategory.belongsTo(Category, { foreignKey: "category_id" });

Level.hasMany(Question, { foreignKey: "level_id" });
Question.belongsTo(Level, { foreignKey: "level_id" });

Questionnaire.hasMany(QuestionnaireQuestion, { foreignKey: "questionnaire_id" });
Question.hasMany(QuestionnaireQuestion, { foreignKey: "question_id" });

QuestionnaireQuestion.belongsTo(Questionnaire, { foreignKey: "questionnaire_id" });
QuestionnaireQuestion.belongsTo(Question, { foreignKey: "question_id" });

Admin.hasMany(Questionnaire, { foreignKey: "created_by" });
Questionnaire.belongsTo(Admin, { foreignKey: "created_by" });

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

// // Ejemplo de relaciones adicionales

// // 1:N: Rol -> Usuarios
// Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
// User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

// // 1:1: Usuario -> Perfil
// User.hasOne(Profile, { foreignKey: 'user_id', as: 'profile' });
// Profile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// // N:M: Estudiantes <-> Cursos
// Student.belongsToMany(Course, { through: 'student_course', foreignKey: 'student_id', otherKey: 'course_id', as: 'courses' });
// Course.belongsToMany(Student, { through: 'student_course', foreignKey: 'course_id', otherKey: 'student_id', as: 'students' });
