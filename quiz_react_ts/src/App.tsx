import React from 'react';
import { useState } from 'react';

import './App.scss';

import { fetchQuizQestions, Difficulty } from './API';

import QuestionCard  from './components/QuestionCard';

const App:React.VFC = () => {
  console.log("A")
  const TOTAL_QUESTIONS = 10;

  const [loading,setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question_State[]>([]);
  const [number,setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Answer_Object[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) =>{
    if(!gameOver){
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct)setScore(prev => prev + 1);
      const answerObject = {
        question:questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () =>  {
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === 10 ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ):null}
      {!gameOver ? <p className="score">Score:{score}</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          question={questions[number].question}
          answer={questions[number].answers}
          callback={checkAnswer}
          userAnswer={userAnswers ? userAnswers[number]:undefined}
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ?(
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
      ):null}
    </div>
  );
}

export default App;



