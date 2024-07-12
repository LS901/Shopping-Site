import {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { ItemsContext } from "../ItemsContext.jsx";
function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}
const Filter = ({ updateItems }) => {
    const [ selectedCategory, setSelectedCategory] = useState('All')
    const [ selectedFilter, setSelectedFilter] = useState('None')
    const shoppingData = useContext(ItemsContext);
    const filteredData = shoppingData.map(e => e.category);
    const categories = filteredData.filter(onlyUnique);

    useEffect(() => {
        updateItems(selectedCategory,selectedFilter)
    },[selectedCategory, selectedFilter])

    return (
        <div className='flex tablet:flex-col mobile:flex-row p-4 text-left mobile:justify-around tablet:justify-start items-start'>
            <form className='flex-col flex justify-start'>
                <h1 className='laptop:text-lg font-semibold tablet:pb-2'>Select Category</h1>
                <div className='flex'>
                    <input type='radio' id='all' name='Category' value='all' onClick={() => setSelectedCategory('All')} />
                    <label className='pl-2 capitalize'>All</label><br/>
                </div>
                {categories?.map(item => {
                    return(
                    <div key={item} className='flex'>
                        <input type='radio' id={item} name='Category' value={item} onClick={() => setSelectedCategory(item)}/>
                        <label className='pl-2 capitalize mobile:text-xs'>{item}</label><br/>
                    </div>
                    )
                })}
            </form>
            <form className='flex-col flex justify-start'>
                <h1 className='laptop:text-lg font-semibold tablet:py-2 mobile:py-0'>Filter By:</h1>
                <div className='flex'>
                    <input type='radio' id='None' name='Filter' onClick={() => setSelectedFilter('None')}/>
                    <label className='pl-2 capitalize'>None</label><br/>
                </div>
                <div className='flex'>
                    <input type='radio' id='Least Expensive' name='Filter' value='Least Expensive' onClick={() => setSelectedFilter('Least Expensive')} />
                    <label className='pl-2 capitalize'>Least Expensive</label><br/>
                </div>
                <div className='flex'>
                    <input type='radio' id='Most Expensive' name='Filter' value='Most Expensive' onClick={() => setSelectedFilter('Most Expensive')}/>
                    <label className='pl-2 capitalize'>Most Expensive</label><br/>
                </div>
                <div className='flex'>
                    <input type='radio' id='Highest Rated' name='Filter' value='Highest Rated' onClick={() => setSelectedFilter('Highest Rated')} />
                    <label className='pl-2 capitalize'>Highest Rated</label><br/>
                </div>
            </form>

        </div>
    );
};

Filter.propTypes = {
    updateItems: PropTypes.func
};

export default Filter;
