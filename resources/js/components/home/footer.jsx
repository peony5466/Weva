import { Link } from '@inertiajs/react';
import { Instagram, Mail } from 'lucide-react';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-black text-white">

            {/* Top band */}
            <div className="border-b border-white/10 px-8 py-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <p className="text-2xl font-black uppercase tracking-[0.3em] mb-4">WEVA</p>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-light max-w-[180px]">
                            Pièces exclusives & limitées. Chaque article est une édition.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white transition-colors"
                            >
                                <Instagram size={13} />
                            </a>
                            <a
                                href="mailto:contact@weva.fr"
                                className="w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white transition-colors"
                            >
                                <Mail size={13} />
                            </a>
                        </div>
                    </div>

                    {/* Boutique */}
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 mb-5">
                            Boutique
                        </p>
                        <ul className="space-y-3">
                            {[
                                { label: 'Nouvelle collection', href: route('shop.index') },
                                { label: 'Pièces limitées', href: route('shop.index') },
                                { label: 'Mon panier', href: '#' },
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        className="text-[11px] text-gray-400 uppercase tracking-[0.15em] hover:text-white transition-colors font-light"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Compte */}
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 mb-5">
                            Mon compte
                        </p>
                        <ul className="space-y-3">
                            {[
                                { label: 'Espace WEVA VIP', href: route('wevavip') },
                                { label: 'Mes tokens', href: route('tokens.my-wallet') },
                                { label: 'Mes commandes', href: '/dashboard/orders' },
                                { label: 'Connexion', href: route('login') },
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        className="text-[11px] text-gray-400 uppercase tracking-[0.15em] hover:text-white transition-colors font-light"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Légal */}
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 mb-5">
                            Informations
                        </p>
                        <ul className="space-y-3">
                            {[
                                { label: 'Conditions générales de vente', href: '/cgv' },
                                { label: 'Politique de confidentialité', href: '/confidentialite' },
                                { label: 'Mentions légales', href: '/legal' },
                                { label: 'Contact', href: 'mailto:contact@weva.fr' },
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    {href.startsWith('mailto') ? (
                                        <a
                                            href={href}
                                            className="text-[11px] text-gray-400 uppercase tracking-[0.15em] hover:text-white transition-colors font-light"
                                        >
                                            {label}
                                        </a>
                                    ) : (
                                        <Link
                                            href={href}
                                            className="text-[11px] text-gray-400 uppercase tracking-[0.15em] hover:text-white transition-colors font-light"
                                        >
                                            {label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="px-8 py-6">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em]">
                        © {year} WEVA SAS — Tous droits réservés
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/cgv" className="text-[9px] text-gray-600 uppercase tracking-[0.2em] hover:text-gray-400 transition-colors">
                            CGV
                        </Link>
                        <Link href="/confidentialite" className="text-[9px] text-gray-600 uppercase tracking-[0.2em] hover:text-gray-400 transition-colors">
                            Confidentialité
                        </Link>
                        <Link href="/legal" className="text-[9px] text-gray-600 uppercase tracking-[0.2em] hover:text-gray-400 transition-colors">
                            Mentions légales
                        </Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}
