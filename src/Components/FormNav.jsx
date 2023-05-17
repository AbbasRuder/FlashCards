import { useState, useEffect, useRef } from "react";
import FlashCardList from './FlashCardList'
import axios from "axios";
import "./Form.css"


// Fetching categories data.
async function fetchCategies() {
    try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        return response.data.trivia_categories
    } catch (error) {
        console.log('Error fetching Categories', error);
        return [];
    }
}

// Fetching FlashCards data according to the user input of 'categories' and 'amount'.
async function fetchFlashCards(categories, amount) {
    try {
        const responseData = await axios.get('https://opentdb.com/api.php',{
            params: {
                categories,
                amount
            }
        });

        return responseData.data.results.map((list, index) => {
            return {
                id: `${index} ${Date.now()}`,
                question: decodeString(list.question),
                answer: decodeString(list.correct_answer),
                options: [...list.incorrect_answers, list.correct_answer]
                .map(option => decodeString(option))
                .sort(() => Math.random() - 0.5)
                // sort the options randomly so that every answers doesn't contain the same distribution of right answer/at the same place.
            }
        })

    } catch(error) {
        console.log("Error fetching flashcards", error);
        return [];
    }
}

// Decodes a string from any HTML encoded characters to normal string text.
function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
}



export default function FormNav() {

    const [flashCards, setFlashCards] = useState([])
    const [categories, setCategories] = useState([])
    
    const categoryRef = useRef();
    const amountRef = useRef()

    useEffect(() => {
        // resolving the promise
        fetchCategies().then(res => {
            setCategories(res)
        })

    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // defining category and amount from user input
        const category = categoryRef.current.value;
        const amount = amountRef.current.value;

        const fetchedFlashCards = await fetchFlashCards(category, amount);
        setFlashCards(fetchedFlashCards);
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