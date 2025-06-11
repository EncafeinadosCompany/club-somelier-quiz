
function registerSharedHandlers(socket, services) {
    const { questionService } = services;

    socket.on("request_current_question", ({ accessCode }) => {
        const question = questionService.getCurrentQuestion(accessCode);
        if (!question) return;
        socket.emit("show_question", question);
    });
}

module.exports = registerSharedHandlers;