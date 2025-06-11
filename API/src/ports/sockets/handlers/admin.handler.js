function registerAdminHandlers(socket, io, services) {
    const { liveEvents, adminService } = services;

    /* ========== JOIN EVENT (Admin) ========== */
    socket.on("admin:join", async ({ accessCode }) => {
        socket.join(accessCode);
        socket.data = { accessCode, role: "admin" };
        socket.emit("admin:joined_ok");
    });

    /* ========== ADMIN: START EVENT ========== */
    socket.on("admin:start_event", async ({ accessCode }) => {
        const totalQuestions = await adminService.startEvent(accessCode, liveEvents);
        io.to(accessCode).emit("event_started", { totalQuestions });
    });

    /* ========== ADMIN: NEXT QUESTION ========== */
    socket.on("admin:next_question", ({ accessCode }) => {

        if (!liveEvents.has(accessCode)) return socket.emit("error", "Session not started");

        try {
            const result = adminService.nextQuestion(accessCode);

            result.done
                ? io.to(accessCode).emit("no_more_questions")
                : io.to(accessCode).emit("show_question", result.question);

        } catch (err) {
            socket.emit("error", err.message);
        }
    });

    /* ========== ADMIN: END EVENT ========== */
    socket.on("admin:end_event", async ({ accessCode }) => {
        try {
            const scores = await adminService.endEvent(accessCode);
            if (!scores) return;

            io.to(accessCode).emit("event_results", scores);
            socket.emit("event_ended");
        } catch (err) {
            console.error("Error ending event:", err);
            socket.emit("error", "Failed to end event");
        }
    });

};

module.exports = registerAdminHandlers;