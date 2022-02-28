import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
// import Cookies from "js-cookie"

const CharacterCards = ({ data }) => {
	const [favs, setFavs] = useState(
		JSON.parse(localStorage.getItem("favToken")) || []
	)
	const [favsId, setFavsId] = useState(
		JSON.parse(localStorage.getItem("favTokenId")) || []
	)

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const responseToken =
	// 				JSON.parse(localStorage.getItem("favTokenId")) || []
	// 			// console.log("response :", responseToken)
	// 			// setResponse(responseToken)
	// 			setFavsId(responseToken)
	// 			// setIsLoading(false)
	// 		} catch (error) {
	// 			console.log(error.message)
	// 			console.log(error.response)
	// 		}
	// 	}
	// 	fetchData()
	// }, [])

	const setFav = (character, characterId) => {
		// CHARACTER
		// console.log("character", character)
		const newFavs = [...favs]
		// for (var i = 0; i <= favs.length; i++) {
		// 	console.log(newFavs.length)
		// 	if (favs[i] !== character) {
		// 		// console.log(newFavs[i]._id)
		// 		newFavs.push(character)
		// 	}
		// }
		newFavs.push(character)
		setFavs(newFavs)
		localStorage.setItem("favToken", JSON.stringify(newFavs))

		// CHARACTER ID
		// console.log("characterId", characterId)
		const newFavsId = [...favsId]
		newFavsId.push(characterId)
		setFavsId(newFavsId)
		localStorage.setItem("favTokenId", JSON.stringify(newFavsId))
	}

	const removeFav = (character, characterId) => {
		// CHARACTER
		// console.log("character", character)

		const newFavs = [...favs]
		const characterIndex = newFavs.indexOf(character)
		console.log("characterIndex", characterIndex)
		newFavs.splice(characterIndex, 1)
		setFavs(newFavs)
		localStorage.setItem("favToken", JSON.stringify(newFavs))

		// CHARACTER ID
		// console.log("characterId", characterId)
		const newFavsId = [...favsId]
		const characterIdIndex = newFavsId.indexOf(characterId)
		newFavsId.splice(characterIdIndex, 1)
		setFavsId(newFavsId)
		localStorage.setItem("favTokenId", JSON.stringify(newFavsId))
	}

	console.log("token ==>", favs)
	// console.log("response ==>", response)

	return (
		<div className="cardContainer">
			{data.results.map((character, index) => {
				// console.log("character ==>", character)
				let picture = character.thumbnail
				picture = `${picture.path}.${picture.extension}`
				return (
					<div key={character._id} className="container-favoris">
						{favsId.indexOf(character._id) === -1 ? (
							<span
								onClick={() => {
									setFav(character, character._id)
									// setFavId(character._id)
								}}
								className="btn-favoris"
							></span>
						) : (
							<span
								onClick={() => {
									removeFav(character, character._id)
								}}
								className="btn-favoris2"
							></span>
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
