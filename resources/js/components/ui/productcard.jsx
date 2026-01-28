import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="group flex flex-col gap-4 w-full cursor-pointer">

            <div className="relative aspect-[3/5] w-full overflow-hidden bg-[#F5F5F5]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />


                {product.tag && (
                    <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest">
                        {product.tag}
                    </span>
                )}
            </div>


            <div className="flex flex-col gap-1 px-1">
                <h3 className="text-[13px] font-light text-gray-900 uppercase tracking-tight">
                    {product.name}
                </h3>
                <p className="text-[14px] font-semibold text-gray-900">
                    ${product.price}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;