

import { useEffect } from 'react';
import { socket } from '@/api/client/socket';

export function useEventSocket(accessCode?: string, participantId?: string | null) {
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
