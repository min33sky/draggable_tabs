import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Props {
  tabItems: string[];
}

export default function DraggableTabs({ tabItems }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.MouseEvent<HTMLUListElement>) => {
    setIsDragging(true);
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLUListElement>) => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-10/12 max-w-xl rounded-md bg-slate-200 px-3 py-5 shadow-lg">
      <button>
        <ArrowLeftIcon className="h-4 w-4" />
      </button>

      <ul
        aria-label="tabs-box"
        className="flex gap-3 overflow-x-hidden scroll-smooth whitespace-nowrap"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {tabItems.map((tabItem, index) => (
          <li
            key={index}
            className="flex h-12 w-32 select-none items-center justify-center rounded-md bg-slate-100"
          >
            {tabItem}
          </li>
        ))}
      </ul>

      <button>
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
