import { shuffleArray } from "./utils";


// export enum Difficulty {
//     EASY = "easy",
//     MEDIUM = "medium",
//     HARD = "hard",
// }

export const Difficulty = {
    EASY : "easy",
    MEDIUM : "medium",
    HARD : "hard",
} as const;

type Difficulty_Type = typeof Difficulty[keyof typeof Difficulty];

export const fetchQuizQestions = async (amount:number, difficulty:Difficulty_Type) => {
    const  endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();

    return data.results.map((quesiton:Question_Interface)=>(
        {
            ...quesiton,
            answers:shuffleArray([
                ...quesiton.incorrect_answers,
                quesiton.correct_answer
            ])
        }
    ))
}