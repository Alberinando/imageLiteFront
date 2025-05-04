import Link from "next/link";

export default function NotFound() {
    return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 text-white p-6 select-none">
                <h1 className="text-9xl font-extrabold animate-pulse">
                    404
                </h1>
                <h2 className="mt-6 text-4xl font-bold animate-fade-in">
                    Página Não Encontrada
                </h2>
                <p className="mt-4 text-lg text-center max-w-md animate-fade-in delay-200">
                    Ops! A página que você está procurando não existe ou foi movida.
                </p>
                <Link
                    href="/"
                    className="mt-8 inline-block bg-white text-blue-600 font-semibold py-2 px-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 animate-fade-in delay-400"
                >
                    Voltar para Home
                </Link>
            </div>
    );
}
