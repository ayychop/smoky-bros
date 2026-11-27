import { motion } from "framer-motion";
import { useId } from "react";
import usePauseOffscreen from "../lib/usePauseOffscreen";
import { FlameBroArt } from "./FlameBro";

// The Smoky Bros badge: a black roadhouse seal with our flame bro in shades standing on a grill, a sunburst behind
// him and a ribbon across the front.
const INK = "#14100E";
const CHILI = "#D92B0B";
const SUN = "#FF6A13";
const CREAM = "#FFFFFF";
const FONT = { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800 };

const RAYS = Array.from({ length: 18 }, (_, i) => {
  const a0 = ((i * 360) / 18 - 90) * (Math.PI / 180);
  const a1 = (((i + 0.5) * 360) / 18 - 90) * (Math.PI / 180);
  const p = (a) =>
    `${(120 + 160 * Math.cos(a)).toFixed(1)} ${(120 + 160 * Math.sin(a)).toFixed(1)}`;
  return `M120 120 L${p(a0)} L${p(a1)} Z`;
}).join(" ");

const pop = (delay) => ({
  initial: { scale: 0.4, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 260, damping: 15, delay },
});

const centred = { transformBox: "fill-box", transformOrigin: "center" };

// Embers that float up off the grill. Fixed values, so every badge looks the same.
const EMBERS = [
  { x: 84, size: 2.6, delay: 0, dur: 3.2 },
  { x: 100, size: 2, delay: 1.1, dur: 2.8 },
  { x: 118, size: 3, delay: 0.5, dur: 3.6 },
  { x: 138, size: 2.2, delay: 1.8, dur: 3 },
  { x: 154, size: 2.8, delay: 0.9, dur: 3.4 },
  { x: 128, size: 1.8, delay: 2.4, dur: 2.6 },
];

// The badge, alive. Everything that moves is its own layer, and every layer only ever slides, turns or fades,
// so the GPU does all of it and the page is never repainted. (An SVG that animates its own insides gets redrawn
// in full on every frame, which is what made the old version heavy.) From the back:
//   1. the seal and its lettering, drawn once
//   2. the disc: sunburst rays that turn, glow, the coals that breathe and the embers that float up
//   3. the grate and the rim, drawn once
//   4. the flame bro, who bobs and breathes
//   5. the ribbon, drawn once
// All layers share one viewBox, so they line up exactly.
const VB = "-6 -6 252 252";
const DISC = { r: 76, x: 44, y: 44, size: 152 };
const discPct = (value) => `${(value / DISC.size) * 100}%`;

function AliveLogo({ className }) {
  const uid = useId().replace(/:/g, "");
  const id = (name) => `${name}${uid}`;
  const paused = usePauseOffscreen();
  const layer = "pointer-events-none absolute inset-0 h-full w-full";

  return (
    <div
      ref={paused}
      role="img"
      aria-label="Smoky Bros BBQ, slow smoked"
      className={`${/\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative"} ${className}`}
    >
      {/* 1. Seal */}
      <svg viewBox={VB} aria-hidden="true" shapeRendering="geometricPrecision" textRendering="geometricPrecision" className={layer} fill="none" overflow="visible">
        <defs>
          <path id={id("top")} d="M 33.7 120 A 86.3 86.3 0 0 1 206.3 120" />
          <path id={id("bot")} d="M 23.9 120 A 96.1 96.1 0 0 0 216.1 120" />
        </defs>
              <g>
                <circle cx="120" cy="120" r="117" fill={INK} />
                <circle cx="120" cy="120" r="111" stroke={SUN} strokeWidth="2" />
                <circle cx="120" cy="120" r="92" stroke="#1A0E0B" strokeWidth="28" />
                <circle cx="120" cy="120" r="106.5" stroke={CREAM} strokeOpacity="0.45" strokeWidth="0.8" />
                <circle cx="120" cy="120" r="77.5" stroke={SUN} strokeWidth="1.2" />
                <text
                  style={FONT}
                  fontSize="16"
                  letterSpacing="3.2"
                  fill={CREAM}
                  textAnchor="middle"
                >
                  <textPath href={`#${id("top")}`} startOffset="50%">
                    SLOW SMOKED BBQ
                  </textPath>
                </text>
                <text
                  style={FONT}
                  fontSize="11.5"
                  letterSpacing="3.2"
                  fill={CREAM}
                  textAnchor="middle"
                >
                  <textPath href={`#${id("bot")}`} startOffset="50%">
                    MAIDENHEAD
                  </textPath>
                </text>
                <polygon
                  transform="translate(4 0)"
                  points="24,114 26.5,119.5 32,120 27.8,123.6 29,129 24,126.2 19,129 20.2,123.6 16,120 21.5,119.5"
                  fill={SUN}
                />
                <polygon
                  transform="translate(-4 0)"
                  points="216,114 218.5,119.5 224,120 219.8,123.6 221,129 216,126.2 211,129 212.2,123.6 208,120 213.5,119.5"
                  fill={SUN}
                />
              </g>
      </svg>

      {/* 2. The disc */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute overflow-hidden rounded-full"
        style={{ left: `${((DISC.x + 6) / 252) * 100}%`, top: `${((DISC.y + 6) / 252) * 100}%`, width: `${(DISC.size / 252) * 100}%`, aspectRatio: "1", background: "#1C1613" }}
      >
        <svg viewBox="-40 -40 320 320" className="badge-rays absolute" style={{ left: "-55.26%", top: "-55.26%", width: "210.53%", height: "210.53%" }} fill="none">
          <path d={RAYS} fill="#FF6A13" opacity="0.16" />
        </svg>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(55% 55% at 50% 62%, rgba(255,106,16,0.75) 0%, rgba(255,90,31,0.22) 55%, rgba(255,90,31,0) 100%)" }}
        />
        {/* The grill pit, with the coals glowing along the top of it */}
        <div className="absolute inset-x-0 bottom-0" style={{ top: discPct(128 - DISC.y), background: INK }} />
        <div
          className="badge-coal absolute inset-x-0"
          style={{ top: discPct(130 - DISC.y), height: discPct(32), background: "linear-gradient(to bottom, rgba(255,90,31,0), rgba(255,90,31,0.9) 60%, #FF6A13)" }}
        />
        {EMBERS.map((ember) => (
          <span
            key={ember.x}
            className="badge-ember"
            style={{
              left: discPct(ember.x - ember.size - DISC.x),
              top: discPct(128 - ember.size - DISC.y),
              width: discPct(ember.size * 2),
              aspectRatio: "1",
              "--ex": `${(ember.size * 3 * 100) / (ember.size * 2)}%`,
              "--ey": `${(-50 * 100) / (ember.size * 2)}%`,
              "--ex2": `${(-ember.size * 2 * 100) / (ember.size * 2)}%`,
              "--ey2": `${(-86 * 100) / (ember.size * 2)}%`,
              "--dur": `${ember.dur}s`,
              "--delay": `${ember.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 3. Grate and rim */}
      <svg viewBox={VB} aria-hidden="true" shapeRendering="geometricPrecision" className={layer} fill="none" overflow="visible">
        <defs>
          <clipPath id={id("disc")}>
            <circle cx="120" cy="120" r="76" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id("disc")})`}>
          <g stroke="#C9D1D6" strokeLinecap="round">
                      <path d="M40 129 H200" stroke={INK} strokeWidth="7" />
                      <path d="M40 129 H200" strokeWidth="4" />
                      {[48, 62, 76, 90, 104, 118, 132, 146, 160, 174, 188, 202].map(
                        (x) => (
                          <g key={x}>
                            <path
                              d={`M${x} 131 L${120 + (x - 120) * 1.12} 160`}
                              stroke={INK}
                              strokeWidth="5.4"
                            />
                            <path
                              d={`M${x} 131 L${120 + (x - 120) * 1.12} 160`}
                              strokeWidth="3"
                            />
                          </g>
                        ),
                      )}
                    </g>
        </g>
        <circle cx="120" cy="120" r="76" stroke={INK} strokeWidth="3" />
        <circle cx="120" cy="120" r="72" stroke={SUN} strokeWidth="1.2" opacity="0.8" />
      </svg>

      {/* 4. The flame bro */}
      <div aria-hidden="true" className="fb-bob pointer-events-none absolute inset-0" style={{ "--bob": "-1.17%" }}>
        <svg viewBox={VB} shapeRendering="geometricPrecision" className="fb-breathe absolute inset-0 h-full w-full" style={{ transformOrigin: "50.4% 55.6%" }} fill="none" overflow="visible">
          <g transform="translate(70.5 45) scale(0.49)">
            <FlameBroArt uid={uid} />
          </g>
        </svg>
      </div>

      {/* 5. Ribbon */}
      <svg viewBox={VB} aria-hidden="true" shapeRendering="geometricPrecision" textRendering="geometricPrecision" className={layer} fill="none" overflow="visible">
        <defs>
          <path id={id("rib")} d="M 18 170.75 Q 120 184.75 222 170.75" />
        </defs>
              <g>
                <g>
                  <path
                    d="M4 152 L32 146 L32 182 L4 188 L14 170 Z"
                    fill="#A81F06"
                    stroke={INK}
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M236 152 L208 146 L208 182 L236 188 L226 170 Z"
                    fill="#A81F06"
                    stroke={INK}
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 146 Q120 160 222 146 L222 182 Q120 196 18 182 Z"
                    fill={CHILI}
                    stroke={INK}
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 150 Q120 164 218 150"
                    stroke={CREAM}
                    strokeWidth="1.5"
                    opacity=".7"
                  />
                  <path
                    d="M22 178 Q120 192 218 178"
                    stroke={CREAM}
                    strokeWidth="1.5"
                    opacity=".7"
                  />
                  <text
                    style={FONT}
                    fontSize="19"
                    letterSpacing="2.2"
                    fill={CREAM}
                    stroke={INK}
                    strokeWidth="0.6"
                    paintOrder="stroke"
                    textAnchor="middle"
                  >
                    <textPath href={`#${id("rib")}`} startOffset="50%">
                      SMOKY BROS
                    </textPath>
                  </text>
                </g>
              </g>
      </svg>
    </div>
  );
}

/**
 * @param intro  Build the badge piece by piece, for the boot loader
 * @param alive  Spin the sunburst, flicker the fire, and float embers
 * @param delay  Seconds to wait before the intro starts
 */
export default function Logo({
  className = "h-40 w-40",
  intro = false,
  alive = false,
  delay = 0,
}) {
  const uid = useId().replace(/:/g, "");
  if (alive) return <AliveLogo className={className} />;
  const id = (name) => `${name}${uid}`;
  const p = (at) => (intro ? pop(delay + at) : { initial: false });

  return (
    <svg
      viewBox="-6 -6 252 252"
      role="img"
      aria-label="Smoky Bros BBQ, slow smoked"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      className={className}
      fill="none"
      overflow="visible"
    >
      <defs>
        <linearGradient id={id("coal")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF5A1F" stopOpacity="0" />
          <stop offset="0.6" stopColor="#FF5A1F" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FF6A13" />
        </linearGradient>
        <radialGradient id={id("glow")} cx="0.5" cy="0.62" r="0.55">
          <stop offset="0" stopColor="#FF6A10" stopOpacity="0.75" />
          <stop offset="0.55" stopColor="#FF5A1F" stopOpacity="0.22" />
          <stop offset="1" stopColor="#FF5A1F" stopOpacity="0" />
        </radialGradient>
        <clipPath id={id("disc")}>
          <circle cx="120" cy="120" r="76" />
        </clipPath>
        {/* Lettering arcs: each baseline is set from its cap height so the capitals sit on the centre line of the band, r 92 */}
        <path id={id("top")} d="M 33.7 120 A 86.3 86.3 0 0 1 206.3 120" />
        <path id={id("bot")} d="M 23.9 120 A 96.1 96.1 0 0 0 216.1 120" />
        {/* The ribbon's own centreline (163 at the ends, 171 in the middle), dropped by half a cap height so the capitals sit dead centre */}
        <path id={id("rib")} d="M 18 170.75 Q 120 184.75 222 170.75" />
      </defs>

      {/* Seal and ring */}
      <motion.g style={centred} {...p(0)}>
        <circle cx="120" cy="120" r="117" fill={INK} />
        <circle cx="120" cy="120" r="111" stroke={SUN} strokeWidth="2" />
        <circle cx="120" cy="120" r="92" stroke="#1A0E0B" strokeWidth="28" />
        <circle cx="120" cy="120" r="106.5" stroke={CREAM} strokeOpacity="0.45" strokeWidth="0.8" />
        <circle cx="120" cy="120" r="77.5" stroke={SUN} strokeWidth="1.2" />
        <text
          style={FONT}
          fontSize="16"
          letterSpacing="3.2"
          fill={CREAM}
          textAnchor="middle"
        >
          <textPath href={`#${id("top")}`} startOffset="50%">
            SLOW SMOKED BBQ
          </textPath>
        </text>
        <text
          style={FONT}
          fontSize="11.5"
          letterSpacing="3.2"
          fill={CREAM}
          textAnchor="middle"
        >
          <textPath href={`#${id("bot")}`} startOffset="50%">
            MAIDENHEAD
          </textPath>
        </text>
        <polygon
          transform="translate(4 0)"
          points="24,114 26.5,119.5 32,120 27.8,123.6 29,129 24,126.2 19,129 20.2,123.6 16,120 21.5,119.5"
          fill={SUN}
        />
        <polygon
          transform="translate(-4 0)"
          points="216,114 218.5,119.5 224,120 219.8,123.6 221,129 216,126.2 211,129 212.2,123.6 208,120 213.5,119.5"
          fill={SUN}
        />
      </motion.g>

      {/* Sunburst disc */}
      <motion.g style={centred} {...p(0.25)}>
        <circle cx="120" cy="120" r="76" fill="#1C1613" />
        <g clipPath={`url(#${id("disc")})`}>
          <motion.g
            style={{ transformOrigin: "120px 120px" }}
            animate={alive ? { rotate: 360 } : undefined}
            transition={
              alive
                ? { duration: 90, ease: "linear", repeat: Infinity }
                : undefined
            }
          >
            <path d={RAYS} fill="#FF6A13" opacity="0.16" />
          </motion.g>
        </g>
        <circle cx="120" cy="120" r="76" fill={`url(#${id("glow")})`} />
        {/* The grill: a dark pit with glowing coals and a steel grate the flame bro stands on */}
        <g clipPath={`url(#${id("disc")})`}>
          <rect x="40" y="128" width="160" height="80" fill={INK} />
          <motion.rect
            x="40"
            y="130"
            width="160"
            height="32"
            fill={`url(#${id("coal")})`}
            animate={alive ? { opacity: [0.75, 1, 0.8, 1, 0.75] } : undefined}
            transition={
              alive
                ? { duration: 1.8, ease: "easeInOut", repeat: Infinity }
                : undefined
            }
          />
          <g stroke="#C9D1D6" strokeLinecap="round">
            <path d="M40 129 H200" stroke={INK} strokeWidth="7" />
            <path d="M40 129 H200" strokeWidth="4" />
            {[48, 62, 76, 90, 104, 118, 132, 146, 160, 174, 188, 202].map(
              (x) => (
                <g key={x}>
                  <path
                    d={`M${x} 131 L${120 + (x - 120) * 1.12} 160`}
                    stroke={INK}
                    strokeWidth="5.4"
                  />
                  <path
                    d={`M${x} 131 L${120 + (x - 120) * 1.12} 160`}
                    strokeWidth="3"
                  />
                </g>
              ),
            )}
          </g>
        </g>
        <circle cx="120" cy="120" r="76" stroke={INK} strokeWidth="3" />
        <circle cx="120" cy="120" r="72" stroke={SUN} strokeWidth="1.2" opacity="0.8" />
      </motion.g>

      {/* Embers floating up off the grill */}
      {alive &&
        EMBERS.map((ember) => (
          <motion.circle
            key={ember.x}
            cx={ember.x}
            cy="128"
            r={ember.size}
            fill="#FF6A13"
            stroke={INK}
            strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -50, -86],
              x: [0, ember.size * 3, -ember.size * 2],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: ember.dur,
              delay: ember.delay,
              ease: "easeOut",
              repeat: Infinity,
            }}
          />
        ))}

      {/* The flame bro, on his own with no props, standing on the grate */}
      <motion.g style={centred} {...p(0.5)}>
        <g transform="translate(70.5 45) scale(0.49)">
          <FlameBroArt uid={uid} alive={alive} />
        </g>
      </motion.g>

      {/* Ribbon */}
      <motion.g
        style={centred}
        {...(intro
          ? {
              initial: { scaleX: 0, opacity: 0 },
              animate: { scaleX: 1, opacity: 1 },
              transition: {
                type: "spring",
                stiffness: 220,
                damping: 18,
                delay: delay + 0.8,
              },
            }
          : { initial: false })}
      >
        <g>
          <path
            d="M4 152 L32 146 L32 182 L4 188 L14 170 Z"
            fill="#A81F06"
            stroke={INK}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M236 152 L208 146 L208 182 L236 188 L226 170 Z"
            fill="#A81F06"
            stroke={INK}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M18 146 Q120 160 222 146 L222 182 Q120 196 18 182 Z"
            fill={CHILI}
            stroke={INK}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M22 150 Q120 164 218 150"
            stroke={CREAM}
            strokeWidth="1.5"
            opacity=".7"
          />
          <path
            d="M22 178 Q120 192 218 178"
            stroke={CREAM}
            strokeWidth="1.5"
            opacity=".7"
          />
          <text
            style={FONT}
            fontSize="19"
            letterSpacing="2.2"
            fill={CREAM}
            stroke={INK}
            strokeWidth="0.6"
            paintOrder="stroke"
            textAnchor="middle"
          >
            <textPath href={`#${id("rib")}`} startOffset="50%">
              SMOKY BROS
            </textPath>
          </text>
        </g>
      </motion.g>
    </svg>
  );
}
