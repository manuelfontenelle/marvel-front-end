import { useState, useEffect } from "react"
import axios from "axios"
import Characters from "../components/Characters"

const Home = () => {
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const [skip, setSkip] = useState(0)
	// const skip = 2
	console.log(skip)
	useEffect(() => {
		const fetchData = async () => {
			try {
				// requête axios à mon serveur (pas à l'API Marvel)
				const response = await axios.post("http://localhost:3100/characters", {
					skip: skip,
				})
				console.log(response.data)
				setData(response.data)
				setIsLoading(false)
			} catch (error) {
				console.log(error.message)
				console.log(error.response)
			}
		}
		fetchData()
	}, [skip])

	return (
		<div className="main">
			<div className="container">
				{isLoading ? (
					<div>En cours de chargement...</div>
				) : (
					<>
						<Characters data={data} />
						<div className="navPage">
							<button>Page précédente</button>
							<button onClick={() => setSkip(skip + 100)}>Page suivante</button>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Home
