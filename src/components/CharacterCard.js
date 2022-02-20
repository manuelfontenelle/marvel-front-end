import { Link } from "react-router-dom"
import Slider from "react-slick"

const CharacterCard = ({ data }) => {
	let thumb = data.thumbnail
	thumb = `${thumb.path}.${thumb.extension}`
	const sliderSettings = {
		// removes default buttons
		arrows: true,
		// dots: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					// dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}
	return (
		<div className="cardContainer">
			<div className="card large">
				<img className="picture" src={thumb} alt="" />
				<div className="card-content large">
					<p className="card-name large">{data.name}</p>
					{data.description !== "" ? (
						<p className="card-desc large">{data.description}</p>
					) : null}

					<div className="cardContainer carousel">
						<Slider {...sliderSettings}>
							{data.comics.map((comic, index) => {
								let picture = comic.thumbnail
								picture = `${picture.path}.${picture.extension}`

								return (
									<Link to={`/comic/${comic._id}`} className="card comics">
										<div key={comic._id}>
											<img className="picture large" src={picture} alt="" />
											<div className="card-content">
												<p className="card-name">{comic.title}</p>

												{/* {comic.description !== null ? (
													<p className="card-desc">
														{comic.description.slice(1, 100) + "..."}
													</p>
												) : null} */}
											</div>
										</div>
									</Link>
								)
							})}
						</Slider>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CharacterCard
