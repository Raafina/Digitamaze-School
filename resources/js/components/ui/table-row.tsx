import React from 'react';

function TableRow({
    children,
    highlight = false,
}: {
    children: React.ReactNode;
    highlight?: boolean;
}) {
    return (
        <tr
            className={`bg-background hover:bg-muted ${highlight ? 'bg-muted' : ''
                } transition-colors duration-150`}
        >
            {children}
        </tr>
    );
}


export { TableRow };