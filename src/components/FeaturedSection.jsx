import {useContext, useEffect, useRef, useState} from 'react';
import { ItemsContext } from "../ItemsContext.jsx";
import ScrollButton from "./ScrollButton.jsx";
import Item from "./Item.jsx";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const FeaturedSection = ({setCartCount}) => {
    const shoppingData = useContext(ItemsContext);
    const leftArrowRef = useRef();
    const rightArrowRef = useRef();
    const [featuredData, setFeaturedData] = useState(null);

    useEffect(() => {
        setFeaturedData(shoppingData.slice(0,3));
    },[shoppingData])

    const stopArrowAnimation = () => {
        leftArrowRef.current.style.animation = 'none';
        rightArrowRef.current.style.animation = 'none';
    }

    return (
        <>
            {!!featuredData &&
                <>
                    <motion.div className='flex items-center justify-evenly p-8 mt-10 text-5xl'
                                initial={{opacity: 0}}
                                animate={{opacity: 1, transition: {duration: 0.5, delay: 1.5}}}>
                        <img className='mobile:hidden tablet:flex tablet:w-16 desktop:w-20 bounce' src='/icons/down-arrow.svg' alt='down arrow' ref={leftArrowRef}/>
                        <h5 className='tablet:hidden text-3xl'>Our current best deals:</h5>
                        <h1 className='mobile:hidden tablet:inline-block tablet:text-3xl desktop:text-5xl'>Click <ScrollButton onClick={() => stopArrowAnimation()} className='font-bold text-[#FFBF00]'>here</ScrollButton> and see our best deals right now!</h1>
                        <img className='mobile:hidden tablet:flex tablet:w-16 desktop:w-20 bounce' src='/icons/down-arrow.svg' alt='down arrow' ref={rightArrowRef}/>
                    </motion.div>
                    <div className='bg-white flex flex-wrap'>
                        {featuredData.map(data => <div key={data} className='mobile:w-full desktop:w-1/3 h-auto bg-white mobile:m-10 p-2 desktop:mx-0 desktop:my-10 flex-col flex'><Item key={data.uid} item={data} setCartCount={setCartCount} discount={0.9} /></div>)}
                    </div>
                </>
            }
        </>
    );
};

FeaturedSection.propTypes = {
    setCartCount: PropTypes.func
}
export default FeaturedSection;
