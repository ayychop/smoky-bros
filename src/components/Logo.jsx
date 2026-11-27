import { motion } from "framer-motion";
import { useId } from "react";
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
  const id = (name) => `${name}${uid}`;
  const p = (at) => (intro ? pop(delay + at) : { initial: false });

  return (
    <svg
      viewBox="-6 -6 252 252"
      role="img"
      aria-label="Smoky Bros BBQ, slow smoked"
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
