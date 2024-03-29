import { useState, useEffect } from "react"
import axios from "axios"
import ComicCards from "../components/ComicCards"
import ReactPaginate from "react-paginate"
import Loader from "react-js-loader"

const Comics = ({ setPage, page }) => {
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)

	// const [page, setPage] = useState(1)
	const [search, setSearch] = useState("")
	const [pageCount, setPageCount] = useState(1)

	const handlePageClick = (event) => {
		setPage(event.selected + 1)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					// `http://localhost:3100/comics?page=${page}&search=${search}`
					`https://marvel-backend-manuelf.herokuapp.com/comics?page=${page}&search=${search}`
				)

				// setCount(response.data.count)
				console.log(response.data)
				const limit = response.data.limit
				setPageCount(Math.ceil(Number(response.data.count) / limit))
				setData(response.data)
				setIsLoading(false)
			} catch (error) {
				console.log(error.message)
				console.log(error.response)
			}
		}
		fetchData()
	}, [page, search])

	return (
		<div className="main">
			<div className="container">
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
					<>
						<h1>Comics</h1>

						<div className="container">
							<div className="search-container">
								<input
									placeholder="Search..."
									className="searchInput"
									type="text"
									value={search}
									onChange={(event) => {
										setSearch(event.target.value)
										setPage(1)
									}}
								/>
							</div>
						</div>
						<div className="container">
							<div className="pagination-container">
								<ReactPaginate
									previousLabel={"<"}
									nextLabel={">"}
									pageCount={pageCount}
									pageRangeDisplayed={5}
									onPageChange={handlePageClick}
									containerClassName={"pagination"}
									activeClassName={"active"}
									forcePage={page - 1} // retour à la page précédente si click sur précédent
								/>
							</div>
						</div>
						<ComicCards data={data} />
						<div className="container">
							<div className="pagination-container">
								<ReactPaginate
									previousLabel={"<"}
									nextLabel={">"}
									pageCount={pageCount}
									pageRangeDisplayed={5}
									onPageChange={handlePageClick}
									containerClassName={"pagination"}
									activeClassName={"active"}
									forcePage={page - 1} // retour à la page précédente si click sur précédent
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Comics
