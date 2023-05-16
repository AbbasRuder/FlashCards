import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Form.css"

export default function FormNav() {

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
    }


    return (
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
    )
}