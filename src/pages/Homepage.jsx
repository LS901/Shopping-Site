import FeaturedSection from "../components/FeaturedSection.jsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const variant = (delay, comeFromAbove= false) => {
    return {
        initial: {
            opacity: 0,
            y: comeFromAbove ? -50 : 50
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay
            }
        }
    }
}
const Homepage = ({setCartCount}) => {

    return (
        <main>
        <div className="homepage-wrapper">
            <div className='relative bg-auto flex desktop:flex-row mobile:flex-col-reverse items-center desktop:max-h-[67vh]'>
                <div className='desktop:w-1/2 mobile:w-full mobile:items-center tablet:px-20 mobile:px-4 desktop:pr-0 flex flex-col desktop:items-start z-10 mobile:bg-gray-200/95 desktop:bg-transparent'>
                    <motion.h1 className='desktop:text-7xl mobile:text-2xl desktop:my-12 mobile:my-6 font-bold text-[#BF00FF] desktop:text-start tablet:text-center flex-wrap'
                               variants={variant(0)}
                               initial='initial'
                               viewport={{ once: true }}
                               whileInView='animate'>Shop Smart, Shop Easy!</motion.h1>
                    <motion.p className='desktop:text-2xl mobile:text-sm desktop:mb-12 mobile:mb-6 desktop:text-start tablet:text-center '
                              variants={variant(0.2)}
                              initial='initial'
                              viewport={{ once: true }}
                              whileInView='animate'>Looking for all the latest products with the best deals? All in one place? You&apos;ve come to the right place my friend.</motion.p>
                    <motion.div className='mobile:mb-6 desktop:mb-0'
                                whileHover={{scale:1.1}}
                                variants={variant(0.4)}
                                initial='initial'
                                viewport={{ once: true }}
                                whileInView='animate'><Link className='rounded-lg bg-black desktop:p-3 mobile:p-1 mobile:text-sm desktop:text-lg text-white hover:bg-purple-600 ' to='shop'>Shop Now</Link></motion.div>
                </div>
                <div className='tablet:w-1/2 mobile:w-full desktop:pt-16 desktop:pr-20 desktop:flex tablet:max-h-[50vh]  desktop:max-h-[100vh] justify-end overflow-visible inline-block desktop:relative top-0 -z-10'>
                    <motion.img src='/shopping.svg' className='shopping-image tablet:min-h-[46vh]' alt='shopping image'
                                variants={variant(0.5, true)}
                                initial='initial'
                                viewport={{ once: true }}
                                whileInView='animate'/>
                </div>
            </div>
            <FeaturedSection setCartCount={setCartCount}/>
        </div>
        </main>
    );
};

Homepage.propTypes = {
    setCartCount: PropTypes.func
}
export default Homepage;
