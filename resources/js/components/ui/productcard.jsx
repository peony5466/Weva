// import { Link } from '@inertiajs/react';

// export default function ProductCard({ product }) {
//     if (!product) return null;

//     const imageSrc = product.image_path
//         ? product.image_path.startsWith('http')
//             ? product.image_path
//             : `/storage/${product.image_path.replace('storage/', '')}`
//         : null;

//     return (
//         <Link
//             href={route('shop.show', { product: product.slug })}
//             className="flex flex-col items-start w-full group cursor-pointer"
//         >
//             <div className="w-full aspect-[4/3] bg-[#f5f5f3] flex items-center justify-center mb-4 overflow-hidden">
//                 {imageSrc ? (
//                     <img
//                         src={imageSrc}
//                         alt={product.name}
//                         className="w-[75%] h-[75%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
//                     />
//                 ) : (
//                     <span className="text-[10px] text-gray-400">No Image</span>
//                 )}
//             </div>

//             <div className="text-left">
//                 <h3 className="text-[13px] font-medium text-black leading-tight">
//                     {product.name || 'Nom du produit'}
//                 </h3>
//                 <p className="text-[13px] text-gray-500 mt-1">
//                     € {Number(product.price).toFixed(2)}
//                 </p>
//             </div>
//         </Link>
//     );
// }
