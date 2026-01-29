import { Link } from '@inertiajs/react';
import logo from '@/assets/images/logo.png';

export default function AppLogo() {
    return (
        <Link href="/" className="flex items-center gap-3 group">
            {/* Logo avec un léger filtre de luminosité au hover */}
            <img
                src={logo}
                alt="Logo"
                className="size-8 object-contain transition-transform duration-500 group-hover:scale-110"
            />

            {/* Texte adaptatif */}
            <span className={`
                text-xl font-[1000] tracking-tighter uppercase italic skew-x-[-10deg] transition-all duration-500
                /* Mode Light : Noir pur et solide */
                text-black 
                /* Mode Dark : Effet Chrome Liquide */
                dark:bg-gradient-to-br dark:from-[#fff] dark:via-[#888] dark:to-[#eee] dark:bg-clip-text dark:text-transparent
            `}>
                WEVA
            </span>
        </Link>
    );
}