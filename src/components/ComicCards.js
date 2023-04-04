import { Link } from "react-router-dom"
const ComicCards = ({ data }) => {
	return (
		<div className="cardContainer">
			{data.results.map((comic, index) => {
				let picture = comic.thumbnail
				picture = `${picture.path}.${picture.extension}`
				return (
					<div key={comic._id} className="container-character">
						<Link to={`/comic/${comic._id}`}>
							<div className="card">
								<img className="picture" src={picture} alt="" />
								<div className="card-content">
									<p className="card-name">{comic.title}</p>

									{/* {comic.description !== null && comic.description !== "" ? (
									<p className="card-desc">
										{comic.description.slice(0, 100) + "..."}
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

export default ComicCards
