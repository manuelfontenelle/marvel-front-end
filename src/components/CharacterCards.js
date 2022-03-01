import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"

const CharacterCards = ({ data }) => {
	const [favsId, setFavsId] = useState(
		JSON.parse(localStorage.getItem("favIdToken")) || []
	)

	const setFav = (characterId) => {
		console.log(characterId)

		const newFavsId = [...favsId]

		for (var i = 0; i <= newFavsId.length; i++) {
			// console.log(newFavsId)
			if (favsId.indexOf(characterId) === -1) {
				newFavsId.push(characterId)
				setFavsId(newFavsId)
				localStorage.setItem("favIdToken", JSON.stringify(newFavsId))
				break
			} else {
				console.log("passage")
				const characterIndex = favsId.indexOf(characterId)
				newFavsId.splice(characterIndex, 1)
				setFavsId(newFavsId)
				localStorage.setItem("favIdToken", JSON.stringify(newFavsId))
				break
			}
		}
	}

	// console.log("token ==>", favsId)
	return (
		<div className="cardContainer">
			{data.results.map((character, index) => {
				let picture = character.thumbnail
				picture = `${picture.path}.${picture.extension}`
				return (
					<div key={character._id} className="container-favoris">
						{favsId.indexOf(character._id) === -1 ? (
							<span
								onClick={() => {
									setFav(character._id)
								}}
								className="btn-favoris"
							>
								<FontAwesomeIcon
									icon={faHeartRegular}
									size="2x"
									className="icone-fav"
								/>
							</span>
						) : (
							<span
								onClick={() => {
									setFav(character._id)
								}}
								className="btn-favoris active"
							>
								<FontAwesomeIcon
									icon={faHeart}
									size="2x"
									className="icone-fav active"
								/>
							</span>
						)}
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
