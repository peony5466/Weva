import ClientLayout from '@/layouts/client-layout';
import { Head } from '@inertiajs/react';

const sections = [
    {
        id: '01',
        title: 'Objet & Champ d\'application',
        content: `Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent l'ensemble des ventes conclues entre WEVA (ci-après « le Vendeur ») et tout acheteur non-professionnel (ci-après « le Client ») via la boutique en ligne accessible à l'adresse weva.fr.

Toute commande passée sur le site implique l'acceptation pleine et entière des présentes CGV. Le Vendeur se réserve le droit de modifier ces CGV à tout moment ; les CGV applicables sont celles en vigueur à la date de la commande.

Ces CGV sont soumises au droit français. Tout litige relatif à leur interprétation ou à leur exécution relèvera de la compétence des tribunaux français.`,
    },
    {
        id: '02',
        title: 'Produits & Disponibilité',
        content: `Les produits proposés à la vente sont ceux décrits sur le site au moment de la consultation par le Client. WEVA s'engage à honorer les commandes reçues dans la limite des stocks disponibles.

En cas d'indisponibilité d'un produit après passation de la commande, le Client en sera informé par e-mail dans les meilleurs délais. La commande pourra être annulée et le remboursement intégral sera effectué dans un délai de 14 jours.

Les photographies et descriptions des produits sont les plus fidèles possibles mais ne peuvent assurer une similitude parfaite, notamment en ce qui concerne les nuances de couleurs selon les paramètres de l'écran du Client.`,
    },
    {
        id: '03',
        title: 'Prix',
        content: `Les prix sont indiqués en euros (€) toutes taxes comprises (TTC). WEVA se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix applicable est celui en vigueur au moment de la validation de la commande.

Les frais de livraison sont indiqués séparément lors du processus de commande avant validation définitive. La livraison standard est offerte sur l'ensemble du territoire français métropolitain.

En cas d'erreur manifeste de prix, WEVA se réserve le droit d'annuler la commande concernée, après en avoir informé le Client par e-mail.`,
    },
    {
        id: '04',
        title: 'Programme de Fidélité — Tokens WEVA',
        content: `WEVA propose un programme de fidélité basé sur un système de tokens. Chaque euro dépensé génère 1 token crédité automatiquement sur le compte du Client après livraison confirmée.

À partir de 250 tokens cumulés, le Client bénéficie automatiquement d'une réduction de 15 % (cashback) appliquée sur sa prochaine commande. Ce cashback est non cumulable avec d'autres offres promotionnelles.

Les tokens WEVA sont strictement personnels, non cessibles, et ne peuvent être convertis en espèces. Ils sont valables pendant 12 mois à compter de leur attribution. En cas de retour produit, les tokens correspondants à l'achat annulé sont déduits du solde.`,
    },
    {
        id: '05',
        title: 'Commande & Formation du Contrat',
        content: `Le processus de commande se déroule comme suit : sélection des produits, ajout au panier, identification ou commande en tant qu'invité, saisie des informations de livraison, validation du récapitulatif et confirmation de paiement.

La commande est définitivement confirmée lorsque le Client clique sur le bouton « Payer » et reçoit un e-mail de confirmation. Cet e-mail constitue la conclusion du contrat de vente.

Le Vendeur se réserve le droit de refuser ou d'annuler toute commande d'un Client avec lequel il existerait un litige relatif au paiement d'une commande antérieure, ou en cas de suspicion de fraude.`,
    },
    {
        id: '06',
        title: 'Paiement',
        content: `Le paiement s'effectue en ligne par carte bancaire (Visa, Mastercard, American Express) via notre prestataire de paiement sécurisé Stripe. Les transactions sont chiffrées selon le protocole SSL.

Le compte bancaire du Client est débité au moment de la validation de la commande. En cas de refus de paiement par la banque, la commande est automatiquement annulée et le Client en est informé par e-mail.

WEVA ne stocke aucune donnée bancaire sur ses serveurs. L'ensemble des informations de paiement est géré exclusivement par Stripe conformément aux normes PCI-DSS.`,
    },
    {
        id: '07',
        title: 'Livraison',
        content: `Les commandes sont traitées et expédiées dans un délai de 1 à 3 jours ouvrés. La livraison standard est estimée entre 3 et 5 jours ouvrés à compter de l'expédition.

WEVA livre en France métropolitaine, en Corse et dans les DOM-TOM. Les délais indiqués sont donnés à titre indicatif ; tout retard de livraison ne pourra pas donner lieu à dommages et intérêts.

En cas de colis endommagé ou manquant, le Client dispose de 48 heures suivant la réception pour signaler le problème au Service Client par e-mail à contact@weva.fr.`,
    },
    {
        id: '08',
        title: 'Droit de Rétractation',
        content: `Conformément à l'article L221-18 du Code de la consommation, le Client dispose d'un délai de 14 jours à compter de la réception du colis pour exercer son droit de rétractation, sans avoir à justifier de motif.

Pour exercer ce droit, le Client doit notifier sa décision par e-mail à contact@weva.fr ou via son espace client. Les produits doivent être retournés dans leur état d'origine, non portés, non lavés, avec leurs étiquettes d'origine.

Le remboursement intégral, incluant les frais de livraison initiaux, sera effectué dans un délai de 14 jours suivant la réception du retour, par le même moyen de paiement que celui utilisé lors de l'achat. Les frais de retour sont à la charge du Client sauf en cas de produit défectueux.`,
    },
    {
        id: '09',
        title: 'Garanties Légales',
        content: `Tous les produits WEVA bénéficient de la garantie légale de conformité (articles L217-4 et suivants du Code de la consommation) et de la garantie légale contre les vices cachés (articles 1641 et suivants du Code civil).

En cas de défaut de conformité, le Client peut exiger la réparation ou le remplacement du produit, ou, si cela est impossible, le remboursement du prix. Cette garantie s'applique pendant 2 ans à compter de la livraison.

Pour tout problème de qualité ou de conformité, le Client doit contacter le Service Client à contact@weva.fr en joignant des photos du défaut constaté.`,
    },
    {
        id: '10',
        title: 'Responsabilité',
        content: `WEVA ne saurait être tenu responsable des dommages résultant d'une mauvaise utilisation du produit, d'un entretien non conforme aux indications, ou d'une modification du produit par le Client.

La responsabilité de WEVA est limitée au montant de la commande concernée. WEVA ne saurait être tenu responsable des préjudices indirects tels que perte de chance, préjudice commercial ou financier.

WEVA s'engage à mettre en œuvre tous les moyens raisonnables pour assurer la sécurité et la disponibilité de son site, mais ne peut garantir l'absence d'interruption ou d'erreur.`,
    },
    {
        id: '11',
        title: 'Médiation & Litiges',
        content: `En cas de litige non résolu amiablement avec le Service Client, le Client peut recourir gratuitement à un médiateur de la consommation. WEVA adhère au service de médiation de l'Association des Médiateurs Européens (AME CONSO), joignable via www.mediateur-conso.fr.

Le Client peut également utiliser la plateforme européenne de règlement en ligne des litiges (RLL) accessible à l'adresse ec.europa.eu/consumers/odr.

Les présentes CGV sont soumises à la loi française. En cas de litige judiciaire, les tribunaux français sont seuls compétents.`,
    },
];

export default function CGV() {
    return (
        <ClientLayout>
            <Head title="Conditions Générales de Vente — WEVA" />

            <div className="min-h-screen bg-[#faf8f4] pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">

                    {/* Header */}
                    <div className="mb-16 pb-10 border-b border-gray-200">
                        <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-4">
                            WEVA · Documents Légaux
                        </p>
                        <h1 className="text-2xl md:text-4xl font-semibold uppercase tracking-[0.1em] md:tracking-[0.15em]">
                            Conditions Générales<br />de Vente
                        </h1>
                        <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em]">
                            Version en vigueur au 1er janvier 2026
                        </p>
                    </div>

                    {/* Intro */}
                    <div className="bg-black text-white p-8 mb-12">
                        <p className="text-[11px] leading-relaxed tracking-wide text-gray-300">
                            WEVA est une marque de mode en ligne proposant des pièces exclusives et limitées. Le vendeur est
                            <span className="text-white font-semibold"> WEVA SAS</span>, immatriculée au RCS de Paris.
                            Contact : <span className="text-white">contact@weva.fr</span>
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-0">
                        {sections.map((section, i) => (
                            <div
                                key={section.id}
                                className="border-t border-gray-200 py-10"
                            >
                                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] shrink-0 pt-1 w-auto md:w-8">
                                        {section.id}
                                    </span>
                                    <div className="flex-1">
                                        <h2 className="text-[13px] font-black uppercase tracking-[0.25em] text-black mb-5">
                                            {section.title}
                                        </h2>
                                        <div className="space-y-4">
                                            {section.content.split('\n\n').map((para, j) => (
                                                <p key={j} className="text-[13px] leading-7 text-gray-600 font-light">
                                                    {para}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 pt-10 mt-4">
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] text-center">
                            WEVA SAS · contact@weva.fr · Dernière mise à jour : Janvier 2026
                        </p>
                    </div>

                </div>
            </div>
        </ClientLayout>
    );
}
