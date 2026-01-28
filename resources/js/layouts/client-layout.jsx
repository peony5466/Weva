import Navbar from '@/components/home/navbar';

export default function ClientLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">

            {/* <Navbar /> */}
            <main className="pt-20">
                {children}
            </main>

        </div>
    );
}