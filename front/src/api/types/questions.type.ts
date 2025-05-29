
import { Getcategories } from "./categories.type"

export interface Getquestion {
questions: 
    {
        id: number
        question: string,
        response: boolean,
        level: string,
        categories: Getcategories[]
    }[]
}


export interface Postquestion {
    question: string;
    response: boolean;
    level_id: number;
    categories: number[];
}