import { useState, useEffect } from "react";
import { home, dataBase } from '../App'
import axios from "axios";
import AppHeader from "../components/AppHeader";
import Grid from './display_components/Grid'
import Sentence from './display_components/Sentence'
import Example from './display_components/Example'
import Fuse from 'fuse.js'

let globalString = []

export default function Display({userArrays}) {

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
        globalString.push(id)
        addUserSentence([...userSentence, id])
    }

    function searchKeyUp(event) {

        let searchArray = []

        const fuse = new Fuse(dataBase, {
            keys: ['text'],
            threshold: 0.4,
        })
        
        const results = fuse.search(event.target.value)
        results.forEach(item => searchArray.push(item.item.id));

        if (searchArray.length === 0 || event.target.value  === "") {
            setWord(home.array)
        } else {
            searchArray.length = 16
            setWord(searchArray)
        }
    }

    function createNGRams(array) {

        for (let i = 0; i <= array.length - 2; i++) {
            let NGram = array.slice(i, i + 4);
            let key = NGram[0];
    
        if (!userArrays[key]) {
            userArrays[key] = []; // Initialize the array if it doesn't exist
        }
    
        let nextWords = [];
        for (let j = NGram.length - 1; j > 0; j--) {
            nextWords.push(NGram.slice(1, j + 1));
        }
    
        if (userArrays[key].length === 0) {
            userArrays[key] = [...nextWords]; // Add nextWords arrays directly if the key is empty
        } else {
            userArrays[key] = [...userArrays[key], ...nextWords]; // Add nextWords arrays to the existing array
        }
    }
        const result = { grams: userArrays };
        putGram(result);
    }      

    async function putGram(result) {

        try {
        const API = `http://localhost:8080/ngrams/646bd2bc00040f8013e4b912`;
        await axios.put(API, result);
        console.log("saved")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <AppHeader searchKeyUp={searchKeyUp}/>
            <Example />
            <Sentence sentence={sentence} userSentence={userSentence} dataBase={dataBase}  deleteLastWord={deleteLastWord} clearSentence={clearSentence}/>
            <Grid array={array} dataBase={dataBase} setGrid={setGrid}/>
        </div>
    )
}
