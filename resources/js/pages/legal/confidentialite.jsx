import ClientLayout from '@/layouts/client-layout';
import { Head } from '@inertiajs/react';

const rights = [
    { code: 'Art. 15', label: 'Droit d\'accès', desc: 'Obtenir la confirmation que vos données sont traitées et en recevoir une copie.' },
    { code: 'Art. 16', label: 'Droit de rectification', desc: 'Faire corriger des données inexactes ou incomplètes vous concernant.' },
    { code: 'Art. 17', label: 'Droit à l\'effacement', desc: 'Demander la suppression de vos données (« droit à l\'oubli »).' },
    { code: 'Art. 18', label: 'Droit à la limitation', desc: 'Obtenir la suspension temporaire du traitement de vos données.' },
    { code: 'Art. 20', label: 'Droit à la portabilité', desc: 'Recevoir vos données dans un format structuré et lisible par machine.' },
    { code: 'Art. 21', label: 'Droit d\'opposition', desc: 'Vous opposer au traitement de vos données à des fins de prospection commerciale.' },
];

const dataTypes = [
    { label: 'Données d\'identité', detail: 'Nom, prénom, adresse e-mail, mot de passe (haché)' },
    { label: 'Données de contact', detail: 'Adresse postale, numéro de téléphone' },
    { label: 'Données de commande', detail: 'Articles, montants, historique, tokens WEVA' },
    { label: 'Données de navigation', detail: 'Adresse IP, pages visitées, durée de session (cookies analytiques)' },
    { label: 'Données de paiement', detail: 'Traitement exclusivement par Stripe — aucune donnée bancaire stockée par WEVA' },
];

const sections = [
    {
        id: '01',
        title: 'Responsable du Traitement',
        content: `WEVA SAS, dont le siège social est situé à Paris, France, est responsable du traitement de vos données à caractère personnel collectées via le site weva.fr.

Contact Délégué à la Protection des Données (DPO) : privacy@weva.fr

WEVA traite vos données conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi française Informatique et Libertés du 6 janvier 1978 modifiée.`,
    },
    {
        id: '02',
        title: 'Données Collectées',
        content: `Nous collectons uniquement les données strictement nécessaires à la fourniture de nos services. Vous trouverez ci-dessous les catégories de données que nous traitons.`,
        table: true,
    },
    {
        id: '03',
        title: 'Finalités & Bases Légales du Traitement',
        content: `Vos données sont traitées pour les finalités suivantes :

Exécution du contrat (art. 6.1.b RGPD) : traitement des commandes, gestion des livraisons, gestion des retours et remboursements, gestion du programme de fidélité Tokens WEVA.

Intérêt légitime (art. 6.1.f RGPD) : amélioration de nos services, prévention de la fraude, sécurité du site, analyses statistiques anonymisées.

Consentement (art. 6.1.a RGPD) : envoi de newsletters et communications marketing. Vous pouvez retirer ce consentement à tout moment depuis votre espace client ou via le lien de désinscription présent dans chaque e-mail.

Obligation légale (art. 6.1.c RGPD) : conservation des données de facturation pendant 10 ans conformément au Code de commerce.`,
    },
    {
        id: '04',
        title: 'Durées de Conservation',
        content: `Données de compte client : conservées pendant toute la durée de la relation commerciale, puis 3 ans après la dernière commande à des fins de prospection.

Données de commande et de facturation : conservées 10 ans conformément aux obligations légales comptables.

Tokens WEVA : valables 12 mois après leur attribution. Les données associées sont conservées jusqu'à l'expiration.

Cookies analytiques : 13 mois maximum conformément aux recommandations CNIL.

Données de prospection marketing : 3 ans à compter du dernier contact ou jusqu'au retrait du consentement.`,
    },
    {
        id: '05',
        title: 'Destinataires des Données',
        content: `Vos données sont traitées par les seuls employés et sous-traitants de WEVA habilités à y accéder pour l'exécution de leurs missions.

Nos sous-traitants techniques incluent : Stripe (paiement sécurisé, États-Unis, certifié PCI-DSS et adhérent au Privacy Shield), les transporteurs partenaires (La Poste, Colissimo, Chronopost) pour la livraison, et notre hébergeur cloud dont les serveurs sont localisés dans l'Union Européenne.

Nous ne vendons, ne louons, et ne cédons jamais vos données personnelles à des tiers à des fins commerciales propres.`,
    },
    {
        id: '06',
        title: 'Transferts Hors UE',
        content: `Certains de nos sous-traitants (notamment Stripe) sont établis hors de l'Union Européenne. Ces transferts sont encadrés par les Clauses Contractuelles Types de la Commission Européenne, garantissant un niveau de protection équivalent à celui requis par le RGPD.

Aucun autre transfert de données hors de l'Union Européenne n'est effectué sans garantie appropriée.`,
    },
    {
        id: '07',
        title: 'Cookies & Technologies de Suivi',
        content: `WEVA utilise différents types de cookies :

Cookies strictement nécessaires : indispensables au fonctionnement du site (session, panier, authentification). Ils ne nécessitent pas votre consentement.

Cookies analytiques (avec consentement) : nous utilisons des outils d'analyse anonymisés pour mesurer l'audience et améliorer notre site. Vous pouvez refuser ces cookies sans impact sur votre navigation.

Cookies de préférences : mémorisent vos choix (langue, devise). Vous pouvez les désactiver depuis votre navigateur.

Vous pouvez gérer vos préférences cookies à tout moment depuis le bandeau de consentement accessible en bas de page.`,
    },
    {
        id: '08',
        title: 'Sécurité des Données',
        content: `WEVA met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou divulgation.

Ces mesures incluent : chiffrement SSL/TLS de toutes les communications, mots de passe hachés avec bcrypt, accès aux données restreint aux seuls employés habilités, audits de sécurité réguliers, et hébergement sur infrastructure certifiée ISO 27001.

En cas de violation de données susceptible d'engendrer un risque élevé pour vos droits et libertés, nous vous en informerons dans les meilleurs délais conformément à l'art. 34 du RGPD.`,
    },
    {
        id: '09',
        title: 'Vos Droits RGPD',
        content: `Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles.`,
        rights: true,
    },
    {
        id: '10',
        title: 'Exercer Vos Droits & Réclamation',
        content: `Pour exercer l'un de vos droits, contactez-nous par e-mail à privacy@weva.fr en précisant votre nom, votre adresse e-mail de compte, et la nature de votre demande. Nous répondrons dans un délai de 30 jours. Une pièce d'identité pourra être demandée pour vérifier votre identité.

Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr — 3 Place de Fontenoy, 75007 Paris.`,
    },
    {
        id: '11',
        title: 'Modification de la Politique',
        content: `WEVA se réserve le droit de modifier la présente politique de confidentialité à tout moment pour s'adapter aux évolutions légales ou techniques. Toute modification substantielle vous sera notifiée par e-mail ou via un bandeau informatif sur le site.

La version en vigueur est celle disponible en permanence à l'adresse weva.fr/confidentialite. Nous vous encourageons à la consulter régulièrement.`,
    },
];

export default function Confidentialite() {
    return (
        <ClientLayout>
            <Head title="Politique de Confidentialité — WEVA" />

            <div className="min-h-screen bg-[#faf8f4] pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-6">

                    {/* Header */}
                    <div className="mb-16 pb-10 border-b border-gray-200">
                        <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-4">
                            WEVA · Protection des Données
                        </p>
                        <h1 className="text-4xl font-semibold uppercase tracking-[0.15em] text-black mb-4">
                            Politique de<br />Confidentialité
                        </h1>
                        <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em]">
                            Conforme RGPD (UE 2016/679) · Mise à jour : Janvier 2026
                        </p>
                    </div>

                    {/* RGPD Badge */}
                    <div className="bg-black text-white p-8 mb-12">
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">
                            Engagement WEVA
                        </p>
                        <p className="text-[13px] leading-relaxed text-gray-300 font-light">
                            WEVA accorde une importance primordiale à la protection de vos données personnelles. Nous ne collectons que les données strictement nécessaires, nous ne les vendons jamais, et nous vous donnons un contrôle total sur leur utilisation.
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-0">
                        {sections.map((section) => (
                            <div key={section.id} className="border-t border-gray-200 py-10">
                                <div className="flex items-start gap-8">
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] shrink-0 pt-1 w-8">
                                        {section.id}
                                    </span>
                                    <div className="flex-1">
                                        <h2 className="text-[13px] font-black uppercase tracking-[0.25em] text-black mb-5">
                                            {section.title}
                                        </h2>

                                        {section.content.split('\n\n').map((para, j) => (
                                            <p key={j} className="text-[13px] leading-7 text-gray-600 font-light mb-4">
                                                {para}
                                            </p>
                                        ))}

                                        {/* Data table */}
                                        {section.table && (
                                            <div className="mt-4 border border-gray-200 overflow-hidden">
                                                {dataTypes.map((d, i) => (
                                                    <div key={i} className={`flex gap-6 px-5 py-4 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f8f7f4]'}`}>
                                                        <span className="text-[11px] font-black uppercase tracking-wide text-black shrink-0 w-40">
                                                            {d.label}
                                                        </span>
                                                        <span className="text-[11px] text-gray-500 font-light">
                                                            {d.detail}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Rights grid */}
                                        {section.rights && (
                                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {rights.map((r) => (
                                                    <div key={r.code} className="bg-white border border-gray-100 p-5">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-100 px-2 py-0.5">
                                                                {r.code}
                                                            </span>
                                                            <span className="text-[11px] font-black uppercase tracking-wide text-black">
                                                                {r.label}
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                                                            {r.desc}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact block */}
                    <div className="border-t border-gray-200 pt-10 mt-4">
                        <div className="bg-white border border-gray-100 p-8 text-center">
                            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-3">
                                Contact DPO
                            </p>
                            <p className="text-[13px] font-semibold text-black mb-1">privacy@weva.fr</p>
                            <p className="text-[11px] text-gray-400">Réponse garantie sous 30 jours ouvrés</p>
                        </div>
                    </div>

                </div>
            </div>
        </ClientLayout>
    );
}
