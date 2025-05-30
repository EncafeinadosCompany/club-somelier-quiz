import { useQuery } from "@tanstack/react-query";
import AuthClient from "@/api/client/axios";
import { Getquestions, question } from "../types/questions.type";
import { Cuestion, GetCuestion } from "../types/cuestion.type";


const authClient = new AuthClient();

export const useCuestionsQuery = () => {
  return useQuery<Cuestion[], Error>({
    queryKey: ['Cuestions'],
    queryFn: async (): Promise<Cuestion[]> => {
      try {
        const response = await authClient.get<GetCuestion>('/questionnaires');
        
        const questionData = response|| [];

        
        if (!Array.isArray(questionData.questionnaires)) {
          return [];
        }
      
        return questionData.questionnaires;
      } catch (error) {
        throw error; 
      }
    },
    refetchOnWindowFocus: true,
    retry: 1
  });
};



export const useCuestionsByIDQuery = () => {
  return useQuery<Cuestion[], Error>({
    queryKey: ['Cuestions'],
    queryFn: async (): Promise<Cuestion[]> => {
      try {
        const response = await authClient.get<GetCuestion>('/questionnaires');
        
        const questionData = response|| [];

        
        if (!Array.isArray(questionData.questionnaires)) {
          return [];
        }
      
        return questionData.questionnaires;
      } catch (error) {
        throw error; 
      }
    },
    refetchOnWindowFocus: true,
    retry: 1
  });
};

