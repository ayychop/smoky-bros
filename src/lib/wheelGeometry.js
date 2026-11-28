// The geometry of the wheel round the flame bro. Everything lives in one square, 100 units a side, centre (50, 50).
// An angle is in degrees clockwise from the top.
//
// The rule that makes the spacing exact: each spoke runs out along a diagonal and ends in a bead that sits level with the
// middle of its card's inner edge, the same small gap away from the card every time. The cards sit with their centres on
// the rim. Those two facts pin the position of everything, so it is worked out here rather than guessed.

export const WHEEL_RADIUS = 44

/** How wide each card (and the booking seal) is, as a share of the stage */
export const ITEM_WIDTH = 24

/** Gap from a bead's centre to the edge of its card */
const BEAD_GAP = 2

/** The point at `degrees` round the wheel, `radius` from the centre, as percentages of the stage */
export const polar = (degrees, radius = WHEEL_RADIUS) => {
  const angle = ((degrees - 90) * Math.PI) / 180
  return { x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle) }
}

// Bead at (d, d) from the centre on the diagonal. The card centre is level with it, half a card and the gap further out,
// and must sit on the rim:  (d + a)^2 + d^2 = R^2,  where a = half a card + the gap.
const a = ITEM_WIDTH / 2 + BEAD_GAP
const d = (-a + Math.sqrt(2 * WHEEL_RADIUS ** 2 - a ** 2)) / 2

/** How far a card centre is from the centre of the wheel, across and down */
export const ITEM_OFFSET = { x: d + a, y: d }

/** The angle a card centre sits at on the rim, from straight up (the bottom pair are the mirror image) */
export const ITEM_ANGLE = (Math.atan2(ITEM_OFFSET.x, ITEM_OFFSET.y) * 180) / Math.PI

/** Where the four sit: centres as percentages of the stage */
export const ITEM_AT = {
  brisket: { x: 50 - ITEM_OFFSET.x, y: 50 - ITEM_OFFSET.y },
  seal: { x: 50 + ITEM_OFFSET.x, y: 50 - ITEM_OFFSET.y },
  wings: { x: 50 + ITEM_OFFSET.x, y: 50 + ITEM_OFFSET.y },
  ribs: { x: 50 - ITEM_OFFSET.x, y: 50 + ITEM_OFFSET.y },
}

/** Where each bead sits, and how far out along its diagonal */
export const BEAD_AT = {
  brisket: { x: 50 - d, y: 50 - d },
  seal: { x: 50 + d, y: 50 - d },
  wings: { x: 50 + d, y: 50 + d },
  ribs: { x: 50 - d, y: 50 + d },
}
export const BEAD_RADIUS = d * Math.SQRT2

/** Where the dotted trails start: well inside the flame, which is drawn over them, so they leave from its outline wherever it is */
export const SPOKE_FROM = 14

// The flame bro is drawn centred by its bounding box, but its weight (the belly and the face) sits low in the box, and
// anything placed dead centre reads as low. So he is set to the optical centre: his eyes sit on the centre line of the
// dial and the bulk of him sits just above it. The lift is a share of the stage. He also floats up as he bobs (about 1.6
// at the top), so his average is 0.8 higher than where he rests, which the lift allows for.
export const MASCOT_HEIGHT = 58
export const MASCOT_LIFT = 4.8
