import React, { useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Props {
  tabItems: string[];
}

export default function DraggableTabs({ tabItems }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [showLeftIcon, setShowLeftIcon] = useState(false);
  const [showRightIcon, setShowRightIcon] = useState(true);
  const scrollRef = useRef<HTMLUListElement>(null);

  const handleDragStart = (e: React.MouseEvent<HTMLUListElement>) => {
    setIsDragging(true);
  };

  const handleDragging = (e: React.MouseEvent<HTMLUListElement>) => {
    if (isDragging) {
      console.log('move', e.movementX, e.pageX, e.clientX);
      scrollRef.current?.scrollTo({
        left: scrollRef.current.scrollLeft + e.movementX,
      });
      handleIcons();
    }
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLUListElement>) => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (target.id === 'leftBtn') {
      scrollRef.current?.scrollTo({
        left: scrollRef.current.scrollLeft - 350,
        behavior: 'smooth',
      });
    } else if (target.id === 'rightBtn') {
      scrollRef.current?.scrollTo({
        left: scrollRef.current.scrollLeft + 350,
        behavior: 'smooth',
      });
    }

    setTimeout(() => {
      handleIcons();
    }, 500);
  };

  const handleIcons = () => {
    if (scrollRef.current) {
      console.log('ㅎㅎㅎ: ', scrollRef.current.scrollLeft);
      setShowLeftIcon(scrollRef.current.scrollLeft > 0);
      setShowRightIcon(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
      );
    }
  };

  return (
    <div className="relative w-10/12 max-w-xl rounded-md bg-slate-200 px-10 py-5 shadow-lg">
      {showLeftIcon && (
        <div className="pointer-events-none absolute top-0  left-4 flex h-full w-32 items-center bg-gradient-to-r from-slate-200">
          <button
            id="leftBtn"
            onClick={handleClick}
            className={`rounded-full p-2 transition hover:bg-slate-300/50`}
          >
            <ArrowLeftIcon className="pointer-events-auto h-5 w-5" />
          </button>
        </div>
      )}

      <ul
        aria-label="tabs-box"
        ref={scrollRef}
        className={`flex items-center gap-3 overflow-x-hidden whitespace-nowrap  ${
          isDragging ? 'cursor-grabbing ' : 'cursor-grab '
        }`}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragging}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {tabItems.map((tabItem, index) => (
          <li
            key={index}
            className="pointer-events-none flex h-12 w-32 select-none items-center justify-center rounded-md bg-slate-100 px-2"
          >
            {tabItem}
          </li>
        ))}
      </ul>

      {showRightIcon && (
        <div className="pointer-events-none absolute top-0 right-4 flex h-full w-32 items-center justify-end bg-gradient-to-l from-slate-200">
          <button
            id="rightBtn"
            onClick={handleClick}
            className="rounded-full p-2 transition hover:bg-slate-300/50"
          >
            <ArrowRightIcon className="pointer-events-auto h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
