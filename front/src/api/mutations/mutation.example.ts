// import AuthClient from "@/api/client/axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { AxiosResponse } from "axios";
// import toast from "react-hot-toast";


// const authClient = new AuthClient();

// export const useCreateAlbumMutation = () => {
//     const queryClient = useQueryClient();
//     const useErrors = useError("createAlbum");

//     return useMutation<AlbumResponse, Error, CreateAlbumDto>({
//         mutationFn: async (albumData): Promise<AlbumResponse> => {
//             try {
//                 const response: AxiosResponse<AlbumResponse> = await authClient.post('/albums', cleanAlbumData);
//                 return response.data;

//             } catch (error: any) {
//                 if (error?.response?.status === 409 || error?.statusCode === 409) {
//                     const conflictError = new Error(error.response?.data?.message || 'Album conflict');
//                     (conflictError as any).statusCode = 409;
//                     (conflictError as any).status = 409;
//                     (conflictError as any).message = error.response?.data?.message || 'Album already exists';
//                     throw conflictError;
//                 }
                
//                 throw handleApiError(error);
//             }
//         },
//         onSuccess: () => {
//             const loadingToast = toast.loading('Creando álbum...', {id: "loading"});
//             toast.success('¡Álbum creado con éxito!', { id: loadingToast });
//             queryClient.invalidateQueries({ queryKey: ['albums'] });
//         },
//         onError: (error: any) => {
//             if (error?.statusCode !== 409 && error?.status !== 409) {
//                 toast.remove();
//                 useErrors(error);
//             }
//         }
//     });
// };