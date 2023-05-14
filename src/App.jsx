import { useState, useEffect } from 'react'
import './App.css'
import FlashCardList from './Components/FlashCardList'
import axios from 'axios'

function App() {
  const[flashCards, setFlashCards] = useState(questionAndAnswers)

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10').then(response => {
      const data = response.data.results.map((list, index) => {
        return {
          id: `${index} ${Date.now()}`,
          question: decodeString(list.question),
          answer: decodeString(list.correct_answer),
          options: [...list.incorrect_answers, list.correct_answer]
        }
      })
      
      // Sorts the 'options' in a random manner so that the correct answer is distributed randomly in the 'options'.
      // Also decoded 'options' of any html encoded characters.
      const sortedData = data.map(data => {
        data.options.sort(() => Math.random() - 0.5)
        return {
          ...data,
          options: data.options.map(option => decodeString(option))
        }
      })
      
      setFlashCards(sortedData)
    })
  }, [])

  // Decodes a string from any HTML encoded characters to normal string text.
  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

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
