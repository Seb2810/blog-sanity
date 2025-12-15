'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Pagination({
  totalPages,
  currentPage,
  setPageNumber,
}: {
  totalPages: number;
  currentPage: number;
  setPageNumber: (page: number) => void;
}) {
  const handleClickLess = () => {
    if (currentPage > 1) setPageNumber(currentPage - 1);
  };

  const handleClickMore = () => {
    if (currentPage < totalPages) setPageNumber(currentPage + 1);
  };

  return (
    <div className="inline-flex">
      {/* Précédent */}
      <button onClick={handleClickLess} disabled={currentPage <= 1}>
        <PaginationArrow direction="left" isDisabled={currentPage <= 1} />
      </button>

      {/* Numéros de page */}
      <div className="flex -space-x-px">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationNumber
            key={page}
            page={page}
            isActive={currentPage === page}
            onClick={() => setPageNumber(page)}
          />
        ))}
      </div>

      {/* Suivant */}
      <button onClick={handleClickMore} disabled={currentPage >= totalPages}>
        <PaginationArrow direction="right" isDisabled={currentPage >= totalPages} />
      </button>
    </div>
  );
}

function PaginationNumber({
  page,
  isActive,
  onClick,
}: {
  page: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border cursor-pointer',
    {
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100': !isActive,
    }
  );

  return (
    <div className={className} onClick={onClick}>
      {page}
    </div>
  );
}

function PaginationArrow({
  direction,
  isDisabled,
}: {
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    }
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return <div className={className}>{icon}</div>;
}
