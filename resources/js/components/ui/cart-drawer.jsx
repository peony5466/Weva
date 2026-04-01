import { useMemo, useEffect } from 'react'
import { X, Trash2, Coins, CreditCard, ShoppingBag, Plus, Minus, AlertTriangle, PackageX } from 'lucide-react'
import { Link, router, usePage } from '@inertiajs/react'

export default function CartDrawer({ open, setOpen }) {
    const { cart, auth } = usePage().props;
    const user = auth?.user;
    const items = Object.entries(cart || {});

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `/images/${imagePath}`;
    };

    const totals = useMemo(() => {
        let fiat = 0, wt = 0;
        items.forEach(([_, item]) => {
            if (item.is_exclusive || item.wt_price > 0) {
                wt += (item.wt_price || 0) * item.quantity;
            } else {
                fiat += item.price * item.quantity;
            }
        });
        return { fiat, wt };
    }, [cart]);

    const hasEnoughPoints = !user || user.points >= totals.wt;
    const hasStockIssue = items.some(([_, item]) => item.quantity > item.stock);

    const updateQuantity = (key, newQty, maxStock) => {
        if (newQty < 1 || newQty > maxStock) return;
        router.patch(route('cart.update', key), { quantity: newQty }, { preserveScroll: true });
    };

    const removeItem = (key) => {
        router.delete(route('cart.destroy', key), { preserveScroll: true });
    };

    const clearCart = () => {
        if (confirm('Are you sure you want to clear your bag?')) {
            router.post(route('cart.clear'), {}, { preserveScroll: true });
        }
    };

    // DEBUG - remove after fix confirmed
    console.log('CartDrawer render — open:', open);

    return (
        <>
            {/* BACKDROP */}
            <div
                onClick={() => setOpen(false)}
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 9998,
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease',
                }}
            />

            {/* DRAWER */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '100%',
                    maxWidth: '420px',
                    backgroundColor: '#ffffff',
                    zIndex: 9999,
                    transform: open ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                }}
            >
                {/* HEADER */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '24px',
                    borderBottom: '1px solid #e5e7eb',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#ffffff',
                    zIndex: 1,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShoppingBag size={18} />
                        <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                            Panier
                        </span>
                        {items.length > 0 && (
                            <span style={{
                                backgroundColor: '#000',
                                color: '#fff',
                                borderRadius: '9999px',
                                fontSize: '9px',
                                fontWeight: 700,
                                padding: '2px 6px',
                            }}>
                                {items.length}
                            </span>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {items.length > 0 && (
                            <button
                                onClick={clearCart}
                                style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                <Trash2 size={12} /> Clear
                            </button>
                        )}
                        <button
                            onClick={() => setOpen(false)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* CONTENT */}
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {items.length === 0 ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', gap: '12px' }}>
                            <ShoppingBag size={40} color="#d1d5db" />
                            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af' }}>
                                Bag_Empty
                            </p>
                            <button
                                onClick={() => setOpen(false)}
                                style={{ marginTop: '8px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', padding: '12px 24px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}
                            >
                                Continue_Shopping
                            </button>
                        </div>
                    ) : (
                        items.map(([key, item]) => (
                            <div key={key} style={{
                                display: 'flex',
                                gap: '12px',
                                padding: '12px',
                                border: item.quantity > item.stock ? '1px solid #fca5a5' : '1px solid #f3f4f6',
                                backgroundColor: item.quantity > item.stock ? '#fff5f5' : '#fafafa',
                            }}>
                                {/* IMAGE */}
                                <div style={{ width: '72px', height: '72px', flexShrink: 0, backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
                                    {getImageUrl(item.image) ? (
                                        <img src={getImageUrl(item.image)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <ShoppingBag size={20} color="#9ca3af" />
                                        </div>
                                    )}
                                </div>

                                {/* INFO */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111827' }}>
                                            {item.name}
                                        </span>
                                        <button onClick={() => removeItem(key)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                                            <X size={14} color="#9ca3af" />
                                        </button>
                                    </div>

                                    {item.variant && (
                                        <span style={{ fontSize: '9px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            Size: {item.variant}
                                        </span>
                                    )}

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                                        {/* QTY */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e5e7eb', padding: '4px 8px' }}>
                                            <button
                                                onClick={() => updateQuantity(key, item.quantity - 1, item.stock)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', color: '#111827' }}
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span style={{ fontSize: '11px', fontWeight: 700, minWidth: '16px', textAlign: 'center', color: '#111827' }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(key, item.quantity + 1, item.stock)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', color: '#111827' }}
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>

                                        {/* PRICE */}
                                        <span style={{ fontSize: '12px', fontWeight: 900 }}>
                                            {item.is_exclusive || item.wt_price > 0
                                                ? <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Coins size={12} />{(item.wt_price * item.quantity).toLocaleString()} WT</span>
                                                : `€${(item.price * item.quantity).toFixed(2)}`
                                            }
                                        </span>
                                    </div>

                                    {item.quantity > item.stock && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#ef4444', fontWeight: 700 }}>
                                            <AlertTriangle size={10} /> Stock limit: {item.stock}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* FOOTER */}
                {items.length > 0 && (
                    <div style={{
                        padding: '20px 24px',
                        borderTop: '1px solid #e5e7eb',
                        position: 'sticky',
                        bottom: 0,
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}>
                        {totals.fiat > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    <CreditCard size={14} /> Fiat Total
                                </span>
                                <span style={{ fontSize: '14px', fontWeight: 900 }}>€{totals.fiat.toFixed(2)}</span>
                            </div>
                        )}
                        {totals.wt > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    <Coins size={14} /> WT Total
                                </span>
                                <span style={{ fontSize: '14px', fontWeight: 900 }}>{totals.wt.toLocaleString()} WT</span>
                            </div>
                        )}

                        {!hasEnoughPoints && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', backgroundColor: '#fef2f2', fontSize: '9px', color: '#dc2626', fontWeight: 700 }}>
                                <AlertTriangle size={12} />  WT inssufisants
                            </div>
                        )}

                        {items.length > 0 && hasEnoughPoints && !hasStockIssue ? (
                            <Link
                                href={route('checkout')}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'center',
                                    padding: '16px',
                                    fontSize: '11px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.4em',
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    textDecoration: 'none',
                                }}
                            >
                                Process_Order
                            </Link>
                        ) : (
                            <button
                                disabled
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    fontSize: '11px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.4em',
                                    backgroundColor: '#f3f4f6',
                                    color: '#9ca3af',
                                    border: 'none',
                                    cursor: 'not-allowed',
                                }}
                            >
                                {items.length === 0 ? 'Bag_Empty' : hasStockIssue ? 'Stock_Exceeded' : 'WT_Insuffisant'}
                            </button>
                        )}

                        <p style={{ fontSize: '8px', textAlign: 'center', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.8 }}>
                            Transmission Sécurisée // WEVA_OS 2.6<br />
                            Aucun remboursement sur les actifs vault
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
