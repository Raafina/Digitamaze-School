import React from 'react';

interface TableProps {
    headers: string[];
    emptyMessage?: string;
    children: React.ReactNode;
}

function Table({ headers, emptyMessage = 'Tidak ada data', children }: TableProps) {
    const isEmpty = React.Children.count(children) === 0;

    return (
        <div className="relative overflow-x-auto rounded-xl border bg-card border-border text-foreground shadow p-5">
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs uppercase bg-muted text-muted-foreground">
                    <tr>
                        {headers.map((header, idx) => (
                            <th
                                key={idx}
                                scope="col"
                                className={`px-6 py-3 ${idx === 0 ? 'rounded-l-lg' : ''
                                    } ${idx === headers.length - 1 ? 'rounded-r-lg' : ''}`}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isEmpty ? (
                        <tr>
                            <td colSpan={headers.length} className="px-6 py-40 text-center text-muted-foreground">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        children
                    )}
                </tbody>
            </table>
        </div>
    );
}


export { Table };