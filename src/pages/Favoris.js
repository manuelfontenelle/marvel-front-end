import { useState, useEffect } from "react"
import axios from "axios"
import Loader from "react-js-loader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"

const Favoris = () => {
	const [data, setData] = useState([])
	const [dataToken, setDataToken] = useState(
		JSON.parse(localStorage.getItem("favIdToken")) || []
	)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				// setDataToken(JSON.parse(localStorage.getItem("favIdToken")) || [])
				const newData = [...data]
				for (var i = 0; i < dataToken.length; i++) {
					const response = await axios.get(
						`https://marvel-backend-manuelf.herokuapp.com/character/${dataToken[i]}`
					)
					console.log(response.data)
					newData.push(response.data)
					console.log(newData)
				}
				setData(newData)
				// console.log(data)
				// console.log("dataToken", dataToken)
				setIsLoading(false)
			} catch (error) {
				console.log(error.message)
				console.log(error.response)
			}
		}
		fetchData()
	}, [])

	const setFav = (characterId) => {
		console.log(characterId)

		const newdataToken = [...dataToken]

		for (var i = 0; i <= newdataToken.length; i++) {
			// console.log(newFavsId)
			if (dataToken.indexOf(characterId) === -1) {
				newdataToken.push(characterId)
				setDataToken(newdataToken)
				localStorage.setItem("favIdToken", JSON.stringify(newdataToken))
				break
			} else {
				console.log("passage")
				const characterIndex = dataToken.indexOf(characterId)
				newdataToken.splice(characterIndex, 1)
				setDataToken(newdataToken)
				localStorage.setItem("favIdToken", JSON.stringify(newdataToken))
				break
			}
		}
	}

	// console.log(token)
	return (
		<div>
			{isLoading ? (
				<div>
					<Loader
						type="spinner-default"
						bgColor={"#FFFFFF"}
						title={"En cours de chargement"}
						color={"#FFFFFF"}
						size={100}
					/>
				</div>
			) : (
				<div className="container">
					<div className="cardContainer">
						{data.map((item, index) => {
							console.log(item)
							let picture = item.thumbnail
							picture = `${picture.path}.${picture.extension}`

							return (
								<>
									<div className="card relative">
										{dataToken.indexOf(item._id) === -1 ? (
											<span
												onClick={() => {
													setFav(item._id)
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
													setFav(item._id)
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
										<img className="picture" src={picture} alt="" />
										<div className="card-content">
											<p className="card-name">{item.name}</p>

											{/* {character.description !== null &&
									character.description !== "" ? (
										<p className="card-desc">
											{character.description.slice(0, 100) + "..."}
										</p>
									) : null} */}
										</div>
									</div>
								</>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

export default Favoris
