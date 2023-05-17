import { useState, useEffect, useRef } from "react";
import FlashCardList from './FlashCardList'
import axios from "axios";
import "./Form.css"

export default function FormNav() {

    const[flashCards, setFlashCards] = useState([])
    const [categories, setCategories] = useState([])
    
    const categoryRef = useRef();
    const amountRef = useRef()

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php').then(res => {
            const categoryData = res.data.trivia_categories
            setCategories(categoryData)
        })
        
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('https://opentdb.com/api.php', {
            params: {
                category: categoryRef.current.value,
                amount: amountRef.current.value
            }
        })
        .then(response => {
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
    }

    // Decodes a string from any HTML encoded characters to normal string text.
    function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
    }


    return (
        <>
            <form className="header" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" ref={categoryRef}>
                        {categories.map(category => {
                            return <option value={category.id} key={category.id}>
                                        {category.name}
                                    </option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Number of Questions</label>
                    <input type="number" id="amount" min={1} step={1} defaultValue={10} ref={amountRef}></input>
                </div>
                <div className="form-group">
                    <button className="btn">Generate</button>
                </div>
            </form>
            <div className='container'>
                <FlashCardList flashcards = {flashCards} />
            </div>
        </>
    )
}