const ComicCard = ({ data }) => {
	//

	let thumb = data.thumbnail
	thumb = `${thumb.path}.${thumb.extension}`

	return (
		<div className="cardContainer">
			<div className="card large comic">
				<img className="picture" src={thumb} alt="" />
				<div className="card-content large">
					<p className="card-name large">{data.title}</p>
					{data.description !== "" ? (
						<p className="card-desc large">{data.description}</p>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default ComicCard
