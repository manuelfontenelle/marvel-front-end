// import { useState, useEffect } from "react"
import { useState, useEffect } from "react"
import axios from "axios"

const Home = () => {
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				// requête axios à mon serveur (pas à l'API Marvel)
				const response = await axios.get("http://localhost:3100/characters")
				console.log(response.data)
				setData(response.data)
				setIsLoading(false)
			} catch (error) {
				console.log(error.message)
				console.log(error.response)
			}
		}
		fetchData()
	}, [])

	return (
		<div className="main">
			<div className="container">
				{isLoading ? (
					<div>En cours de chargement...</div>
				) : (
					<div className="cardContainer">
						{data.results.map((character, index) => {
							return (
								<div key={character._id} className="card">
									<img
										className="logo"
										src={
											character.thumbnail.path +
											"." +
											character.thumbnail.extension
										}
										alt=""
									/>
									<p className="card-name">{character.name}</p>
									<p className="card-desc">
										{character.description &&
											character.description.slice(0, 100) + "..."}
									</p>
								</div>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
