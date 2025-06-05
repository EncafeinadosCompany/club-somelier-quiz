import AuthClient from "@/api/client/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { PostEvent, EventDetail } from "@/api/types/events.types";
import toast from "react-hot-toast";

const authClient = new AuthClient();

export const useCreateEventMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<EventDetail, Error, PostEvent>({
        mutationFn: async (eventData): Promise<EventDetail> => {
            try {
                const response: AxiosResponse<EventDetail> = await authClient.post('/events', eventData);
                return response.data;
            } catch (error: any) {
                if (error?.response?.status === 409) {
                    const conflictError = new Error(error.response?.data?.message || 'Event conflict');
                    (conflictError as any).statusCode = 409;
                    (conflictError as any).message = error.response?.data?.message || 'Event already exists';
                    throw conflictError;
                }

                throw error;
            }
        },
        onSuccess: () => {
            const loadingToast = toast.loading('Creando evento...', { id: "loading-create" });
            toast.success('¡Evento creado con éxito!', { id: loadingToast });
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
        onError: (error: any) => {
            if (error?.statusCode !== 409) {
                toast.error(error.message || 'Error al crear el evento');
            }
        }
    });
};


interface UpdateEventData {
    id: number;
    data: Partial<PostEvent>;
}


export const useUpdateEventMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<EventDetail, Error, UpdateEventData>({
        mutationFn: async ({ id, data }): Promise<EventDetail> => {
            try {
                const response: AxiosResponse<EventDetail> = await authClient.put(`/events/${id}`, data);
                return response.data;
            } catch (error: any) {
                throw error;
            }
        },
        onSuccess: (data) => {
            const loadingToast = toast.loading('Actualizando evento...', { id: "loading-update" });
            toast.success('¡Evento actualizado con éxito!', { id: loadingToast });

            if (data && data.id) {
                queryClient.invalidateQueries({ queryKey: ['event', data.id] });
            } else {
                queryClient.invalidateQueries({ queryKey: ['events'] });
            }
        },
        onError: (error: any) => {
            toast.error(error.message || 'Error al actualizar el evento');
        }
    });
};