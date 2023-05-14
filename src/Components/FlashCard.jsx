import { useState } from "react"
export default function FlashCard({flashcard}) {
    const[flip, setFlip] = useState(false)

  
    return (
        <>
            {/* CARD */}
           <div className = {`card ${flip ? 'flip' : ''}`} onClick={() => {setFlip(!flip)}}>
                {/* Front card */}
                <div className="front">
                    {flashcard.question}
                    <div className="flashcard-options">
                        {flashcard.options.map(option => {
                            return <div className="flashcard-option" key={option}>{option}</div>
                        })}
                    </div>
                </div>
                {/* Back card */}
                <div className="back">
                    Answer:- {flashcard.answer}
                </div>
            </div>
        </>
    )
}