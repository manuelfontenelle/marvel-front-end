import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Loader from "react-js-loader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

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
					// console.log(response.data)
					newData.push(response.data)
					// console.log(newData)
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

	const setFav = (characterId, event) => {
		// console.log(characterId)
		const newdataToken = [...dataToken]
		for (var i = 0; i <= newdataToken.length; i++) {
			event.preventDefault()
			// event.stopPropagation()
			const characterIndex = dataToken.indexOf(characterId)
			newdataToken.splice(characterIndex, 1)
			setDataToken(newdataToken)
			localStorage.setItem("favIdToken", JSON.stringify(newdataToken))

			const cardContainer =
				event.target.parentNode.parentNode.parentNode.parentNode
			const cardContainer2 = event.target.parentNode.parentNode.parentNode
			// console.log(cardContainer)
			if (cardContainer.classList.contains("cardElem")) {
				cardContainer.style.display = "none"
			} else {
				cardContainer2.style.display = "none"
			}

			break
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
							// console.log(item)
							let picture = item.thumbnail
							picture = `${picture.path}.${picture.extension}`

							return (
								<>
									<Link to={`/character/${item._id}`} className="cardElem">
										<div className="card relative">
											<div
												className="btn-favoris"
												onClick={(event) => {
													setFav(item._id, event)
												}}
											>
												<FontAwesomeIcon
													icon={faHeart}
													size="2x"
													className="icone-fav active"
												/>
											</div>

											<img className="picture" src={picture} alt="" />
											<div className="card-content">
												<p className="card-name">{item.name}</p>
											</div>
										</div>
									</Link>
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
