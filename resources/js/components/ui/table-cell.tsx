import React from 'react';

function TableCell({
    children,
    isHeader = false,
}: {
    children: React.ReactNode;
    isHeader?: boolean;
}) {
    const className = 'px-6 py-3';

    return isHeader ? (
        <th scope="row" className={`${className} font-medium text-foreground whitespace-nowrap`}>
            {children}
        </th>
    ) : (
        <td className={`${className} text-foreground`}>{children}</td>
    );
}


export { TableCell };