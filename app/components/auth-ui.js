// Shared styling for the auth pages, matching the site's design language.

export const inputClass =
    'w-full rounded-lg border border-[#d9d9d9] bg-white px-3 py-2.5 font-montserrat text-base text-ink outline-none transition-colors focus:border-brand';

export const labelClass =
    'mb-1 block font-montserrat text-sm font-medium text-ink';

export const primaryButtonClass =
    'w-full cursor-pointer rounded-lg bg-brand py-2.5 font-poppins text-base font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60';

export function AuthShell({ title, subtitle, children }) {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-cream px-5 py-12">
            <div className="w-full max-w-md rounded-2xl border border-[#E6E0D6] bg-white p-8 shadow-sm">
                <h1 className="text-center font-poppins text-[1.75rem] font-medium text-brand">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-1 mb-6 text-center font-montserrat text-base text-ink">
                        {subtitle}
                    </p>
                )}
                {children}
            </div>
        </div>
    );
}

export function Alert({ type = 'error', children }) {
    if (!children) return null;
    const styles =
        type === 'error'
            ? 'border-[#e15151] bg-[#fdecec] text-[#b42318]'
            : 'border-[#79b945] bg-[#f0f7e9] text-[#3f6212]';
    return (
        <div
            className={`mb-4 rounded-lg border px-3 py-2 font-montserrat text-sm ${styles}`}
        >
            {children}
        </div>
    );
}
