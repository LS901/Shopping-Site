import PropTypes from 'prop-types';
import RatingReview from "./RatingReview.jsx";

const Item = ({item, setCartCount, discount}) => {
    return (
        <>
            <div className='flex flex-col h-full'>
                <img src={`${item.image}`} alt='item image' className='max-w-[50%] max-h-[200px] self-center rounded-2xl'/>
            </div>
            <div className='flex-col flex text-left'>
                <p className='pt-8 self-start'>{item.title}</p>
                <div className='flex mobile:flex-col desktop:flex-row py-2 justify-between'>
                    <p className='font-semibold '>
                        {discount ?
                            <>
                                <span className='line-through text-red-500'>£{item.price}</span>
                                <span>  £{(item.price * discount).toFixed(2)} </span>
                            </>
                        : `£${item.price}`
                        }
                    </p>
                    <p className='flex mobile:pt-2 desktop:p-0'><RatingReview rating={item.rating.rate} />({item.rating.count})</p>
                </div>
                <button className='p-2 my-2 bg-[#BF00FF] laptop:w-1/3 rounded-lg self-center text-white text-sm mobile:text-xs mobile:w-8/12' onClick={() => setCartCount('increment_cart')}>Add To Cart</button>
            </div>
        </>
    );
};

Item.propTypes = {
    item: PropTypes.object,
    setCartCount: PropTypes.func,
    discount: PropTypes.number
};

export default Item;
