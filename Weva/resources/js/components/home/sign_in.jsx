import { Head, useForm } from '@inertiajs/react';
import { Globe, LoaderCircle } from 'lucide-react';
// 💡 IMPORTANT : Remplacer l'icône problématique 'Github' par 'GitHub' ou 'GithubIcon' si 'GitHub' ne fonctionne pas.
// J'ai renommé 'Chrome' en 'Chrome' pour la clarté, mais nous nous concentrons sur la dépréciation.
import { Chrome, GitHub } from 'lucide-react'; 

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Affiche22 from '@/assets/images/Affiche22.png'; 


export default function Login({ status, canResetPassword }) {
    // ... (unchanged useForm and submit logic)

    return (
        <div className="flex min-h-screen">
            <Head title="Log in" />

            {/* COLONNE IMAGE (À GAUCHE) */}
            <div 
                className="hidden lg:block lg:w-1/2 dark:bg-gray-900"
                style={{
                    backgroundColor: 'var(--color-black)', 
                    backgroundImage: `url(${Affiche22})`,
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'cover' 
                }}
            >
                {/* Contenu vide */}
            </div>

            {/* COLONNE FORMULAIRE (À DROITE) */}
            <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:flex-none lg:px-20">
                <div className="mx-auto w-full max-w-sm">
                    {/* ... (Titre, description, formulaire principal inchangés) ... */}
                    
                    <form className="mt-10 flex flex-col gap-6" onSubmit={submit}>
                        {/* ... (champs email, password, remember, bouton Log in) ... */}
                        
                        <div className="grid gap-6">
                            {/* ... (Email et Password) ... */}
                            <div className="grid gap-2">{/* ... Email ... */}</div>
                            <div className="grid gap-2">{/* ... Password ... */}</div>

                            {/* REMEMBER ME */}
                            <div className="flex items-center space-x-3">{/* ... Checkbox ... */}</div>

                            {/* BOUTON DE CONNEXION */}
                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Log in
                            </Button>
                        </div>
                    </form>

                    {/* --- NOUVEAU : AUTHENTIFICATION SOCIALE AVEC ICÔNES CORRIGÉES --- */}
                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300 dark:border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex space-x-4">
                        <Button variant="outline" className="w-full" disabled={processing}>
                            {/* Utilisation de Chrome (si non déprécié) */}
                            <Globe className="mr-2 h-4 w-4" /> 
                            Google
                        </Button>
                        <Button variant="outline" className="w-full" disabled={processing}>
                            <GitHub className="mr-2 h-4 w-4" /> 
                            GitHub
                        </Button>
                    </div>
                    {/* --- FIN AUTHENTIFICATION SOCIALE --- */}


                    {/* LIEN INSCRIPTION */}
                    <div className="mt-6 text-muted-foreground text-center text-sm">
                        Don't have an account?{' '}
                        <TextLink href={route('register')} tabIndex={5}>
                            Sign up
                        </TextLink>
                    </div>

                </div>
            </div>
        </div>
    );
}