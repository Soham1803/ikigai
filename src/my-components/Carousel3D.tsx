import { useState, useEffect, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { add, sub } from "date-fns"

type CarouselProps = {
  items: ReactNode[];
  setCurrDate: React.Dispatch<React.SetStateAction<Date>>
}

type VisibleItem = {
  index: number;
  offset: number;
}

function Carousel({items, setCurrDate}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [visibleItems, setVisibleItems] = useState<VisibleItem[]>([]);
  
  const mod = (n: number, m: number): number => ((n % m) + m) % m;

  const getVisibleItems = (currentIndex: number): VisibleItem[] => {
    return [-1, 0, 1].map(offset => ({
      index: mod(currentIndex + offset, items.length),
      offset
    }));
  };

  useEffect(() => {
    setVisibleItems(getVisibleItems(activeIndex));
  }, [activeIndex, items.length]);

  const handleNext = () => {
    setActiveIndex(prev => mod(prev + 1, items.length));
    setTimeout(() => setCurrDate(prev => add(prev, {days:  1})), 200);
    
  };

  const handlePrev = () => {
    setActiveIndex(prev => mod(prev - 1, items.length));
    setTimeout(() => setCurrDate(prev => sub(prev, {days: 1})), 200);
  };

  const getTransformStyles = (offset: number) => ({
    transform: `
      perspective(1000px)
      translateX(${offset * 250}%)
      rotateY(${offset * -45}deg)
      scale(${offset === 0 ? 1 : 0.8})
    `
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="relative flex items-center justify-center">
        <button 
          onClick={handlePrev}
          aria-label="Previous item"
          className="absolute -left-4 z-20 p-2 border-yellow-600 border-2 rounded-full shadow-lg 
                     text-yellow-600 hover:text-yellow-400 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="relative flex items-center justify-center w-full bg-[#1e1e1e] rounded-3xl overflow-hidden h-64">
          <div className="flex items-center justify-center">
            {visibleItems.map(({ index, offset }) => (
              <div
                key={index}
                className={`
                  absolute flex items-center justify-center
                  transition-all duration-300 ease-in-out
                  rounded-3xl border-2 border-yellow-600 shadow-lg
                  ${offset === 0 ? 'w-52 h-52 z-10' : 'w-48 h-48 opacity-0'}
                `}
                style={getTransformStyles(offset)}
              >
                {items[index]}
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleNext}
          aria-label="Next item"
          className="absolute -right-4 z-20 p-2 border-2 border-yellow-600 rounded-full shadow-lg 
                     text-yellow-600 hover:text-yellow-400 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
