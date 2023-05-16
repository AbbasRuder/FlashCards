import { useState, useEffect, useRef } from "react"
export default function FlashCard({flashcard}) {
    const[flip, setFlip] = useState(false)
    const[height, setHeight] = useState('initial')

    const frontRef = useRef();
    const backRef = useRef();

    function setMaxHeight() {
        const frontHeight = frontRef.current.getBoundingClientRect().height;
        const backHeight = backRef.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(
        setMaxHeight,
        [flashcard.answer, flashcard.question, flashcard.options]
    )

    useEffect(() => {
        // everytime the page resizes, setMaxHeight is called.
        window.addEventListener('resize', setMaxHeight);
        return () => removeEventListener('resize', setMaxHeight)
    }, [])

    return (
        <>
            {/* CARD */}
           <div className = {`card ${flip ? 'flip' : ''}`} onClick={() => {setFlip(!flip)}}
                style={{height: height}}>
                {/* Front card */}
                <div className="front" ref={frontRef}>
                    {flashcard.question}
                    <div className="flashcard-options">
                        {flashcard.options.map(option => {
                            return <div className="flashcard-option" key={option}>{option}</div>
                        })}
                    </div>
                </div>
                {/* Back card */}
                <div className="back" ref={backRef}>
                    Answer:- {flashcard.answer}
                </div>
            </div>
        </>
    )
}