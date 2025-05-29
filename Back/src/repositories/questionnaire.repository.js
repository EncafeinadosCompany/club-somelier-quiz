const { Question, Level } = require("../models");
const { Questionnaire } = require("../models/questionnaire.model");

class QuestionnairesRepository {
  async create(data) {
    return await Questionnaire.create(data);
  }

  async findById(id) {
    return await Questionnaire.findByPk(id, {
      include: [
        {
          model: Question,
          as: "questions",
          include: [
            {
              model: Level,
              as: "level",
              attributes: ["id", "name"]
            }
          ],
        },
      ],
    });
  }

  async findAll() {
    return await Questionnaire.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async update(id, data) {
    await Questionnaire.update(data, { where: { id } });
    return this.findById(id);
  }
}

module.exports = QuestionnairesRepository;
