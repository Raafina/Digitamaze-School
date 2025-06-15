import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
    total: number;
    prevPageUrl: string | null;
    nextPageUrl: string | null;
    onPageChange: (url: string) => void;
}

export default function Pagination({ currentPage, lastPage, from, to, total, prevPageUrl, nextPageUrl, onPageChange }: PaginationProps) {
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                Menampilkan {from} sampai {to} dari {total} data
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Halaman</p>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        {currentPage} dari {lastPage}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => prevPageUrl && onPageChange(prevPageUrl)}
                        disabled={!prevPageUrl}
                    >
                        <span className="sr-only">Halaman sebelumnya</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => nextPageUrl && onPageChange(nextPageUrl)}
                        disabled={!nextPageUrl}
                    >
                        <span className="sr-only">Halaman selanjutnya</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
