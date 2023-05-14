import { useState } from 'react'
import './App.css'
import FlashCardList from './Components/FlashCardList'

function App() {
  const[flashCards, setFlashCards] = useState(questionAndAnswers)

  return (
    <>
      <FlashCardList flashcards = {flashCards} />
    </>
  )
}

const questionAndAnswers = [
  {
    id: 1,
    question: "What is 2 + 2 ?",
    answer: "4",
    options: [
    '1',
    '2',
    '3',
    '4'
    ]
  },

  {
    id: 2,
    question: "What is 4 * 4 ?",
    answer: "16",
    options: [
    'Answer 1',
    'Answer 2',
    'Answer 3',
    'Answer 4'
    ]
  },
]
export default App
