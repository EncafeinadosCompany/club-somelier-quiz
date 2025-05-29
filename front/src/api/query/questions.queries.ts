import { useQuery } from "@tanstack/react-query";
import AuthClient from "@/api/client/axios";
import { Getquestions, question } from "../types/questions.type";


const authClient = new AuthClient();

export const useQuestionsQuery = () => {
  return useQuery<question[], Error>({
    queryKey: ['questions'],
    queryFn: async () => {
      try {
        const response = await authClient.get<Getquestions>('/questions');
        
        const questionData = response.questions|| [];
        
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

