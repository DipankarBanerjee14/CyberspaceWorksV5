import { Home, User, Search, Sun } from "lucide-react";
import Link from "next/link";

const SiteNav = () => {
  // SVG geometry constants — keep JS layout in sync with the rail path
  const RAIL_TOP = 37.5;        // y of the straight top rail
  const RAIL_BOTTOM = 63.5;     // y of the dipped notch bottom
  const NOTCH_LEFT = 490;       // x where the left curve starts dipping
  const NOTCH_RIGHT = 1425;     // x where the right curve ends
  const NOTCH_INNER_LEFT = 570; // x where bottom flat begins
  const NOTCH_INNER_RIGHT = 1350; // x where bottom flat ends
  const VB_WIDTH = 1920;
  const VB_HEIGHT = 73;
  const GAP = 6; // spacing between the two parallel rail lines

  // Build the inner (offset) path that mirrors the outer rail, shifted down by GAP
  const innerTop = RAIL_TOP + GAP;
  const innerBottom = RAIL_BOTTOM + GAP;
  const navCenterY = ((RAIL_TOP + innerBottom) / 2 / (VB_HEIGHT + GAP)) * 80;

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-[80px] pointer-events-none">
      <svg
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full text-border md:block"
        viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT + GAP}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Trail gradients in user space — cyan anchored at the notch end, fading to white at the edges */}
          <linearGradient id="nav-trail-left" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={NOTCH_INNER_LEFT} y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="nav-trail-right" gradientUnits="userSpaceOnUse" x1={NOTCH_INNER_RIGHT} y1="0" x2={VB_WIDTH} y2="0">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Top horizontal divider */}
        <path d={`M0 .5H${VB_WIDTH}`} fill="none" stroke="currentColor" strokeOpacity="0.6" />

        {/* Outer rail with center notch */}
        <path
          d={`M0 ${RAIL_TOP}H${NOTCH_LEFT}C${NOTCH_LEFT + 38} ${RAIL_TOP} ${NOTCH_LEFT + 32} ${RAIL_BOTTOM} ${NOTCH_INNER_LEFT} ${RAIL_BOTTOM}H${NOTCH_INNER_RIGHT}C${NOTCH_INNER_RIGHT + 50} ${RAIL_BOTTOM} ${NOTCH_RIGHT - 38} ${RAIL_TOP} ${NOTCH_RIGHT} ${RAIL_TOP}H${VB_WIDTH}`}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.55"
        />

        {/* Inner rail (parallel, slightly offset) */}
        <path
          d={`M0 ${innerTop}H${NOTCH_LEFT - GAP}C${NOTCH_LEFT + 32} ${innerTop} ${NOTCH_LEFT + 26} ${innerBottom} ${NOTCH_INNER_LEFT} ${innerBottom}H${NOTCH_INNER_RIGHT}C${NOTCH_INNER_RIGHT + 56} ${innerBottom} ${NOTCH_RIGHT - 32} ${innerTop} ${NOTCH_RIGHT + GAP} ${innerTop}H${VB_WIDTH}`}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
        />

        {/* === Cyan trains emanating from both sides of the notch === */}
        {/* Path direction: starts at the notch and runs outward, so the dash animates away from the notch. */}
        {(() => {
          const DASH = 420;       // length of the visible trail
          const GAP_DASH = 2400;  // long gap so only one head is visible per cycle
          const CYCLE = DASH + GAP_DASH;
          const DUR = "3.2s";

          const CENTER_X = (NOTCH_INNER_LEFT + NOTCH_INNER_RIGHT) / 2;
          // Midline between outer rail (y=RAIL_TOP/RAIL_BOTTOM) and inner rail (y=innerTop/innerBottom)
          const MID_TOP = (RAIL_TOP + innerTop) / 2;
          const MID_BOTTOM = (RAIL_BOTTOM + innerBottom) / 2;
          const MID_NOTCH_LEFT = NOTCH_LEFT - GAP / 2;
          const MID_NOTCH_RIGHT = NOTCH_RIGHT + GAP / 2;

          // Single trail per side, running along the midline between the two rails
          const leftMid = `M${CENTER_X} ${MID_BOTTOM}H${NOTCH_INNER_LEFT}C${NOTCH_LEFT + 29} ${MID_BOTTOM} ${NOTCH_LEFT + 35} ${MID_TOP} ${MID_NOTCH_LEFT} ${MID_TOP}H0`;
          const rightMid = `M${CENTER_X} ${MID_BOTTOM}H${NOTCH_INNER_RIGHT}C${NOTCH_INNER_RIGHT + 53} ${MID_BOTTOM} ${NOTCH_RIGHT - 35} ${MID_TOP} ${MID_NOTCH_RIGHT} ${MID_TOP}H${VB_WIDTH}`;

          const trail = (d: string, gradId: string, key: string) => (
            <path
              key={key}
              d={d}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray={`${DASH} ${GAP_DASH}`}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to={`-${CYCLE}`}
                dur={DUR}
                repeatCount="indefinite"
              />
            </path>
          );

          return (
            <>
              {trail(leftMid, "nav-trail-left", "lm")}
              {trail(rightMid, "nav-trail-right", "rm")}
            </>
          );
        })()}
      </svg>

      {/* Center the nav inside the full double-line notch channel. */}
      <div className="absolute inset-0 flex justify-center">
        <div
          className="pointer-events-auto absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
          style={{ top: `${navCenterY}px` }}
        >
          <nav
            aria-label="Primary"
            className="flex h-8 items-center gap-1 bg-background/0 px-2"
          >
            <a
              href="#components"
              className="flex h-7 items-center gap-2 rounded-full px-3 text-sm text-foreground/90 hover:bg-accent/40 hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              Components
            </a>
            <a
              href="#templates"
              className="flex h-7 items-center gap-2 rounded-full px-3 text-sm text-foreground/90 hover:bg-accent/40 hover:text-foreground transition-colors"
            >
              <User className="h-4 w-4" />
              Templates
            </a>

            <Link
              href="/"
              aria-label="Home"
              className="mx-2 flex h-7 w-7 items-center justify-center rounded-full text-foreground hover:bg-accent/40 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M21.35 3.65 2.7 10.55a.9.9 0 0 0 .05 1.72l7.07 2.04 2.04 7.07a.9.9 0 0 0 1.72.05l6.9-18.65a.9.9 0 0 0-1.13-1.13Z" />
              </svg>
            </Link>

            <button
              type="button"
              className="flex h-7 items-center gap-2 rounded-full px-3 text-sm text-foreground/90 hover:bg-accent/40 hover:text-foreground transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Search...</span>
              <kbd className="ml-0.5 rounded-md border border-border bg-accent/50 px-1.5 py-0.5 text-[10px] font-medium text-foreground/80">
                ⌘ K
              </kbd>
            </button>

            <span aria-hidden="true" className="mx-3 h-5 w-px bg-border/60" />

            <button
              type="button"
              aria-label="Toggle theme"
              className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/80 hover:bg-accent/40 hover:text-foreground transition-colors"
            >
              <Sun className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SiteNav;
