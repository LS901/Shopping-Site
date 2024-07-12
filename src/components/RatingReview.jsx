import PropTypes from "prop-types";

function RatingReview({ rating }) {
    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => {
                return (
                    <span
                        key={star}
                        className='start'
                        style={{
                            cursor: 'pointer',
                            color: rating >= star ? 'gold' : 'gray',
                            fontSize: `15px`,
                        }}
                    >
            {' '}
                        ★{' '}
          </span>
                )
            })}
        </div>
    )
}

RatingReview.propTypes = {
    rating: PropTypes.number
}
export default RatingReview;
