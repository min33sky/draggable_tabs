import React, { useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Props {
  tabItems: string[];
}

export default function DraggableTabs({ tabItems }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [showLeftIcon, setShowLeftIcon] = useState(false);
  const [showRightIcon, setShowRightIcon] = useState(true);
  const [selectTab, setSelectTab] = useState(0);

  //? 터치 전용 상태 (movementX는 MouseEvent에서만 사용 가능)
  const [prevPageX, setPrevPageX] = useState(0); // 이전 X 좌표

  const scrollRef = useRef<HTMLUListElement>(null);

  const handleDragStart = (
    e: React.MouseEvent<HTMLUListElement> & React.TouchEvent<HTMLUListElement>,
  ) => {
    setIsDragging(true);

    if (e.type === 'touchstart') {
      setPrevPageX(e.touches[0].pageX);
    }
  };

  const handleDragging = (
    e: React.MouseEvent<HTMLUListElement> & React.TouchEvent<HTMLUListElement>,
  ) => {
    if (isDragging) {
      if (e.type === 'touchmove') {
        scrollRef.current?.scrollTo({
          left: scrollRef.current.scrollLeft + e.touches[0].pageX - prevPageX,
        });
      } else if (e.type === 'mousemove') {
        //? movementX is the distance between the mouse pointer and the starting point of the mouse pointer
        scrollRef.current?.scrollTo({
          left: scrollRef.current.scrollLeft + e.movementX,
        });
      }

      handleArrowIcons();
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClickArrowIcons = (e: React.MouseEvent) => {
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
      handleArrowIcons();
    }, 500);
  };

  const handleClickTab = (idx: number) => {
    setSelectTab(idx);
  };

  /**
   * @description
   * This function will handle the visibility of the arrow icons
   */
  const handleArrowIcons = () => {
    if (scrollRef.current) {
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
            onClick={handleClickArrowIcons}
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
        onTouchStart={handleDragStart}
        onMouseMove={handleDragging}
        onTouchMove={handleDragging}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchEnd={handleDragEnd}
      >
        {tabItems.map((tabItem, index) => (
          <li
            key={index}
            onClick={() => handleClickTab(index)}
            className={`flex h-12 w-32 select-none items-center justify-center rounded-md bg-slate-100 px-2 ${
              selectTab === index ? 'bg-slate-400' : ''
            }`}
          >
            {tabItem}
          </li>
        ))}
      </ul>

      {showRightIcon && (
        <div className="pointer-events-none absolute top-0 right-4 flex h-full w-32 items-center justify-end bg-gradient-to-l from-slate-200">
          <button
            id="rightBtn"
            onClick={handleClickArrowIcons}
            className="rounded-full p-2 transition hover:bg-slate-300/50"
          >
            <ArrowRightIcon className="pointer-events-auto h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
