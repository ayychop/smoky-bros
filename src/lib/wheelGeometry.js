// The geometry of the wheel round the flame bro. Everything lives in one square, 100 units a side, centre (50, 50).
// An angle is in degrees clockwise from the top.

export const WHEEL_RADIUS = 44

/** The point at `degrees` round the wheel, `radius` from the centre, as percentages of the stage */
export const polar = (degrees, radius = WHEEL_RADIUS) => {
  const angle = ((degrees - 90) * Math.PI) / 180
  return { x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle) }
}

// Where the four things sit on the rim. Mirror images of each other, so the wheel is perfectly balanced.
export const STOPS = {
  brisket: -55,
  seal: 55,
  wings: 125,
  ribs: -125,
}
