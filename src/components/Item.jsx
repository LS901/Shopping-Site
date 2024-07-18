import PropTypes from 'prop-types';
import RatingReview from './RatingReview.jsx';
import { motion } from 'framer-motion';

const Item = ({ item, setCartCount, discount }) => {
    const discountedPrice = discount ? (item.price * discount).toFixed(2) : null;

    return (
        <>
        <div className='flex flex-col h-full'>
            <img src={item.image} alt='item image' className='max-w-[50%] max-h-[200px] self-center rounded-2xl' />
        </div>
        <div className='flex-col flex text-left'>
            <p className='pt-8 self-start'>{item.title}</p>
            <div className='flex mobile:flex-col desktop:flex-row py-2 justify-between'>
                <p className='font-semibold'>
                    {discount ? (
                        <>
                            <span className='line-through text-red-500'>£{item.price}</span>
                            <span> £{discountedPrice} </span>
                        </>
                    ) : (
                        `£${item.price}`
                    )}
                </p>
                <p className='flex mobile:pt-2 desktop:p-0'>
                    <RatingReview rating={item.rating.rate} /> ({item.rating.count})
                </p>
            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='p-2 my-2 bg-[#BF00FF] laptop:w-1/3 rounded-lg self-center text-white text-sm mobile:text-xs mobile:w-8/12'
                onClick={() => setCartCount('increment_cart')}
            >
                Add To Cart
            </motion.button>
        </div>
    </>
    );
};

Item.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.shape({
            rate: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
        }).isRequired,
    }),
    setCartCount: PropTypes.func.isRequired,
    discount: PropTypes.number,
};

export default Item;