import { Link } from "react-router-dom";
import '../css/App.css'

export default function Header() {
  return (
    <header>
        <Link to="/">Home</Link>
        <Link to="/display">Display</Link>

    </header>
  )
}