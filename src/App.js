import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./App.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Logo
import Logo from "./assets/logo.svg"
//Header
import Header from "./components/Header"
//Pages
import Home from "./pages/Home"
import Character from "./pages/Character"
import Comics from "./pages/Comics"
import Comic from "./pages/Comic"
import Favoris from "./pages/Favoris"

function App() {
	return (
		<Router>
			<Header logo={Logo} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/characters" element={<Home />} />
				<Route path="/character/:id" element={<Character />} />
				<Route path="/comics" element={<Comics />} />
				<Route path="/comic/:id" element={<Comic />} />
				<Route path="/favoris" element={<Favoris />} />
			</Routes>
		</Router>
	)
}

export default App
