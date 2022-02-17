import { Link } from "react-router-dom"
const Characters = ({ data }) => {
	return (
		<div className="cardContainer">
			{data.results.map((character, index) => {
				const picture = character.thumbnail
				picture.image = `${picture.path}.${picture.extension}`
				// console.log(character._id)

				return (
					<div key={character._id}>
						<Link to={`/comics/${character._id}`}>
							<div className="card">
								<img className="logo" src={picture.image} alt="" />
								<div className="card-content">
									<p className="card-name">{character.name}</p>

									{character.description !== "" ? (
										<p className="card-desc">
											{character.description.slice(0, 100) + "..."}
										</p>
									) : null}
								</div>
							</div>
						</Link>
					</div>
				)
			})}
		</div>
	)
}

export default Characters
