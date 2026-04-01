import logo from '@/assets/images/logo.png';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-3 group">
            <img
                src={logo}
                alt="Logo"
                className="size-8 object-contain transition-transform duration-500 group-hover:scale-110"
            />
            <span className="text-xl font-[1000] tracking-tighter uppercase italic skew-x-[-10deg] transition-all duration-500 text-black dark:bg-gradient-to-br dark:from-[#fff] dark:via-[#888] dark:to-[#eee] dark:bg-clip-text dark:text-transparent">
                WEVA
            </span>
        </div>
    );
}
