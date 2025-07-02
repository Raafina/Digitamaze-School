import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface InputSearchProps {
    route: string;
    placeholder?: string;
    className?: string;
}

const InputSearch: React.FC<InputSearchProps> = ({ className, route, placeholder }) => {
    const [search, setSearch] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('search') || '';
    });

    const getCurrentParams = () => {
        const params = new URLSearchParams(window.location.search);
        const paramsObj: Record<string, string> = {};

        params.forEach((value, key) => {
            if (key !== 'search') {
                paramsObj[key] = value;
            }
        });

        return paramsObj;
    };

    return (
        <form className="flex w-1/2 items-center" method="GET" action={route}>
            <label htmlFor="simple-search" className="sr-only">
                Search
            </label>

            {/* Hidden inputs untuk mempertahankan filter yang ada */}
            {Object.entries(getCurrentParams()).map(([key, value]) => (
                <input key={key} type="hidden" name={key} value={value} />
            ))}

            <div className="relative w-full">
                <input
                    type="search"
                    id="simple-search"
                    name="search"
                    className={cn(
                        'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                        className,
                    )}
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="hover:bg-opacity-90 ms-2 rounded-lg bg-primary p-2.5 text-sm font-medium text-white focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
                <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
                <span className="sr-only">Search</span>
            </button>
        </form>
    );
};

export default InputSearch;
