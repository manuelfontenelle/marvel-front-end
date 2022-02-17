import "./App.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Logo
import Logo from "./assets/logo.svg"
//Header
import Header from "./components/Header"
//Pages
import Home from "./pages/Home"
import Personnages from "./pages/Personnages"
import Comics from "./pages/Comics"
import Favoris from "./pages/Favoris"

function App() {
	return (
		<Router>
			<Header logo={Logo} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/personnages" element={<Personnages />} />
				<Route path="/comics" element={<Comics />} />
				<Route path="/favoris" element={<Favoris />} />
			</Routes>
		</Router>
	)
}

export default App
