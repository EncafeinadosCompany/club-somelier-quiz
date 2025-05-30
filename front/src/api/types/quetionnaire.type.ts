
export interface QuestionnaireQuestion {
    id: number;
    question: string;
    response: boolean;
    position: number;
    levelName: string;
}

export interface GetQuestionnaire {
    id: number;
    title: string;
    description: string;
    categories: { name: string }[];
    questions: QuestionnaireQuestion[];
}

export interface ListQuestionnaires {
    id: number;
    title: string;
    description: string;
    categories: { name: string }[];
}

export interface PostQuestionnaire {
    title: string;
    description: string;
    categories: number[];
    questions: number[];
}