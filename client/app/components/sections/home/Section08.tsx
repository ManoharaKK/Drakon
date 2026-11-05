 "use client";

import { useState } from "react";
import Image from "next/image";
import { cardsData, type Card } from "@/lib/cards";

function Section08() {
  const [cards] = useState<Card[]>(cardsData);
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="relative z-20 bg-white">
      <div className="container-global">
        <div className="mb-8 flex flex-row items-end justify-between">
          <div>
            <img
              src="/icons/BlackArrow.svg"
              alt=""
              width={277}
              height={280}
              className="h-12 w-auto object-contain select-none sm:h-16 md:h-20"
              aria-hidden={true}
            />
          </div>
          <div>
            <h1 className="title text-right uppercase text-black">
              WHAT THE <br /> COMMUNITY SAYS
            </h1>
          </div>
        </div>
        <div className="h-px w-full bg-black/30" />

        <div className="py-8 md:py-16">
          {(showAll ? cards : cards.slice(0, 3)).map((card, index) => (
            <div key={`${card.id}-${index}`} className="relative min-h-[72vh] md:min-h-[86vh]">
              <div
                className="sticky top-4   bg-white p-3  md:top-8 md:p-4"
                style={{ zIndex: index + 1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="mt-4 flex flex-col pr-0 md:pr-4">
                    <h3 className="text-2xl xl:text-6xl  text-black uppercase">{card.name}</h3>
                    <p className="mt-1 text-sm text-black/70">{card.title}</p>
                    <div className="mt-3 flex items-center gap-1 text-lg text-yellow-500">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={`${card.id}-${i}`} aria-hidden={true}>
                          ★
                        </span>
                      ))}
                      
                      <span className="ml-2 text-sm text-black/70">({card.rating.toFixed(1)})</span>
                      
                    </div>
                    <div className="mt-4 h-px w-full bg-black/30"></div>
                  </div>

                  <div className="relative h-[260px] overflow-hidden sm:h-[340px] md:h-[460px]">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="relative mt-4 flex flex-col pb-16 pl-0 md:mt-8 md:pb-24 md:pl-4">
                    <p className="text-lg leading-relaxed text-black">&quot;{card.quote}&quot;</p>
                    <p className="description mt-4 text-black/70">{card.description}</p>
                    <div className="absolute bottom-0 right-0">
                      <img
                        src="/icons/BlackArrow.svg"
                        alt=""
                        width={277}
                        height={280}
                        className="h-12 w-auto object-contain select-none sm:h-16 md:h-20"
                        aria-hidden={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {cards.length > 3 && (
            <div className="mt-6 flex justify-center">
              {!showAll ? (
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="border border-black px-6 py-2 text-sm font-semibold uppercase text-black transition-colors hover:bg-black hover:text-white"
                >
                  Show All
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAll(false)}
                  className="border border-black px-6 py-2 text-sm font-semibold uppercase text-black transition-colors hover:bg-black hover:text-white"
                >
                  Show Less
                </button>
              )}
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
}

export default Section08;