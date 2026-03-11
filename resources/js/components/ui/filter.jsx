import { Link } from '@inertiajs/react';

export default function Filters({ categories, currentCategory, baseRoute = 'shop.index' }) {
    if (!categories || categories.length === 0) {
        return <p className="text-red-500 text-xs px-8">Aucune catégorie disponible</p>;
    }

    const pillBase = "text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 rounded-full px-4 py-1.5";

    return (
        <div className="flex gap-2 px-8 py-6 flex-wrap">
            <Link
                href={route(baseRoute)}
                className={`${pillBase} ${!currentCategory
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
            >
                All
            </Link>

            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={route(baseRoute, { category: category.slug })}
                    className={`${pillBase} ${currentCategory === category.slug
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}
