import ClientLayout from '@/layouts/client-layout';
import { Head, Link } from '@inertiajs/react';

export default function MentionsLegales() {
    return (
        <ClientLayout>
            <Head title="Mentions Légales — WEVA" />

            <div className="min-h-screen bg-[#faf8f4] pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">

                    {/* Header */}
                    <div className="mb-16 pb-10 border-b border-gray-200">
                        <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-4">
                            WEVA · Informations Légales
                        </p>
                        <h1 className="text-2xl md:text-4xl font-semibold uppercase tracking-[0.1em] md:tracking-[0.15em]">
                            Mentions Légales
                        </h1>
                        <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em]">
                            Conformément à la loi n°2004-575 du 21 juin 2004 (LCEN)
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-0">

                        {/* Éditeur */}
                        <div className="border-t border-gray-200 py-10">
                            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] shrink-0 pt-1 w-8">01</span>
                                <div className="flex-1">
                                    <h2 className="text-[13px] font-black uppercase tracking-[0.25em] text-black mb-5">
                                        Éditeur du Site
                                    </h2>
                                    <div className="bg-white border border-gray-100 p-6 space-y-3">
                                        {[
                                            ['Raison sociale', 'WEVA SAS'],
                                            ['Forme juridique', 'Société par Actions Simplifiée (SAS)'],
                                            ['Capital social', '10 000 €'],
                                            ['RCS', 'Paris B XXX XXX XXX'],
                                            ['N° TVA intracommunautaire', 'FR XX XXX XXX XXX'],
                                            ['Siège social', '1 Rue de la Paix, 75001 Paris, France'],
                                            ['E-mail', 'contact@weva.fr'],
                                            ['Directeur de publication', 'Le Président de WEVA SAS'],
                                        ].map(([label, value]) => (
                                            <div key={label} className="flex flex-col md:flex-row gap-1 md:gap-6">
                                                <span className="text-[10px] font-black uppercase tracking-wide text-gray-400 shrink-0 w-52">
                                                    {label}
                                                </span>
                                                <span className="text-[12px] text-black font-light">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hébergement */}
                        <div className="border-t border-gray-200 py-10">
                            <div className="flex items-start gap-8">
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] shrink-0 pt-1 w-auto md:w-8">02</span>
                                <div className="flex-1">
                                    <h2 className="text-[13px] font-black uppercase tracking-[0.25em] text-black mb-5">
                                        Hébergement
                                    </h2>
                                    <div className="bg-white border border-gray-100 p-6 space-y-3">
                                        {[
                                            ['Hébergeur', 'OVH SAS'],
                                            ['Adresse', '2 rue Kellermann, 59100 Roubaix, France'],
                                            ['Site web', 'www.ovh.com'],
                                        ].map(([label, value]) => (
                                            <div key={label} className="flex flex-col md:flex-row gap-1 md:gap-6">
                                                <span className="text-[10px] font-black uppercase tracking-wide text-gray-400 shrink-0 w-full md:w-52">
                                                    {label}
                                                </span>
                                                <span className="text-[12px] text-black font-light">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Propriété intellectuelle */}
                        <div className="border-t border-gray-200 py-10">
                            <div className="flex items-start gap-8">
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] shrink-0 pt-1 w-8">03</span>
                                <div className="flex-1">
                                    <h2 className="text-[13px] font-black uppercase tracking-[0.25em] text-black mb-5">
                                        Propriété Intellectuelle
                                    </h2>
                                    <p className="text-[13px] leading-7 text-gray-600 font-light mb-4">
                                        L'ensemble des éléments constituant le site weva.fr (textes, photographies, visuels, logos, base de données, logiciels, structure) sont protégés par le droit de la propriété intellectuelle et restent la propriété exclusive de WEVA SAS.
                                    </p>
                                    <p className="text-[13px] leading-7 text-gray-600 font-light mb-4">
                                        Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable de WEVA SAS.
                                    </p>
                                    <p className="text-[13px] leading-7 text-gray-600 font-light">
                                        La marque WEVA™ et le logotype associé sont des marques déposées. Toute utilisation non autorisée constitue une contrefaçon sanctionnée par les articles L713-2 et suivants du Code de la Propriété Intellectuelle.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Données personnelles */}
                        <div className="border-t border-gray-200 py-10">
                            <div className="flex items-start gap-8">
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] shrink-0 pt-1 w-8">04</span>
                                <div className="flex-1">
                                    <h2 className="text-[13px] font-black uppercase tracking-[0.25em] text-black mb-5">
                                        Données Personnelles & RGPD
                                    </h2>
                                    <p className="text-[13px] leading-7 text-gray-600 font-light mb-6">
                                        Le traitement des données personnelles collectées via ce site est effectué par WEVA SAS, responsable du traitement, conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés.
                                    </p>
                                    <Link
                                        href="/confidentialite"
                                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] border-b border-black pb-1 hover:opacity-60 transition-opacity"
                                    >
                                        Consulter notre Politique de Confidentialité →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Cookies */}
                        <div className="border-t border-gray-200 py-10">
                            <div className="flex items-start gap-8">
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] shrink-0 pt-1 w-8">05</span>
                                <div className="flex-1">
                                    <h2 className="text-[13px] font-black uppercase tracking-[0.25em] text-black mb-5">
                                        Cookies
                                    </h2>
                                    <p className="text-[13px] leading-7 text-gray-600 font-light">
                                        Le site weva.fr utilise des cookies nécessaires à son bon fonctionnement (session, panier) ainsi que des cookies analytiques avec votre consentement. Vous pouvez paramétrer votre navigateur pour refuser les cookies, ce qui pourrait affecter certaines fonctionnalités du site. Pour en savoir plus, consultez notre politique de confidentialité.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Responsabilité */}
                        <div className="border-t border-gray-200 py-10">
                            <div className="flex items-start gap-8">
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] shrink-0 pt-1 w-8">06</span>
                                <div className="flex-1">
                                    <h2 className="text-[13px] font-black uppercase tracking-[0.25em] text-black mb-5">
                                        Limitation de Responsabilité
                                    </h2>
                                    <p className="text-[13px] leading-7 text-gray-600 font-light mb-4">
                                        WEVA SAS s'efforce de maintenir le site weva.fr accessible et à jour. Toutefois, WEVA ne saurait être tenue responsable des erreurs ou omissions dans les informations publiées, des interruptions d'accès au site, ou des dommages directs ou indirects résultant de l'utilisation du site.
                                    </p>
                                    <p className="text-[13px] leading-7 text-gray-600 font-light">
                                        Les liens hypertextes présents sur le site peuvent rediriger vers des sites tiers sur lesquels WEVA n'exerce aucun contrôle. WEVA décline toute responsabilité quant au contenu de ces sites.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Droit applicable */}
                        <div className="border-t border-gray-200 py-10">
                            <div className="flex items-start gap-8">
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] shrink-0 pt-1 w-8">07</span>
                                <div className="flex-1">
                                    <h2 className="text-[13px] font-black uppercase tracking-[0.25em] text-black mb-5">
                                        Droit Applicable & Juridiction
                                    </h2>
                                    <p className="text-[13px] leading-7 text-gray-600 font-light">
                                        Les présentes mentions légales sont soumises au droit français. En cas de litige relatif à l'interprétation ou à l'exécution des présentes, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut d'accord amiable, tout litige sera soumis à la compétence exclusive des tribunaux de Paris.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Liens rapides légaux */}
                    <div className="border-t border-gray-200 pt-12 mt-4">
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-6 text-center">
                            Documents légaux
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { label: 'CGV', href: '/cgv', sub: 'Conditions Générales de Vente' },
                                { label: 'Confidentialité', href: '/confidentialite', sub: 'Politique RGPD' },
                                { label: 'Mentions légales', href: '/legal', sub: 'Document actuel' },
                            ].map((doc) => (
                                <Link
                                    key={doc.label}
                                    href={doc.href}
                                    className="bg-white border border-gray-100 p-5 hover:border-black transition-colors group text-center"
                                >
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black mb-1 group-hover:underline">
                                        {doc.label}
                                    </p>
                                    <p className="text-[9px] text-gray-400 uppercase tracking-wide">
                                        {doc.sub}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </ClientLayout>
    );
}
