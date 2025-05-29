import { Getcategories } from "./categories.type";

export interface PostCuestion {
    title: string;
    questions: Number[]
}


export interface GetCuestion {
    id:number;
    title: string;
    categorie:  {name:string}[];
    description: string;
}








