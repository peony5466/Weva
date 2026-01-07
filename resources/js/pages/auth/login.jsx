import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Importation de l'image pour la colonne de gauche
import Affiche22 from '@/assets/images/Affiche22.png'; 
// Note : Le composant AuthLayout est retiré de cette structure

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        // Conteneur principal: min-h-screen et flex
        <div className="flex min-h-screen">
            <Head title="Log in" />

            {/* 🛑 1. COLONNE IMAGE (À GAUCHE) 🛑 */}
            <div 
                className="hidden lg:block lg:w-1/2 dark:bg-gray-900"
                style={{
                    // Styles pour l'image de fond
                    backgroundColor: 'var(--color-black)', 
                    backgroundImage: `url(${Affiche22})`,
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'cover' // Remplir la hauteur et couper la largeur
                }}
            >
                {/* Contenu vide */}
            </div>

            {/* 🛑 2. COLONNE FORMULAIRE (À DROITE) 🛑 */}
            <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:flex-none lg:px-20">
                <div className="mx-auto w-full max-w-sm">
                    {/* Titre et description */}
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Log in to your account
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Enter your email and password below to log in
                    </p>

                    {status && <div className="mt-4 mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

                    <form className="mt-10 flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    // Utiliser onChange ou un gestionnaire d'événements pour mettre à jour l'état
                                    onCheckedChange={(checked) => setData('remember', checked)}
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Log in
                            </Button>
                        </div>

                        <div className="text-muted-foreground text-center text-sm">
                            Don't have an account?{' '}
                            <TextLink href={route('register')} tabIndex={5}>
                                Sign up
                            </TextLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}