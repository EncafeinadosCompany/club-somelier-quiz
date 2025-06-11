
function registerSharedHandlers(socket, services) {
    const { liveEvents } = services;

    socket.on("request_current_question", ({ accessCode }) => {
        const live = liveEvents.get(accessCode);

        if (
            live &&
            live.currentIdx >= 0 &&
            live.currentIdx < live.questions.length
        ) {
            const q = live.questions[live.currentIdx];
            socket.emit("show_question", {
                questionId: q.id,
                position: live.currentIdx + 1,
                total: live.questions.length,
                text: q.question,
            });
        }
    });

}

module.exports = registerSharedHandlers;