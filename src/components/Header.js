import { Link } from "react-router-dom";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import Profile from "./Profile";
import '../css/App.css'

export default function Header() {
  return (
    <header>
        <Link to="/">Home</Link>
        <Link to="/display">Display</Link>
        <button>menu</button>
        <input placeholder="speak-easy"></input>
        <button>account</button>
        <LoginButton />
        <LogoutButton />
        <Profile />
    </header>
  )
}
