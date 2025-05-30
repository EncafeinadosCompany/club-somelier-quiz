
export interface PostCuestion {
    title: string;
    questions: Number[]
}


export interface GetCuestion {
    questionnaires: Cuestion[]
   
}



export interface Cuestion {
     id:number;
    title: string;
    categories:  {name:string}[];
    description: string;
}










