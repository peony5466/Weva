import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Trash2 } from 'lucide-react'
import { Link, router, usePage } from '@inertiajs/react'

export default function CartDrawer({ open, setOpen }) {
    const { cart, cartTotal } = usePage().props;
    const items = Object.entries(cart);

    const removeItem = (key) => {
        router.delete(route('cart.destroy', key), { preserveScroll: true });
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={setOpen}>
                <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-6 py-8">
                                            <div className="flex items-start justify-between border-b border-gray-100 pb-6">
                                                <Dialog.Title className="text-xl font-[1000] uppercase italic tracking-tighter">Your_Bag</Dialog.Title>
                                                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-black transition">
                                                    <X className="h-6 w-6" />
                                                </button>
                                            </div>

                                            <div className="mt-8">
                                                {items.length === 0 ? (
                                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 text-center mt-20 italic">Bag_Is_Empty</p>
                                                ) : (
                                                    <div className="space-y-8">
                                                        {items.map(([key, item]) => (
                                                            <div key={key} className="flex gap-4">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-gray-50 p-2">
                                                                    <img src={`/storage/${item.image}`} className="h-full w-full object-contain mix-blend-multiply" />
                                                                </div>
                                                                <div className="flex flex-1 flex-col justify-between py-1">
                                                                    <div>
                                                                        <h3 className="text-[11px] font-black uppercase tracking-widest">{item.name}</h3>
                                                                        <p className="text-[9px] text-gray-400 uppercase mt-1">Size: {item.variant}</p>
                                                                    </div>
                                                                    <div className="flex justify-between items-end">
                                                                        <p className="text-xs font-bold">
                                                                            € {item.price}
                                                                            {item.quantity > 1 && (
                                                                                <span className="text-gray-400 font-normal ml-2">
                                                                                    (x{item.quantity})
                                                                                </span>
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 px-6 py-8 space-y-4">
                                            <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                                                <span>Subtotal</span>
                                                <span>€ {cartTotal.toFixed(2)}</span>
                                            </div>
                                            <p className="text-[9px] text-gray-400 uppercase tracking-wider italic">Shipping and taxes calculated at checkout.</p>
                                            <Link href={route('checkout')} className="block w-full bg-black text-white text-center py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition">
                                                Checkout
                                            </Link>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}