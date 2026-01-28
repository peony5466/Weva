import { Link } from '@inertiajs/react';
import logo from '@/assets/images/logo.png';
export default function AppLogo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="size-8 object-contain" />
            <span className="font-bold text-black">WEVA</span>
        </Link>
    );
}