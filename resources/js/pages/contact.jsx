import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Navbar from '@/components/home/navbar';

export default function Contact() {
    const { flash } = usePage().props;
    const [focused, setFocused] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                reset();
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 5000);
            },
        });
    }

    return (
        <>
            <Navbar />

            <main style={styles.page}>
                {/* Background subtle texture */}
                <div style={styles.bgPattern} aria-hidden="true" />

                <div style={styles.container}>

                    {/* Header */}
                    <div style={styles.header}>
                        <span style={styles.eyebrow}>WEVAD</span>
                        <h1 style={styles.title}>
                            Parlons-en<span style={styles.dot}>.</span>
                        </h1>
                        <p style={styles.subtitle}>
                            Une question, une collaboration, une idée ?<br />
                            On vous répond sous 24h.
                        </p>
                    </div>

                    {/* Card */}
                    <div style={styles.card}>

                        {/* Success state */}
                        {submitted && (
                            <div style={styles.successBanner}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="9" stroke="#16a34a" strokeWidth="1.5"/>
                                    <path d="M6 10l3 3 5-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Message envoyé ! On vous recontacte très vite.</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={styles.form}>

                            {/* Row: Name + Email */}
                            <div style={styles.row}>
                                <div style={styles.fieldGroup}>
                                    <label style={styles.label} htmlFor="name">Nom complet</label>
                                    <div style={{
                                        ...styles.inputWrapper,
                                        ...(focused === 'name' ? styles.inputWrapperFocused : {}),
                                        ...(errors.name ? styles.inputWrapperError : {}),
                                    }}>
                                        <input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            onFocus={() => setFocused('name')}
                                            onBlur={() => setFocused(null)}
                                            placeholder="Jean Dupont"
                                            style={styles.input}
                                            autoComplete="name"
                                        />
                                    </div>
                                    {errors.name && <span style={styles.error}>{errors.name}</span>}
                                </div>

                                <div style={styles.fieldGroup}>
                                    <label style={styles.label} htmlFor="email">Email</label>
                                    <div style={{
                                        ...styles.inputWrapper,
                                        ...(focused === 'email' ? styles.inputWrapperFocused : {}),
                                        ...(errors.email ? styles.inputWrapperError : {}),
                                    }}>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            onFocus={() => setFocused('email')}
                                            onBlur={() => setFocused(null)}
                                            placeholder="jean@exemple.com"
                                            style={styles.input}
                                            autoComplete="email"
                                        />
                                    </div>
                                    {errors.email && <span style={styles.error}>{errors.email}</span>}
                                </div>
                            </div>

                            {/* Subject */}
                            <div style={styles.fieldGroup}>
                                <label style={styles.label} htmlFor="subject">
                                    Sujet <span style={styles.optional}>(optionnel)</span>
                                </label>
                                <div style={{
                                    ...styles.inputWrapper,
                                    ...(focused === 'subject' ? styles.inputWrapperFocused : {}),
                                }}>
                                    <input
                                        id="subject"
                                        type="text"
                                        value={data.subject}
                                        onChange={e => setData('subject', e.target.value)}
                                        onFocus={() => setFocused('subject')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="À propos de ma commande…"
                                        style={styles.input}
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div style={styles.fieldGroup}>
                                <label style={styles.label} htmlFor="message">Message</label>
                                <div style={{
                                    ...styles.inputWrapper,
                                    ...(focused === 'message' ? styles.inputWrapperFocused : {}),
                                    ...(errors.message ? styles.inputWrapperError : {}),
                                    padding: 0,
                                }}>
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        onFocus={() => setFocused('message')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="Décrivez votre demande en détail…"
                                        rows={6}
                                        style={styles.textarea}
                                    />
                                </div>
                                <div style={styles.charCount}>
                                    <span style={errors.message ? styles.error : {}}>{errors.message}</span>
                                    <span style={{ color: data.message.length > 1800 ? '#dc2626' : '#9ca3af' }}>
                                        {data.message.length}/2000
                                    </span>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                style={{
                                    ...styles.button,
                                    ...(processing ? styles.buttonDisabled : {}),
                                }}
                            >
                                {processing ? (
                                    <span style={styles.buttonInner}>
                                        <span style={styles.spinner} />
                                        Envoi en cours…
                                    </span>
                                ) : (
                                    <span style={styles.buttonInner}>
                                        Envoyer le message
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                )}
                            </button>

                        </form>
                    </div>

                    {/* Footer note */}
                    <p style={styles.footerNote}>
                        Vous pouvez aussi nous écrire directement à{' '}
                        <a href="mailto:contact@wevad.com" style={styles.emailLink}>contact@wevad.com</a>
                    </p>

                </div>
            </main>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

                * { box-sizing: border-box; }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .contact-header { animation: fadeUp 0.6s ease both; }
                .contact-card   { animation: fadeUp 0.6s 0.15s ease both; }

                input::placeholder,
                textarea::placeholder { color: #c4c9d4; }
                input:focus, textarea:focus { outline: none; }
                textarea { resize: vertical; }
            `}</style>
        </>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        background: '#fafaf9',
        fontFamily: "'DM Sans', sans-serif",
        paddingTop: '80px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
    },
    bgPattern: {
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)`,
        backgroundSize: '28px 28px',
        opacity: 0.5,
        pointerEvents: 'none',
    },
    container: {
        maxWidth: '640px',
        margin: '0 auto',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
    },

    // Header
    header: {
        textAlign: 'center',
        marginBottom: '48px',
        animation: 'fadeUp 0.6s ease both',
    },
    eyebrow: {
        display: 'inline-block',
        fontSize: '11px',
        fontWeight: '500',
        letterSpacing: '0.2em',
        color: '#9ca3af',
        marginBottom: '16px',
    },
    title: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: 'clamp(36px, 6vw, 52px)',
        fontWeight: '400',
        color: '#111827',
        lineHeight: 1.1,
        margin: '0 0 16px',
    },
    dot: {
        color: '#111827',
    },
    subtitle: {
        fontSize: '15px',
        color: '#6b7280',
        lineHeight: 1.7,
        fontWeight: '300',
        margin: 0,
    },

    // Card
    card: {
        background: '#ffffff',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.06)',
        border: '1px solid #f3f4f6',
        animation: 'fadeUp 0.6s 0.15s ease both',
    },

    // Success
    successBanner: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '10px',
        padding: '14px 16px',
        marginBottom: '28px',
        fontSize: '14px',
        color: '#15803d',
        fontWeight: '500',
        animation: 'slideIn 0.3s ease',
    },

    // Form
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    fieldGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '13px',
        fontWeight: '500',
        color: '#374151',
        letterSpacing: '0.01em',
    },
    optional: {
        fontWeight: '400',
        color: '#9ca3af',
    },
    inputWrapper: {
        border: '1.5px solid #e5e7eb',
        borderRadius: '10px',
        background: '#fafafa',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
        overflow: 'hidden',
    },
    inputWrapperFocused: {
        borderColor: '#111827',
        background: '#ffffff',
        boxShadow: '0 0 0 3px rgba(17,24,39,0.06)',
    },
    inputWrapperError: {
        borderColor: '#fca5a5',
        background: '#fff7f7',
    },
    input: {
        width: '100%',
        border: 'none',
        background: 'transparent',
        padding: '12px 14px',
        fontSize: '14px',
        color: '#111827',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: '400',
    },
    textarea: {
        width: '100%',
        border: 'none',
        background: 'transparent',
        padding: '14px',
        fontSize: '14px',
        color: '#111827',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: '400',
        minHeight: '140px',
        lineHeight: 1.6,
    },
    charCount: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        marginTop: '2px',
    },
    error: {
        fontSize: '12px',
        color: '#dc2626',
    },

    // Button
    button: {
        background: '#111827',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        padding: '14px 24px',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: "'DM Sans', sans-serif",
        cursor: 'pointer',
        transition: 'background 0.2s ease, transform 0.1s ease',
        marginTop: '4px',
    },
    buttonDisabled: {
        background: '#9ca3af',
        cursor: 'not-allowed',
    },
    buttonInner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
    },
    spinner: {
        display: 'inline-block',
        width: '14px',
        height: '14px',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTopColor: '#ffffff',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
    },

    // Footer
    footerNote: {
        textAlign: 'center',
        marginTop: '24px',
        fontSize: '13px',
        color: '#9ca3af',
    },
    emailLink: {
        color: '#374151',
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
    },
};
