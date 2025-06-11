
function participantHandler(socket, io, services) {

    const { liveEvents, answerService } = services;

    /* ========== JOIN EVENT ========== */
    socket.on("join_event", async ({ accessCode, participantId }) => {
        socket.join(accessCode);
        socket.data = { accessCode, participantId };
        console.log(`${socket.id} joined ${accessCode}`);
        socket.emit("joined_ok");
    });

    /* ========== SUBMIT ANSWER ========== */
    socket.on("submit_answer", async ({ questionId, answer }) => {
        try {
            const { accessCode, participantId } = socket.data;
            const response = await answerService.submitAnswer({
                accessCode,
                participantId,
                questionId,
                answer,
            });

            socket.emit("answer_ack", { is_correct, score } = response);
        } catch (error) {
            console.error("Error:", error.message);
            socket.emit("error", "There was a problem processing your answer");
        }
    });

    /* ========== REQUEST ALL PREVIOUS QUESTIONS ========== */
    socket.on("request_previous_questions", ({ accessCode }) => {
        const live = liveEvents.get(accessCode);
        if (!live) return;

        if (live.currentIdx >= 0) {
            const previousQuestions = [];

            for (let i = 0; i <= live.currentIdx; i++) {
                const q = live.questions[i];
                previousQuestions.push({
                    questionId: q.id,
                    position: i + 1,
                    total: live.questions.length,
                    text: q.question,
                });
            }

            socket.emit("previous_questions", {
                questions: previousQuestions,
                currentIndex: live.currentIdx,
            });
        }
    });
}

module.exports = participantHandler;