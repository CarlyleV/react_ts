import React from 'react'
import './index.scss'

const QuestionCard: React.VFC<QuestionCard_Props_Interface> = (props) =>{
    console.log(props);
    const { question,
            answer,
            callback,
            userAnswer,
            questionNr,
            totalQuestions} = props;

    const answers = answer.map((_answer:string,_index:number)=>{
        return(
                <div key={`answers${_index}`}  className='answers'>
                    <button disabled={!!userAnswer} value={_answer} onClick={callback}>
                        {_answer}
                    </button>
                </div>
        )})

    return (
        <div className='QuestionCard'>
            <p className="number">
                Question:{questionNr} / {totalQuestions}
            </p>
            <p>{question}</p>
            <div>
                {answers}
            </div>
        </div>
    )
}

export default QuestionCard;
