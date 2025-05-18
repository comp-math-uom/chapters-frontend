export default function AuthLayout({children}) {
    return (
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gray-50">
            <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}