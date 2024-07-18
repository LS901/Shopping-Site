import PropTypes from 'prop-types';

function RatingReview({ rating }) {
    const renderStars = () => {
        const stars = [];
        for (let star = 1; star <= 5; star++) {
            stars.push(
                <span
                    key={star}
                    className='star'
                    style={{
                        cursor: 'pointer',
                        color: rating >= star ? 'gold' : 'gray',
                        fontSize: '15px',
                    }}
                >
          ★
        </span>
            );
        }
        return stars;
    };

    return <div>{renderStars()}</div>;
}

RatingReview.propTypes = {
    rating: PropTypes.number.isRequired,
};

export default RatingReview;