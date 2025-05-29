import { useQuery } from "@tanstack/react-query";
import AuthClient from "@/api/client/axios";
import { Getquestions, question } from "../types/questions.type";
import { GetCuestion } from "../types/cuestion.type";


const authClient = new AuthClient();

export const useCuestionsQuery = () => {
  return useQuery<GetCuestion[], Error>({
    queryKey: ['Cuestions'],
    queryFn: async () => {
      try {
        const response = await authClient.get<GetCuestion[]>('/questionnaires');
        
        const questionData = response|| [];
        
        if (!Array.isArray(questionData)) {
          return [];
        }
        
        return questionData;
      } catch (error) {
        throw error; 
      }
    },
    refetchOnWindowFocus: true,
    retry: 1
  });
};

