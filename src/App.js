import './css/App.css';
import axios from "axios";
import Home from './pages/Home';
import Display from './pages/Display'
import Header from './components/Header';
import Footer from "./components/Footer"
import { database } from './database'
import {  useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export let dataBase;
export let home;

function App() {

  const [userArrays, setStrings] = useState({})

  useEffect(() => {
    getData()
    getUserStrings()
}, [])

async function getData() {
    try {
        const API = "http://localhost:8080/words";
        const res = await axios.get(API);
        dataBase = res.data
        home = dataBase[0]
    } catch (err) {
        console.log(err)
        dataBase = database.words
        home = dataBase[0]
    }
}

async function getUserStrings() {
  try {
      const API = "http://localhost:8080/ngrams";
      const res = await axios.get(API);
      setStrings(res.data[0].grams[0])
      console.log(res.data[0].grams[0])
  } catch (err) {
      console.log(err)
  }
}

    return (
    <BrowserRouter>
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/display" element={<Display userArrays={userArrays} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;