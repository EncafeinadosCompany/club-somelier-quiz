import { participantSocket, adminSocket } from "@/api/client/socket";
import { useEffect, useState } from "react";

export function useEventSocketParticipant(
    accessCode?: string,
    participantId?: string | null
) {
    const [eventStarted, setEventStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [answerAck, setAnswerAck] = useState<{ is_correct: boolean; score: number } | null>(null);
    const [noMoreQuestions, setNoMore] = useState(false);
    const [eventEnded, setEventEnded] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        if (!accessCode || !participantId) return;

        if (!participantSocket.connected) participantSocket.connect();
        participantSocket.emit("join_event", { accessCode, participantId });        /* listeners ------------ */        const onJoined = (data: any) => {
            console.log('🔗 Joined event:', data);
            setIsConnected(true);
            setIsInitializing(false);
            
            // Si al unirse ya hay información del estado actual
            if (data.eventStarted) {
                setEventStarted(true);
            }
            if (data.currentQuestion) {
                setCurrentQuestion(data.currentQuestion);
            }
            if (data.eventEnded) {
                setEventEnded(true);
            }
            
            // Solicitar estado actual por si acaso
            setTimeout(() => {
                if (participantSocket.connected) {
                    participantSocket.emit('request_current_state', { accessCode, participantId });
                }
            }, 500);
        };
        
        const onStarted = () => {
            console.log('🚀 Event started');
            setEventStarted(true);
        };
        
        const onShow = (q: any) => {
            console.log('📋 New question:', q);
            setCurrentQuestion(q);
            setAnswerAck(null);           // limpiamos feedback anterior
        };
        
        const onNoMore = () => {
            console.log('🏁 No more questions');
            setNoMore(true);
        };
        
        const onResults = (scores: any[]) => {
            console.log("🥇 Resultados:", scores);
            setResults(scores);
            setEventEnded(true);
        };

        const onAck = (payload: any) => {
            console.log('✅ Answer acknowledged:', payload);
            setAnswerAck(payload);
        };

        const onError = (error: any) => {
            console.error('❌ Socket error:', error);
            setIsInitializing(false);
        };

        const onConnect = () => {
            console.log('🔗 Participant socket connected');
            setIsConnected(true);
        };        const onDisconnect = () => {
            console.log('❌ Participant socket disconnected');
            setIsConnected(false);
        };

        const onCurrentState = (state: any) => {
            console.log('📊 Current event state:', state);
            if (state.eventStarted !== undefined) {
                setEventStarted(state.eventStarted);
            }
            if (state.currentQuestion) {
                setCurrentQuestion(state.currentQuestion);
            }
            if (state.eventEnded !== undefined) {
                setEventEnded(state.eventEnded);
            }
            if (state.noMoreQuestions !== undefined) {
                setNoMore(state.noMoreQuestions);
            }
        };participantSocket.on('connect', onConnect);
        participantSocket.on('disconnect', onDisconnect);
        participantSocket.on('joined_ok', onJoined);
        participantSocket.on('event_started', onStarted);
        participantSocket.on('show_question', onShow);
        participantSocket.on("no_more_questions", onNoMore);
        participantSocket.on("event_results", onResults);
        participantSocket.on('answer_ack', onAck);
        participantSocket.on('error', onError);

        return () => {
            participantSocket.off('connect', onConnect);
            participantSocket.off('disconnect', onDisconnect);
            participantSocket.off('joined_ok', onJoined);
            participantSocket.off('event_started', onStarted);
            participantSocket.off('show_question', onShow);
            participantSocket.off('no_more_questions', onNoMore);
            participantSocket.off('event_results', onResults);
            participantSocket.off('answer_ack', onAck);
            participantSocket.off('error', onError);
        };

    }, [accessCode, participantId]);    /* -------- API que exponemos -------- */
    const submitAnswer = (questionId: number, answer: boolean) => {
        participantSocket.emit('submit_answer', { questionId, answer });
    };

    const requestCurrentState = () => {
        if (participantSocket.connected) {
            participantSocket.emit('request_current_state', { accessCode, participantId });
        }
    };    return {
        socket: participantSocket,
        eventStarted,
        currentQuestion,
        answerAck,
        noMoreQuestions,
        eventEnded,
        results,
        isConnected,
        isInitializing,
        submitAnswer,
        requestCurrentState
    };
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