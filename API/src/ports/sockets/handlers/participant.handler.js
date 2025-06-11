function participantHandler(socket, io, services) {

    const { answerService } = services;

    /* ========== JOIN EVENT ========== */
    socket.on("join_event", async ({ accessCode, participantId }) => {
        socket.join(accessCode);
        socket.data = { accessCode, participantId };
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

            socket.emit("answer_ack", { 
                is_correct: response.is_correct, 
                score: response.score,
                totalScore: response.totalScore  
            });
        } catch (error) {
            console.error("Error:", error.message);
            socket.emit("error", "There was a problem processing your answer");
        }
    });

}

module.exports = participantHandler;