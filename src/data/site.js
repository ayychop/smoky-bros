import {
  Beef,
  Briefcase,
  Drumstick,
  Droplets,
  Flame,
  Handshake,
  Heart,
  PartyPopper,
  Salad,
  Store,
  Users,
  Utensils,
  Wheat,
} from 'lucide-react'

export const INSTAGRAM_HANDLE = '@smokybrosuk'
export const INSTAGRAM_URL = 'https://www.instagram.com/smokybrosuk/'

export const MENU_ITEMS = [
  {
    name: 'Smoked Brisket',
    note: 'Low and slow over live fire, dark bark outside, tender through the middle.',
    Icon: Beef,
  },
  {
    name: 'Ember Wings',
    note: 'Kissed by the fire and glazed, finished hot so they land sticky and loud.',
    Icon: Drumstick,
  },
  {
    name: 'Charred Corn',
    note: 'Blistered on the grill and brushed with smoked butter.',
    Icon: Wheat,
  },
  {
    name: 'House Slaw',
    note: 'Cool, sharp and crunchy, built to cut straight through the smoke.',
    Icon: Salad,
  },
]

// The brand line. Kept in one place so the hero, meta and footer can never drift apart.
export const SLOGAN = { lead: 'Made in', accent: 'Smoke' }

export const TESTIMONIALS = [
  { quote: 'Best BBQ in Berkshire', author: '@foodie_uk' },
  { quote: 'Unreal catering', author: '@MaidenheadEvents' },
  { quote: 'You have to try the brisket', author: '@BerkshireEats' },
]

// Verified to load. Each is an Unsplash photo, sized by the component that uses it.
const unsplash = (id, width = 1000) => `https://images.unsplash.com/photo-${id}?q=80&w=${width}&auto=format&fit=crop`

export const IMAGES = {
  origin: unsplash('1529193591184-b1d58069ecdd'),
}

// An asymmetrical bento: one tall hero card, then smaller cards around it.
// These photos are verified to load and match their captions. The brisket, wings,
// sides and sauce URLs in the first brief returned a 404 or the wrong food.
export const SHOWCASE = [
  {
    title: 'Smoked Brisket',
    note: 'Low and slow over live fire',
    alt: 'A slab of smoked brisket with a dark crust resting beside flames',
    image: unsplash('1558030089-02acba3c214e', 1400),
    layout: 'md:col-span-4 md:row-span-2',
  },
  {
    title: 'Ember Wings',
    note: 'Glazed over the flames and sticky',
    alt: 'Chicken sizzling on a kettle grill over red hot coals',
    image: unsplash('1750277093031-1ef101be01c5'),
    layout: 'md:col-span-2',
  },
  {
    title: 'House Sides',
    note: 'Charred over the same fire',
    alt: 'A corn cob charring over an open flame with sparks rising',
    image: unsplash('1791217640572-4ee08526f32d'),
    layout: 'md:col-span-2',
  },
  {
    title: 'Glazed Ribs',
    note: 'The one everyone asks about',
    alt: 'A glossy sauce glazed rack of ribs smoking on the grill',
    image: unsplash('1679711246825-1f2bd51b16d0'),
    layout: 'md:col-span-2 md:row-span-2',
  },
]

// The house rules, in the spirit of a place that makes you feel at home the moment you walk in
export const BRO_CODE = [
  { index: 'One', Icon: Flame, title: 'Low and slow, always', copy: 'Good smoke takes the time it takes. We never rush the fire and you will taste why.' },
  { index: 'Two', Icon: Utensils, title: 'Nobody leaves hungry', copy: 'Seconds are practically mandatory, and we plan the portions so everyone goes home happy.' },
  { index: 'Three', Icon: Droplets, title: 'The sauce is shared', copy: 'Pass it down the table, dip everything and never ask who made the last of it.' },
  { index: 'Four', Icon: Users, title: 'Everyone is welcome at the fire', copy: 'Big kids, little kids and grown ups all get a seat. Strangers turn into friends around good food.' },
]

export const EVENT_TYPES = [
  { id: 'private', label: 'Private Party', blurb: 'Birthdays, garden parties and milestone nights.', Icon: PartyPopper },
  { id: 'celebration', label: 'Wedding or Celebration', blurb: 'The big day, fed properly.', Icon: Heart },
  { id: 'corporate', label: 'Corporate', blurb: 'Team days, launches and client evenings.', Icon: Briefcase },
  { id: 'street', label: 'Street Food Pop Up', blurb: 'Stacks served hot, built for the queue.', Icon: Store },
]

export const SERVICES = [
  {
    id: 'private-catering',
    index: '01',
    title: 'Private Catering',
    tagline: 'BBQ cooked over fire for private events across Maidenhead and Berkshire',
    copy: 'We bring the fire to you. Smoked, grilled and glazed on site, with a menu shaped around your guests and your night.',
    includes: [
      'Cooking over live fire at your venue',
      'A menu built around your guest list',
      'Dietary needs planned in from day one',
      'Setup, service and clear down',
    ],
    price: 'Bespoke Quotes',
    Icon: Flame,
    cta: { label: 'Book private catering', to: '/book' },
  },
  {
    id: 'street-food',
    index: '02',
    title: 'Street Food',
    tagline: 'BBQ stacks, built for the queue and served hot',
    copy: 'Pop ups, markets, launches and venue nights. A tight, loud menu that moves fast and tastes like it took all day.',
    includes: [
      'Signature stacks and sides to order',
      'Ready for the queue, fast service',
      'Made for launches, markets and venues',
      'Find us outside, wherever the fire is',
    ],
    price: 'Priced per event',
    Icon: Store,
    cta: { label: 'Book a pop up', to: '/book' },
  },
  {
    id: 'partnerships',
    index: '03',
    title: 'Partnerships',
    tagline: 'DM for partnerships',
    copy: 'Brand activations, venue residencies and collaborations with partners who care about flavour as much as we do.',
    includes: [
      'Brand and venue collaborations',
      'Residencies and recurring nights',
      'Fire and food made for the camera',
      'Bespoke menus for your audience',
    ],
    price: 'By conversation',
    Icon: Handshake,
    cta: { label: 'Start a conversation', to: '/enquiry' },
  },
]

export const PROCESS = [
  { index: '01', title: 'Enquire', copy: 'Tell us about the event. A few details is plenty to start.' },
  { index: '02', title: 'Shape the menu', copy: 'We build the menu around your guests, your space and your appetite.' },
  { index: '03', title: 'Lock the date', copy: 'Confirm the booking and the fire is yours. Bookings are open for 2027.' },
  { index: '04', title: 'We bring the fire', copy: 'We arrive, light up and cook. You enjoy your own event.' },
]

export const FAQS = [
  {
    q: 'How far ahead should I book?',
    a: 'Bookings are open for 2027. Popular dates go first, so the earlier you enquire the better.',
  },
  {
    q: 'Do you cater for dietary requirements?',
    a: 'Yes. Tell us what your guests need when you enquire and we will shape the menu around it.',
  },
  {
    q: 'Where do you cook?',
    a: 'We are based in Maidenhead and serve private events across Berkshire. Further afield, just ask.',
  },
  {
    q: 'What is the quickest way to reach you?',
    a: `Send us a DM on Instagram at ${INSTAGRAM_HANDLE}, or use the enquiry form and we will come back to you.`,
  },
]
