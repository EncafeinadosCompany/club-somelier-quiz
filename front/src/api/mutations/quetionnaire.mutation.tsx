
// import AuthClient from "@/api/client/axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { AxiosResponse } from "axios";
// import toast from "react-hot-toast";
// import { PostQuestionnaire } from "../types/quetionnaire.type";
// const authClient = new AuthClient();

// /**
//  * Mutation hook for creating a new questionnaire
//  */
// export const useCreateQuestionnaireMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation<QuestionnaireDetail, Error, PostQuestionnaire>({
//         mutationFn: async (questionnaireData): Promise<QuestionnaireDetail> => {
//             try {
//                 const response: AxiosResponse<QuestionnaireDetail> = await authClient.post('/questionnaires', questionnaireData);
//                 return response.data;
//             } catch (error: any) {
//                 if (error?.response?.status === 409) {
//                     const conflictError = new Error(error.response?.data?.message || 'Questionnaire conflict');
//                     (conflictError as any).statusCode = 409;
//                     (conflictError as any).message = error.response?.data?.message || 'Questionnaire already exists';
//                     throw conflictError;
//                 }

//                 throw error;
//             }
//         },
//         onSuccess: () => {
//             const loadingToast = toast.loading('Creando cuestionario...', { id: "loading-create-questionnaire" });
//             toast.success('¡Cuestionario creado con éxito!', { id: loadingToast });
//             queryClient.invalidateQueries({ queryKey: ['questionnaires'] });
//         },
//         onError: (error: any) => {
//             if (error?.statusCode !== 409) {
//                 toast.error(error.message || 'Error al crear el cuestionario');
//             }
//         }
//     });
// };

// /**
//  * Interface for update questionnaire data with ID
//  */
// interface UpdateQuestionnaireData {
//     id: number;
//     data: Partial<PostQuestionnaire>;
// }

// /**
//  * Mutation hook for updating an existing questionnaire
//  */
// export const useUpdateQuestionnaireMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation<QuestionnaireDetail, Error, UpdateQuestionnaireData>({
//         mutationFn: async ({ id, data }): Promise<QuestionnaireDetail> => {
//             try {
//                 const response: AxiosResponse<QuestionnaireDetail> = await authClient.put(`/questionnaires/${id}`, data);
//                 return response.data;
//             } catch (error: any) {
//                 throw error;
//             }
//         },
//         onSuccess: (data) => {
//             const loadingToast = toast.loading('Actualizando cuestionario...', { id: "loading-update-questionnaire" });
//             toast.success('¡Cuestionario actualizado con éxito!', { id: loadingToast });

//             // Invalidate both the list and the specific questionnaire
//             if (data && data.id) {
//                 queryClient.invalidateQueries({ queryKey: ['questionnaire', data.id] });
//             }
            
//             // Always invalidate the questionnaires list
//             queryClient.invalidateQueries({ queryKey: ['questionnaires'] });
//         },
//         onError: (error: any) => {
//             toast.error(error.message || 'Error al actualizar el cuestionario');
//         }
//     });
// };