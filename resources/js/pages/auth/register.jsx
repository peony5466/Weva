import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Importation de l'image. Assurez-vous que le chemin est correct pour vous.
import Wevarr from '@/assets/images/Wevarr.jpg'; 


export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Le contenu de l'AuthLayout est maintenant intégré directement ici pour la mise en page en deux colonnes
    return (
        // Conteneur principal: min-h-screen et flex
        <div className="flex min-h-screen">
            <Head title="Register" />

            {/* 🛑 1. COLONNE FORMULAIRE (À GAUCHE) 🛑 */}
            {/* L'ordre est Formulaire (gauche) puis Image (droite) */}
            <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:flex-none lg:px-20">
                <div className="mx-auto w-full max-w-sm">
                    {/* Titre et description tirés de l'ancien AuthLayout */}
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create an account
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Enter your details below to create your account
                    </p>
                    
                    {/* Le formulaire est ici */}
                    <form className="mt-10 flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Full name"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="Confirm password"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-muted-foreground text-center text-sm">
                            Already have an account?{' '}
                            <TextLink href={route('login')} tabIndex={6}>
                                Log in
                            </TextLink>
                        </div>
                    </form>
                </div>
            </div>

            {/* 🛑 2. COLONNE IMAGE (À DROITE) 🛑 */}
            <div 
                className="hidden lg:block lg:w-1/2 dark:bg-gray-900"
                style={{
                    backgroundColor: 'var(--color-black)', // Couleur de fond si l'image ne couvre pas tout (peu probable avec 'cover')
                    backgroundImage: `url(${Wevarr})`,
                    backgroundPosition: 'center', // Centrer l'image
                    backgroundRepeat: 'no-repeat', // Éviter la répétition
                    backgroundSize: 'cover' // Remplir toute la zone et couper si nécessaire (pour ne pas laisser de blanc)
                }}
            >
                {/* Contenu vide */}
            </div>
        </div>
    );
}