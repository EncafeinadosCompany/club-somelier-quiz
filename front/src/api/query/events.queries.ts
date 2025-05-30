import { useQuery } from "@tanstack/react-query";
import AuthClient from "@/api/client/axios";
import { Event, EventDetail } from "../types/events.types";

const authClient = new AuthClient();

/**
 * Hook to fetch all events
 */
export const useEventsQuery = () => {
  return useQuery<EventDetail[], Error>({
    queryKey: ['events'],
    queryFn: async (): Promise<EventDetail[]> => {
      try {
        const response = await authClient.get<{ events: EventDetail[] }>('/events');
        
        // Check if response has events array
        if (!Array.isArray(response)) {
          return [];
        }
      
        return response;
      } catch (error) {
        throw error; 
      }
    },
    refetchOnWindowFocus: true,
    retry: 1
  });
};

/**
 * Hook to fetch a single event by ID
 * @param id The event ID to fetch
 */
export const useEventByIDQuery = (id: number | null) => {
  return useQuery<EventDetail, Error>({
    queryKey: ['event', id],
    queryFn: async (): Promise<EventDetail> => {
      try {
        if (!id) throw new Error('Event ID is required');
        
        const response = await authClient.get<EventDetail>(`/events/${id}`);
        
        // Return the response directly as it should be an EventDetail object
        return response;
      } catch (error) {
        throw error; 
      }
    },
    enabled: !!id, // Only run the query if an ID is provided
    refetchOnWindowFocus: true,
    retry: 1
  });
};