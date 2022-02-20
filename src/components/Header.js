import { Link } from "react-router-dom"
const Header = ({ logo }) => {
	return (
		<div className="header-container">
			<div className="container">
				<div className="logo-container">
					<Link to={`/`}>
						<img className="logo" src={logo} alt="" />
					</Link>
				</div>
				<div className="nav">
					<Link to={`/characters`} className="nav-link">
						<button className="nav-button">Personnages</button>
					</Link>
					<Link to={`/comics`} className="nav-link">
						<button className="nav-button">Comics</button>
					</Link>
					<Link to={`/favoris`} className="nav-link">
						<button className="nav-button">Favoris</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Header
