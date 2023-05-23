import { Link } from "react-router-dom";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import Profile from "./Profile";
import '../css/App.css'

export default function AppHeader({searchKeyUp,putGram}) {
  return (
    <header>
        <Link to="/">Home</Link>
        <Link to="/display">Display</Link>
        <button onClick={() => putGram()}>menu</button>
        <input placeholder="speak-easy" onKeyUp={searchKeyUp}></input>
        <button>account</button>
        <LoginButton />
        <LogoutButton />
        <Profile />
    </header>
  )
}