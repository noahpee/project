import { useState, useEffect } from "react";
import { home, dataBase } from '../App'
import axios from "axios";
import Grid from './display_components/Grid'
import Sentence from './display_components/Sentence'
import Example from './display_components/Example'

let userStrings = {}

export default function Display() {
    
    const [userSentence, addUserSentence] = useState([])
    const [sentence, addWord] = useState([])
    const [array, setWord] = useState([]);

    useEffect(() => {
        setWord(home.array);
    }, []);

    async function setGrid(wordObject) {

        addSentence(wordObject.text)
        addToUserSentence(wordObject.id)

        try {
            const API = `http://localhost:8080/words?text=${wordObject.text}`;
            const res = await axios.get(API);
            setWord(res.data[0].array)
        } catch (err) {
            console.log(err)
            setWord(wordObject.array)
        }
    }

    function addSentence(text) {
        addWord([...sentence, text])
    }

    function deleteLastWord() {
        sentence.pop()
        addWord([...sentence])
    }

    function clearSentence() {
        
        if (userSentence.length === 0) {
            return
        } else {
            createNGRams(userSentence)
            addWord([])
            addUserSentence([])
        }
    }

    function addToUserSentence(id) {
        addUserSentence([...userSentence, id])
    }

    function createNGRams(array) {

        for (let i = 0; i <= array.length -2;i ++) {

            let NGram = array.slice(i, i+4)

            let key = NGram[0]

            let obj = {[key]:[]}

            let gram = []

            for (let j = 1; j <= NGram.length -1;j++) {
                gram.push(NGram[j])
            }
            obj[key] = [...obj[key],gram]
            userStrings = {...userStrings, ...obj}
            console.log(userStrings)
        }
    }

    return (
        <div>
            <Example />
            <Sentence sentence={sentence} dataBase={dataBase}  deleteLastWord={deleteLastWord} clearSentence={clearSentence}/>
            <Grid array={array} dataBase={dataBase} setGrid={setGrid}/>
        </div>
    )
}
