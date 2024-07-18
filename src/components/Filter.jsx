import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ItemsContext } from '../ItemsContext.jsx';

const Filter = ({ updateItems }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedFilter, setSelectedFilter] = useState('None');
    const shoppingData = useContext(ItemsContext);

    useEffect(() => {
        updateItems(selectedCategory, selectedFilter);
    }, [selectedCategory, selectedFilter]);

    // Extracting unique categories from shoppingData
    const categories = shoppingData.reduce((uniqueCategories, item) => {
        if (!uniqueCategories.includes(item.category)) {
            uniqueCategories.push(item.category);
        }
        return uniqueCategories;
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    return (
        <div className='flex tablet:flex-col mobile:flex-row p-4 text-left mobile:justify-around tablet:justify-start items-start'>
            {/* Category filter */}
            <form className='flex-col flex justify-start'>
                <h1 className='laptop:text-lg font-semibold tablet:pb-2'>Select Category</h1>
                <div className='flex'>
                    <input
                        type='radio'
                        id='all'
                        data-testid='all'
                        name='Category'
                        value='All'
                        checked={selectedCategory === 'All'}
                        onChange={() => handleCategoryChange('All')}
                    />
                    <label className='pl-2 capitalize'>All</label>
                </div>
                {categories.map((category) => (
                    <div key={category} className='flex'>
                        <input
                            type='radio'
                            id={category}
                            data-testid={category}
                            name='Category'
                            value={category}
                            checked={selectedCategory === category}
                            onChange={() => handleCategoryChange(category)}
                        />
                        <label className='pl-2 capitalize mobile:text-xs'>{category}</label>
                    </div>
                ))}
            </form>

            {/* Filter options */}
            <form className='flex-col flex justify-start'>
                <h1 className='laptop:text-lg font-semibold tablet:py-2 mobile:py-0'>Filter By:</h1>
                <div className='flex'>
                    <input
                        type='radio'
                        id='None'
                        data-testid='none'
                        name='Filter'
                        checked={selectedFilter === 'None'}
                        onChange={() => handleFilterChange('None')}
                    />
                    <label className='pl-2 capitalize'>None</label>
                </div>
                <div className='flex'>
                    <input
                        type='radio'
                        id='Least Expensive'
                        data-testid='least expensive'
                        name='Filter'
                        value='Least Expensive'
                        checked={selectedFilter === 'Least Expensive'}
                        onChange={() => handleFilterChange('Least Expensive')}
                    />
                    <label className='pl-2 capitalize'>Least Expensive</label>
                </div>
                <div className='flex'>
                    <input
                        type='radio'
                        id='Most Expensive'
                        data-testid='most expensive'
                        name='Filter'
                        value='Most Expensive'
                        checked={selectedFilter === 'Most Expensive'}
                        onChange={() => handleFilterChange('Most Expensive')}
                    />
                    <label className='pl-2 capitalize'>Most Expensive</label>
                </div>
                <div className='flex'>
                    <input
                        type='radio'
                        id='Highest Rated'
                        data-testid='highest rated'
                        name='Filter'
                        value='Highest Rated'
                        checked={selectedFilter === 'Highest Rated'}
                        onChange={() => handleFilterChange('Highest Rated')}
                    />
                    <label className='pl-2 capitalize'>Highest Rated</label>
                </div>
            </form>
        </div>
    );
};

Filter.propTypes = {
    updateItems: PropTypes.func.isRequired,
};

export default Filter;