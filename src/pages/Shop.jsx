import { useContext, useState } from 'react';
import { ItemsContext } from "../ItemsContext.jsx";
import Item from "../components/Item.jsx";
import Filter from "../components/Filter.jsx";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Shop = ({ setCartCount }) => {
    const shoppingData = useContext(ItemsContext);
    const [itemsToDisplay, setItemsToDisplay] = useState(shoppingData);

    const updateItems = (category, filter) => {
        let newItemList = shoppingData;
        if(category !== 'All') {
            newItemList = newItemList.filter((item) => item.category === category);
        }
        if(filter === 'Least Expensive') {
            newItemList = [...newItemList].sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
        }
        if(filter === 'Most Expensive') {
            newItemList = [...newItemList].sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))
        }
        if(filter === 'Highest Rated') {
            newItemList = [...newItemList].sort((a,b) => (a.rating.rate < b.rating.rate) ? 1 : ((b.rating.rate < a.rating.rate) ? -1 : 0))
        }
        if(filter === 'None') {
            newItemList = [...newItemList].sort()
        }
        setItemsToDisplay([...newItemList]);
    }

    return (
        <div className='shop-wrapper grid tablet:grid-cols-4 mobile:grid-cols-1 gap-3 p-5 laptop:text-sm mobile:text-xs'>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration:0.5}}} className='filters grid col-span-1 border-2 border-gray-100 rounded-lg'>
                <Filter updateItems={updateItems}/>
            </motion.div>
            <div className='items tablet:col-span-3 rounded-lg flex flex-wrap'>
                {itemsToDisplay.map(item => <motion.div key={item} className='desktop:w-[32%] tablet:w-[48%] mobile:w-full h-auto bg-white p-10 m-1 flex-col flex border-b border-r shadow-xl'
                                            initial={{opacity: 0, y:-50}}
                                            whileInView={{opacity: 1, y:0}}
                                            viewport={{once: true}}
                                            ><Item key={item.uid} item={item} setCartCount={setCartCount}/></motion.div>) }
            </div>
        </div>
    );
};

Shop.propTypes = {
    setCartCount: PropTypes.func
}
export default Shop;
