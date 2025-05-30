import { participantSocket, adminSocket } from "@/api/client/socket";
import { useEffect, useState } from "react";

export function useEventSocketParticipant(accessCode?: string, participantId?: string | null) {
    useEffect(() => {
        if (!accessCode || !participantId) return;

        if (!participantSocket.connected) participantSocket.connect();

        participantSocket.emit('join_event', { accessCode, participantId });

        participantSocket.on('joined_ok', () => {
            console.log('✅ join_event confirmado');
        });

        return () => {
            participantSocket.off('joined_ok');
            participantSocket.disconnect();
        };
    }, [accessCode, participantId]);

    return participantSocket;
}

export function useEventSocketAdmin(accessCode: string) {
    const [eventStarted, setEventStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [noMoreQuestions, setNoMoreQuestions] = useState(false);
    const [eventEnded, setEventEnded] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!accessCode) return;

        console.log('Admin Socket:', adminSocket);

        if (!adminSocket.connected) adminSocket.connect();

        adminSocket.on('connect', () => {
            console.log('🔗 Admin socket conectado:', adminSocket.id);
            setIsConnected(true); 
            adminSocket.emit('admin:join', { accessCode });
        });

        adminSocket.on('disconnect', () => {
            console.log('❌ Admin socket desconectado');
            setIsConnected(false);
        });

        adminSocket.on('connect_error', (error) => {
            console.error('❌ Error conexión admin:', error);
            setIsConnected(false); 
        });

        adminSocket.on('admin:joined_ok', () => {
            console.log('✅ Admin join confirmado');
        });

        adminSocket.on('event_started', () => {
            console.log('✅ Event started');
            setEventStarted(true);
        });

        adminSocket.on('show_question', (question) => {
            console.log('✅ Show question:', question);
            setCurrentQuestion(question);
        });

        adminSocket.on('no_more_questions', () => {
            console.log('✅ No more questions');
            setNoMoreQuestions(true);
        });

        adminSocket.on('event_results', (results) => {
            console.log('✅ Event results:', results);
        });

        if (adminSocket.connected) {
            setIsConnected(true);
            adminSocket.emit('admin:join', { accessCode });
        }

        return () => {
            adminSocket.off('connect');
            adminSocket.off('disconnect');
            adminSocket.off('connect_error');
            adminSocket.off('admin:joined_ok');
            adminSocket.off('event_started');
            adminSocket.off('show_question');
            adminSocket.off('no_more_questions');
            adminSocket.off('event_results');
            adminSocket.disconnect();
        };
    }, [accessCode]);

    const startEvent = () => {
        console.log('🚀 Starting event:', accessCode);
        if (adminSocket.connected) {
            adminSocket.emit('admin:start_event', { accessCode });
        } else {
            console.warn('⚠️ Admin socket no conectado');
        }
    };

    const nextQuestion = () => {
        if (adminSocket.connected) {
            adminSocket.emit('admin:next_question', { accessCode });
        }
    };

    const endEvent = () => {
        if (adminSocket.connected) {
            adminSocket.emit('admin:end_event', { accessCode });
        }
    };

    return {
        socket: adminSocket,
        isConnected,
        eventStarted,
        currentQuestion,
        noMoreQuestions,
        eventEnded,
        startEvent,
        nextQuestion,
        endEvent
    };
}