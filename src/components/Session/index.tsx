import React, { useRef, useState } from "react";
import { FiArrowUpRight, FiBox } from "react-icons/fi";

interface SessionProps {
  title?: string;
  children: React.ReactNode;
}

export function Session({ title, children }: SessionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="mx-auto w-full bg-gradient-to-b from-gray-100 to-gray-50 p-6 shadow-md md:max-w-[1200px]">
      {/* Cabeçalho */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiBox className="text-xl text-blue-600" />
          <h2 className="text-lg font-bold text-navy">{title}</h2>
        </div>
        <a
          href="##"
          className="hidden items-center gap-1 text-sm font-semibold text-navy transition hover:text-blue sm:flex"
        >
          Ver todos <FiArrowUpRight />
        </a>
      </header>

      {/* Usando <section> semântica em vez de <div role="region"> */}
      <section
        ref={scrollRef}
        aria-label={title ?? "Carrossel de itens"}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="no-scrollbar flex w-full select-none gap-4 overflow-x-auto pb-2 scroll-smooth cursor-grab active:cursor-grabbing touch-pan-x"
      >
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child) ? (
            <div
              key={child.key ?? index}
              className="flex h-auto w-[260px] shrink-0 items-stretch md:w-[280px]"
            >
              {child}
            </div>
          ) : (
            child
          ),
        )}
      </section>
    </div>
  );
}
