import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
  isHeader?: boolean;
  truncate?: boolean;
}

function TableCell({ children, isHeader = false, truncate = false }: TableCellProps) {
  const baseClass = 'px-6 py-3 text-foreground';
  const truncateClass = truncate ? 'truncate overflow-hidden text-ellipsis max-w-[200px]' : '';
  const className = `${baseClass} ${truncateClass}`;

  return isHeader ? (
    <th scope="row" className={`${className} font-medium whitespace-nowrap`}>
      {children}
    </th>
  ) : (
    <td className={className}>{children}</td>
  );
}

export { TableCell };
