"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { cn } from "@/utils/cn";

export default function DraggableTourCards({ children }: { children: React.ReactNode[] }) {
  const [cards, setCards] = useState(children);

  const handleDragEnd = (event: any, info: PanInfo, index: number) => {
    // If dragged far enough, move to back
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
      const newCards = [...cards];
      const [movedCard] = newCards.splice(index, 1);
      newCards.push(movedCard);
      setCards(newCards);
    }
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-[2000px]">
      <AnimatePresence mode="popLayout">
        {cards.map((card, idx) => {
          const isTop = idx === 0;
          return (
            <motion.div
              key={(card as any).key || idx}
              drag={isTop}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragEnd={(e, info) => handleDragEnd(e, info, idx)}
              animate={{
                scale: 1 - idx * 0.05,
                y: idx * 15,
                z: -idx * 50,
                rotateX: isTop ? 0 : -5,
                opacity: 1 - idx * 0.2,
              }}
              whileDrag={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                zIndex: cards.length - idx,
                position: "absolute",
              }}
              className={cn(
                "w-full max-w-[400px] cursor-grab active:cursor-grabbing",
                !isTop && "pointer-events-none"
              )}
            >
              {card}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Help Hint */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="w-10 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-[#ee2229]"
          />
        </div>
        <span className="text-[10px]  text-gray-400  tracking-widest">Swipe Cards to Explore</span>
      </div>
    </div>
  );
}
