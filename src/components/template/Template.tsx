'use client'
import React from 'react'
import TemplateProps from "@/components/template/intefaces/TemplateProps";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/resources/users/authentication.resourse";
import { useRouter } from "next/navigation";

const Template: React.FC<TemplateProps> = ({ children, loading = false }: TemplateProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto flex-grow py-6 px-4 sm:px-6 lg:px-8">
                {loading && (
                    <div className="flex items-center justify-center py-10">
                        <Loading />
                    </div>
                )}
                {children}
            </main>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={8000}
                hideProgressBar={false}
                draggable={false}
                closeOnClick={true}
                pauseOnHover={true}
            />
        </div>
    )
}

const Loading: React.FC = () => (
    <div role="status">
        <svg
            className="w-10 h-10 text-indigo-600 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
            />
        </svg>
        <span className="sr-only select-none">Loading...</span>
    </div>
)

const Header: React.FC = () => {
    const auth = useAuth();
    const router = useRouter();

    function logout() {
        auth.invalidateSession();
        router.push("/login");
    }

    return (
        <header className="bg-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
                <Link href="/galeria" className="flex items-center space-x-2">
                    <span className="text-2xl font-extrabold text-blue-600">ImageLite</span>
                </Link>
                {auth.getUserSession() && (
                    <nav className="flex items-center space-x-6">
                        <span className="text-gray-600">Olá, <strong>{auth.getUserSession()?.name}</strong></span>
                        <button
                            onClick={logout}
                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                            </svg>
                            <span>Sair</span>
                        </button>
                    </nav>
                )}
            </div>
        </header>
    )
}

const Footer: React.FC = () => (
    <footer className="bg-blue-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto py-6 px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} ImageLite. Todos os direitos reservados.
            </p>
        </div>
    </footer>
)

export default React.memo(Template);
