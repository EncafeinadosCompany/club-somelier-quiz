// import { useQuery } from "@tanstack/react-query";
// import AuthClient from "@/api/client/axios";
// import { AlbumResponse, AlbumsListResponse } from "@/api/types/album/album.types";
// import { AlbumPageResponse } from "@/api/types/album/page.types";

// const authClient = new AuthClient();

// export const useAlbumsQuery = () => {
//   return useQuery<AlbumResponse[], Error>({
//     queryKey: ['albums'],
//     queryFn: async () => {
//       try {
//         const response = await authClient.get<AlbumsListResponse>('/albums');
        
//         const albumsData = response.albums || [];
        
//         if (!Array.isArray(albumsData)) {
//           return [];
//         }
        
//         return albumsData;
//       } catch (error) {
//         throw error; 
//       }
//     },
//     refetchOnWindowFocus: true,
//     retry: 1
//   });
// };

