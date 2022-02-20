import { Link } from "react-router-dom"
import { useState } from "react"
import Cookies from "js-cookie"

const CharacterCards = ({ data }) => {
	const [token, setToken] = useState([Cookies.get("userToken") || 0])

	//Au clic sur la carte
	const setUser = (userId) => {
		const newTokens = [...token]
		if (userId) {
			newTokens.push(Cookies.set("userToken", userId, { expires: 10 }))
		} else {
			Cookies.remove("userToken")
		}
		setToken(newTokens)
	}

	console.log(token)
	return (
		<div className="cardContainer">
			{data.results.map((character, index) => {
				let picture = character.thumbnail
				picture = `${picture.path}.${picture.extension}`
				return (
					<div key={character._id} onClick={(event) => setUser(character._id)}>
						<Link to={`/character/${character._id}`}>
							<div className="card">
								<img className="picture" src={picture} alt="" />
								<div className="card-content">
									<p className="card-name">{character.name}</p>

									{/* {character.description !== null &&
									character.description !== "" ? (
										<p className="card-desc">
											{character.description.slice(0, 100) + "..."}
										</p>
									) : null} */}
								</div>
							</div>
						</Link>
					</div>
				)
			})}
		</div>
	)
}

export default CharacterCards
