import { useState, useEffect } from "react"
// import axios from "axios"
// import Cookies from "js-cookie"

const Favoris = () => {
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const response = await axios.get(
				// 	// `http://localhost:3100/comics?page=${page}&search=${search}`
				// 	`https://marvel-backend-manuelf.herokuapp.com/comics?page=${page}&search=${search}`
				// )
				const responseToken = JSON.parse(localStorage.getItem("favToken")) || []
				// const responseToken = Cookies.get("favToken")

				console.log("/Favoris :", responseToken)

				setData(responseToken)
				setIsLoading(false)
			} catch (error) {
				console.log(error.message)
				console.log(error.response)
			}
		}
		fetchData()
	}, [])

	// console.log(token)
	return (
		<div>
			{isLoading ? (
				<div>En cours de chargement...</div>
			) : (
				<div className="container">
					<div className="cardContainer">
						{data.map((fav, index) => {
							let picture = fav.thumbnail
							picture = `${picture.path}.${picture.extension}`
							return (
								<div>
									{/* {console.log(fav)} */}
									<div className="card">
										<img className="picture" src={picture} alt="" />
										<div className="card-content">
											<p className="card-name">{fav.name}</p>

											{/* {character.description !== null &&
									character.description !== "" ? (
										<p className="card-desc">
											{character.description.slice(0, 100) + "..."}
										</p>
									) : null} */}
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

export default Favoris
