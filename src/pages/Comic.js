import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import ComicCard from "../components/ComicCard"

const Character = () => {
	const { id } = useParams()

	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:3100/comic/${id}`)
				// console.log(response.data)
				setData(response.data)
				setIsLoading(false)
			} catch (error) {
				console.log(error.message)
				console.log(error.response)
			}
		}
		fetchData()
	}, [id])
	return isLoading ? (
		<div>En cours de chargement...</div>
	) : (
		<div className="container">
			<ComicCard data={data} />
		</div>
	)
}

export default Character
