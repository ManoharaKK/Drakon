const PHRASE = "DRAKON";
const SEP = "  •  ";
const COPIES = 14;

export default function DrakonMarquee() {
  const row = (suffix: string) =>
    Array.from({ length: COPIES }, (_, i) => (
      <span
        key={`${suffix}-${i}`}
        className="inline-block shrink-0 px-1.5 text-[11px] font-bold leading-none tracking-wide text-black sm:px-2 sm:text-xs md:text-sm"
      >
        {PHRASE}
        <span className="text-black/40">{SEP}</span>
      </span>
    ));

  return (
    <div className="overflow-hidden border-y border-black/10 bg-white py-2 md:py-2.5">
      <h2 className="sr-only">DRAKON</h2>
      <div
        className="power-tain-marquee-track flex w-max flex-nowrap will-change-transform"
        aria-hidden
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
