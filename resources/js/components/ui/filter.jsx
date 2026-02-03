import React from 'react';
import { router } from '@inertiajs/react';

const Filters = ({ categories = [], currentCategory }) => {

    const handleFilter = (slug) => {
        router.get(route('shop.index'),
            { category: slug },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['products', 'currentCategory'],
            }
        );
    };

    return (
        <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pr-4">

                {/* Bouton View All */}
                <button
                    onClick={() => handleFilter(null)}
                    className={`px-5 py-2 cursor-pointer rounded-full border text-[10px] uppercase tracking-[0.15em] transition-all duration-300
                        ${!currentCategory
                            ? 'bg-gray-100 border-gray-100 font-bold text-black cursor-pointer'
                            : 'border-gray-200 text-gray-400 hover:border-black hover:text-black cursor-pointer'}`}
                >
                    View all
                </button>

                {/* Mapping des catégories */}
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleFilter(cat.slug)}
                        className={`cursor-pointer px-5 py-2 rounded-full border text-[10px] uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300
                            ${currentCategory === cat.slug
                                ? 'bg-gray-100 border-gray-100 font-bold text-black'
                                : 'border-gray-200 text-gray-400 hover:border-black hover:text-black'}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>


        </div>
    );
};

export default Filters;