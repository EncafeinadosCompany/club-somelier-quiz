

import { useEffect, useState } from 'react';
import { socket } from '@/api/client/socket';

export function useEventSocketParticipant(accessCode?: string, participantId?: string | null) {
    useEffect(() => {
        if (!accessCode || !participantId) return;

        if (!socket.connected) socket.connect();

        socket.emit('join_event', { accessCode, participantId });

        socket.on('joined_ok', () => {
            console.log('✅ join_event confirmado');
        });

        return () => {
            socket.off('joined_ok');
            socket.disconnect();
        };
    }, [accessCode, participantId]);

    return socket;
}

export function useEventSocketAdmin(accessCode: string) {
    const [eventStarted, setEventStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [noMoreQuestions, setNoMoreQuestions] = useState(false);
    const [eventEnded, setEventEnded] = useState(false);

    useEffect(() => {
        if (!accessCode) return;

        if (!socket.connected) socket.connect();

        // Solo configurar los listeners, NO ejecutar las acciones automáticamente
        socket.on('event_started', () => {
            console.log('✅ Event started');
            setEventStarted(true);
        });

        socket.on('show_question', (question) => {
            console.log('✅ Show question:', question);
            setCurrentQuestion(question);
        });

        socket.on('no_more_questions', () => {
            console.log('✅ No more questions');
            setNoMoreQuestions(true);
        });

        socket.on('event_results', (results) => {
            console.log('✅ Event results:', results);
            // Aquí podrías manejar los resultados finales
        });

        return () => {
            socket.off('event_started');
            socket.off('show_question');
            socket.off('no_more_questions');
            socket.off('event_results');
            socket.disconnect();
        };
    }, [accessCode]);

    // Funciones para ejecutar las acciones del admin
    const startEvent = () => {
        socket.emit('admin:start_event', { accessCode });
    };

    const nextQuestion = () => {
        socket.emit('admin:next_question', { accessCode });
    };

    const endEvent = () => {
        socket.emit('admin:end_event', { accessCode });
    };

    return {
        socket,
        eventStarted,
        currentQuestion,
        noMoreQuestions,
        eventEnded,
        startEvent,
        nextQuestion,
        endEvent
    };
}
