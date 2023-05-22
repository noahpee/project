import './css/App.css';
import axios from "axios";
import Home from './pages/Home';
import Display from './pages/Display'
import Header from "./components/Header"
import Footer from "./components/Footer"
import { database } from './database'
import {  useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export let dataBase;
export let home;

function App() {

  useEffect(() => {
    getData();
}, []);

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

    return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/display" element={<Display />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;