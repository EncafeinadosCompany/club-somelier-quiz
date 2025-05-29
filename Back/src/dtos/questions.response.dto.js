class QuestionsResponseDto {
    constructor(question) {
        this.id = question.id;
        this.question = question.question;
        this.response = question.response;
        this.level = question?.level?.name || null;
    }
}

class ListQuestionsResponseDto {
    constructor(questions) {
        this.questions = questions.map(question => new QuestionsResponseDto(question));
    }
}
module.exports = { QuestionsResponseDto, ListQuestionsResponseDto };
