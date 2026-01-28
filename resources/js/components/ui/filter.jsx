import React, { useState } from 'react';

const Filters = () => {
    const [activeFilter, setActiveFilter] = useState('Best sellers');

    const categories = ['Best sellers', 'New arrivals', 'Sale items', 'Top rated'];

    return (

        <div className="pt-12 ml-8">
            <div className="flex items-center gap-3 p-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`
              px-6 py-2 rounded-full border text-sm font-medium transition-all duration-200
              cursor-pointer 
              ${activeFilter === category
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}
            `}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filters;