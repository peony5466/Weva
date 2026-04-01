import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const COOKIE_KEY = 'weva_cookie_consent';

const CATEGORIES = [
    {
        key: 'necessary',
        label: 'Nécessaire',
        required: true,
        description: 'Ces cookies sont indispensables au bon fonctionnement du site. Ils permettent la navigation, la gestion du panier et de la session utilisateur.',
    },
    {
        key: 'marketing',
        label: 'Marketing',
        required: false,
        description: 'Ces cookies sont utilisés pour vous proposer des publicités personnalisées sur notre site et sur des sites tiers partenaires.',
    },
    {
        key: 'functional',
        label: 'Fonctionnel',
        required: false,
        description: 'Ces cookies permettent des fonctionnalités améliorées comme la mémorisation de vos préférences (langue, région, etc.).',
    },
    {
        key: 'analytics',
        label: 'Analyse',
        required: false,
        description: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site afin d\'améliorer nos services.',
    },
];

export default function CookieBanner() {
    const [visible, setVisible]     = useState(false);
    const [expanded, setExpanded]   = useState(null);
    const [prefs, setPrefs]         = useState({
        necessary:  true,
        marketing:  false,
        functional: false,
        analytics:  false,
    });

    useEffect(() => {
        const saved = localStorage.getItem(COOKIE_KEY);
        if (!saved) setTimeout(() => setVisible(true), 600);
    }, []);

    const save = (all = false) => {
        const consent = all
            ? { necessary: true, marketing: true, functional: true, analytics: true, date: new Date().toISOString() }
            : { ...prefs, necessary: true, date: new Date().toISOString() };
        localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
        setVisible(false);
    };

    const toggle = (key) => {
        if (key === 'necessary') return;
        setPrefs(p => ({ ...p, [key]: !p[key] }));
    };

    if (!visible) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            fontFamily: "'instrument-sans', sans-serif",
        }}>
            {/* Backdrop */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
            }} />

            {/* Panel */}
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: 780,
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#fff',
                boxShadow: '0 -4px 40px rgba(0,0,0,0.15)',
                margin: '0 auto',
                animation: 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)',
            }}>
                <style>{`
                    @keyframes slideUp {
                        from { transform: translateY(40px); opacity: 0; }
                        to   { transform: translateY(0);    opacity: 1; }
                    }
                    .ck-toggle {
                        position: relative;
                        width: 40px;
                        height: 22px;
                        border-radius: 999px;
                        border: none;
                        cursor: pointer;
                        flex-shrink: 0;
                        transition: background 0.2s;
                    }
                    .ck-toggle::after {
                        content: '';
                        position: absolute;
                        top: 3px; left: 3px;
                        width: 16px; height: 16px;
                        border-radius: 50%;
                        background: #fff;
                        transition: transform 0.2s;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                    }
                    .ck-on  { background: #1a1a1a; }
                    .ck-on::after  { transform: translateX(18px); }
                    .ck-off { background: #d1d5db; }
                    .ck-disabled { opacity: 0.5; cursor: not-allowed; }
                    .ck-cat:hover { background: #fafaf8; }
                    .ck-expand { cursor: pointer; user-select: none; }
                `}</style>

                {/* Header */}
                <div style={{ padding: '28px 32px 0' }}>
                    <p style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: '#1a1a1a',
                        marginBottom: 16,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                    }}>
                        <span style={{ fontSize: 16 }}>🍪</span>
                        À PROPOS DES COOKIES SUR CE SITE
                    </p>

                    <p style={{ fontSize: 12, color: '#555', lineHeight: 1.75, marginBottom: 12 }}>
                        Afin d'optimiser et d'améliorer continuellement notre site web, nous utilisons des cookies de partenaires sélectionnés. Avec votre consentement, nous utilisons des cookies optionnels et d'autres technologies comparables à des fins d'analyse, de marketing, de personnalisation des publicités et d'intégration de contenus externes.
                    </p>

                    <p style={{ fontSize: 12, color: '#555', lineHeight: 1.75, marginBottom: 16 }}>
                        En cliquant sur <strong>« Accepter tout »</strong>, vous consentez également au transfert de vos données personnelles vers un pays tiers (États-Unis, Chine et Singapour) conformément à l'article 49 (1) a) du RGPD. Ces pays tiers pourraient ne pas assurer un niveau de protection adéquat. Il existe un risque que les autorités locales collectent et accèdent à vos données personnelles, et que vous ne puissiez pas faire valoir vos droits en tant que personne concernée.
                    </p>

                    <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
                        <Link href="/cgv" style={{ fontSize: 11, color: '#1a1a1a', fontWeight: 600, textDecoration: 'underline' }}>
                            Politique de confidentialité
                        </Link>
                        <Link href="/legal" style={{ fontSize: 11, color: '#1a1a1a', fontWeight: 600, textDecoration: 'underline' }}>
                            Mentions légales
                        </Link>
                    </div>
                </div>

                {/* Divider + label Options */}
                <div style={{ borderTop: '1px solid #e8e4dc', padding: '16px 32px 0' }}>
                    <p style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: '#b8ad9e',
                        marginBottom: 8,
                    }}>
                        Options
                    </p>
                </div>

                {/* Catégories */}
                <div style={{ padding: '0 32px' }}>
                    {CATEGORIES.map((cat) => (
                        <div
                            key={cat.key}
                            className="ck-cat"
                            style={{
                                borderBottom: '1px solid #f0ece4',
                                padding: '12px 0',
                            }}
                        >
                            {/* Ligne principale */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                                <div
                                    className="ck-expand"
                                    onClick={() => setExpanded(expanded === cat.key ? null : cat.key)}
                                    style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}
                                >
                                    <span style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.12em',
                                        color: '#1a1a1a',
                                    }}>
                                        {cat.label}
                                    </span>
                                    {cat.required && (
                                        <span style={{
                                            fontSize: 8,
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.15em',
                                            color: '#b8ad9e',
                                            background: '#f5f2ed',
                                            padding: '2px 6px',
                                        }}>
                                            Toujours actif
                                        </span>
                                    )}
                                    <span style={{
                                        fontSize: 10,
                                        color: '#b8ad9e',
                                        marginLeft: 'auto',
                                        transition: 'transform 0.2s',
                                        transform: expanded === cat.key ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}>
                                        ▾
                                    </span>
                                </div>

                                <button
                                    className={`ck-toggle ${prefs[cat.key] ? 'ck-on' : 'ck-off'} ${cat.required ? 'ck-disabled' : ''}`}
                                    onClick={() => toggle(cat.key)}
                                    disabled={cat.required}
                                    aria-label={cat.label}
                                />
                            </div>

                            {/* Description expandable */}
                            {expanded === cat.key && (
                                <p style={{
                                    fontSize: 11,
                                    color: '#7a7065',
                                    lineHeight: 1.7,
                                    marginTop: 8,
                                    paddingRight: 56,
                                }}>
                                    {cat.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer boutons */}
                <div style={{
                    padding: '20px 32px 28px',
                    display: 'flex',
                    gap: 12,
                    flexWrap: 'wrap',
                    borderTop: '1px solid #e8e4dc',
                    marginTop: 8,
                    background: '#faf8f4',
                }}>
                    <button
                        onClick={() => save(false)}
                        style={{
                            flex: 1,
                            minWidth: 160,
                            padding: '13px 20px',
                            background: '#fff',
                            color: '#1a1a1a',
                            border: '1px solid #1a1a1a',
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.target.style.background = '#f5f2ed'; }}
                        onMouseLeave={e => { e.target.style.background = '#fff'; }}
                    >
                        Sauvegarder les services
                    </button>
                    <button
                        onClick={() => save(true)}
                        style={{
                            flex: 1,
                            minWidth: 160,
                            padding: '13px 20px',
                            background: '#1a1a1a',
                            color: '#fff',
                            border: '1px solid #1a1a1a',
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => { e.target.style.background = '#333'; }}
                        onMouseLeave={e => { e.target.style.background = '#1a1a1a'; }}
                    >
                        Accepter tout
                    </button>
                </div>

                <p style={{
                    textAlign: 'center',
                    fontSize: 9,
                    color: '#c8c0b4',
                    letterSpacing: '0.1em',
                    padding: '0 32px 16px',
                    background: '#faf8f4',
                }}>
                    Vous pouvez retirer votre consentement à tout moment · Conformément au RGPD (UE 2016/679)
                </p>
            </div>
        </div>
    );
}