import { useState } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const NavBar = ({ cartCount }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav>
            <div className='w-full flex flex-col'>
                <div className='nav-bar bg-white p-6 flex flex-row border-b-2 border-gray-500 justify-between items-center'>
                    <h1 className='flex company-name bebas-neue-regular tablet:text-5xl mobile:text-2xl'>Shopkeeper</h1>
                    <span className='flex'><Link to='/'><motion.img
                        whileHover={{scale:1.1}}
                        className=' tablet:w-16 mobile:w-9' src='/shopkeeper-logo.svg' alt='company logo' /></Link></span>
                    <button className={`flex flex-col justify-center items-center mobile:flex tablet:hidden ${isOpen && '-translate-y-1'}`} onClick={handleClick}>
                        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm -translate-y-0.5 ${isOpen ? 'rotate-45 translate-y-2.5' : '-translate-y-0.5'}`}></span>
                        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm translate-y-0.5 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                    </button>

                    <div className='mobile:hidden page-links tablet:flex relative items-center'>
                        <Link className='home-link border-r px-4 mr-2' to='/'><motion.div whileHover={{scale:1.2}} whileTap={{scale: 0.9}}>Home</motion.div></Link>
                        <Link className='shop-link border-r px-4 pl-4 mr-2' to='shop'><motion.div whileHover={{scale:1.2}} whileTap={{scale: 0.9}}>Shop</motion.div></Link>
                        <button className='cart pl-4'><motion.img whileHover={{scale:1.2}} whileTap={{scale: 0.9}} className='w-8' src='/icons/cart.svg' alt='cart' />
                            <p className='absolute right-2 bg-pink-400 px-1 rounded-lg text-white'>{cartCount}</p></button>
                    </div>
                </div>
                <div>
                    <p className='bg-black text-white tablet:text-sm mobile:text-xs'>Get 10% off everything in our summer sale! Just use the code: FAKESITE50. Simple!</p>
                </div>
            </div>
            {isOpen ?
                <motion.div
                    initial={{scale: 0, opacity:0, x: "-50%", y: "-50%"}}
                    animate={{scale: 1, opacity:1}}
                    className='min-w-[70vw] flex flex-col justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30
            bg-black/70 rounded-lg backdrop-blur-lg py-32 text-white' >
                    <nav className='flex items-start flex-col justify-center'>
                        <div className='flex justify-center items-center pb-1'><img src='/icons/home.svg' className='w-6 mr-2'/><Link to="/" title="Home" onClick={handleClick}>Home </Link></div>
                        <div className='flex justify-center items-center pt-1'><img src='/icons/cart-white.svg' className='w-6 mr-2'/><Link to="/shop" title="About" onClick={handleClick}>Shop </Link></div>
                        <div className='flex self-center pt-1'><p className='mr-2'>Cart</p><p className='bg-pink-400 px-2 ml-2 rounded-lg text-white'>{cartCount}</p></div>

                </nav>
                </motion.div> : null }
        </nav>

    );
};

NavBar.propTypes = {
    cartCount: PropTypes.number
}
export default NavBar;
