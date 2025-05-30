import { Cuestion } from "./cuestion.type";

export interface PostEvent{
  name: string,
  start_time: string,
  questionnaire_id:number
  end_time: string
}


export interface Questionnaire {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventDetail {
  id: number;
  name: string;
  access_code: string;
  questionnaire_id: number;
  start_time: string;
  end_time: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  questionnaire?: Cuestion;
}


