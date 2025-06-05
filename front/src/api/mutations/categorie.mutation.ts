import AuthClient from "@/api/client/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { PostCategorie, Getcategories } from "@/api/types/categories.type";
import toast from "react-hot-toast";

const authClient = new AuthClient();

export const useCreateCategorieMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<Getcategories, Error, PostCategorie>({
        mutationFn: async (categorieData): Promise<Getcategories> => {
            try {
                const response: AxiosResponse<Getcategories> = await authClient.post('/categories', categorieData);
                return response.data;
            } catch (error: any) {
                if (error?.response?.status === 409) {
                    const conflictError = new Error(error.response?.data?.message || 'Categoría duplicada');
                    (conflictError as any).statusCode = 409;
                    (conflictError as any).message = error.response?.data?.message || 'La categoría ya existe';
                    throw conflictError;
                }

                throw error;
            }
        },
        onSuccess: () => {
            const loadingToast = toast.loading('Creando categoría...', { id: "loading-create-category" });
            toast.success('¡Categoría creada con éxito!', { id: loadingToast });
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: (error: any) => {
            if (error?.statusCode !== 409) {
                toast.error(error.message || 'Error al crear la categoría');
            }
        }
    });
};

interface UpdateCategorieData {
    id: number;
    data: Partial<PostCategorie>;
}

export const useUpdateCategorieMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<Getcategories, Error, UpdateCategorieData>({
        mutationFn: async ({ id, data }): Promise<Getcategories> => {
            try {
                const response: AxiosResponse<Getcategories> = await authClient.put(`/categories/${id}`, data);
                return response.data;
            } catch (error: any) {
                throw error;
            }
        },
        onSuccess: (data) => {
            const loadingToast = toast.loading('Actualizando categoría...', { id: "loading-update-category" });
            toast.success('¡Categoría actualizada con éxito!', { id: loadingToast });

            if (data && data.id) {
                queryClient.invalidateQueries({ queryKey: ['category', data.id] });
            }
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Error al actualizar la categoría');
        }
    });
};

export const useDeleteCategorieMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: async (id: number): Promise<void> => {
            await authClient.delete(`/categories/${id}`);
        },
        onSuccess: () => {
            toast.success('Categoría eliminada con éxito');
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Error al eliminar la categoría');
        }
    });
};