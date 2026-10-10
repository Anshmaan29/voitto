export const WHATSAPP = "https://wa.link/s29inj";
export const PHONE = "+91 92698 33333";
export function enquiryLink(message: string) {
  return `https://api.whatsapp.com/send?phone=919269833333&text=${encodeURIComponent(message)}`;
}
export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};
export type Property = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  description: string;
  cover: string;
  coverAlt: string;
  amenities: string[];
  media: MediaItem[];
};
const photo = (slug: string, n: number, alt: string): MediaItem => ({
  type: "image",
  src: `/media/${slug}-${n}-1600.webp`,
  alt,
});
const video = (slug: string, n: number, alt: string): MediaItem => ({
  type: "video",
  src: `/media/${slug}-video-${n}.mp4`,
  poster: `/media/${slug}-video-${n}-poster-1600.webp`,
  alt,
});
export const properties: Property[] = [
  {
    slug: "akshay-garh",
    name: "Akshay Garh",
    kind: "The Aravalli retreat",
    tagline: "A little closer to nature.",
    description:
      "Surrounded by the serene beauty of Rajasthan’s Aravalli Hills, Akshay Garh invites you to slow down, breathe deeply and enjoy a peaceful retreat from everyday life.",
    cover: "akshay-garh-2",
    coverAlt:
      "Arched veranda looking towards the Aravalli Hills at Akshay Garh",
    amenities: ["Premium rooms", "Swimming pool", "Lawn & gazebo"],
    media: [
      photo("akshay-garh", 2, "Arched veranda at Akshay Garh"),
      photo("akshay-garh", 3, "Gardens and gazebo at Akshay Garh"),
      photo("akshay-garh", 1, "Premium bedroom at Akshay Garh"),
      video("akshay-garh", 1, "A tour of Akshay Garh"),
      video("akshay-garh", 2, "Another glimpse of Akshay Garh"),
    ],
  },
  {
    slug: "villa-sol",
    name: "Villa Sol",
    kind: "Your private escape",
    tagline: "Make yourself at home.",
    description:
      "Timeless charm meets modern comfort at Villa Sol. A two-bedroom villa with green surroundings, space to unwind and a warm welcome, whether you are here for leisure or business.",
    cover: "villa-sol-1",
    coverAlt: "The exterior of Villa Sol",
    amenities: ["2 BHK villa", "Swimming pool", "Greenery & gazebo"],
    media: [
      photo("villa-sol", 1, "Villa Sol exterior"),
      photo("villa-sol", 2, "Bedroom at Villa Sol"),
      photo("villa-sol", 3, "A closer look at a Villa Sol bedroom"),
      video("villa-sol", 1, "Villa Sol’s original website film"),
    ],
  },
  {
    slug: "kurja-resort",
    name: "Kurja Resort",
    kind: "Nature, unhurried",
    tagline: "Find your quieter side.",
    description:
      "A tranquil oasis in the landscapes of Rajasthan. Settle into a cosy private cottage, explore the nearby bird sanctuary or ask our team about salt lake safaris and riding experiences.",
    cover: "kurja-resort-1",
    coverAlt: "The pool at Kurja Resort beneath the evening sky",
    amenities: [
      "Private cottages",
      "Bird sanctuary nearby",
      "Salt lake safari",
    ],
    media: [
      photo("kurja-resort", 1, "Kurja Resort pool at dusk"),
      photo("kurja-resort", 2, "Bedroom at Kurja Resort"),
      photo("kurja-resort", 3, "Birdlife featured in the Kurja Resort gallery"),
      photo("kurja-resort", 4, "Garden and gazebos at Kurja Resort"),
      video("kurja-resort", 1, "A glimpse of Kurja Resort"),
    ],
  },
  {
    slug: "lakshmi-palace",
    name: "Lakshmi Palace",
    kind: "A touch of royalty",
    tagline: "Traditional charm. Warm comfort.",
    description:
      "Lakshmi Palace brings together traditional charm and modern comfort. Welcoming rooms, a palace setting and thoughtful hospitality make every stay feel special.",
    cover: "lakshmi-palace-1",
    coverAlt: "The ornate lounge at Lakshmi Palace",
    amenities: ["Palace setting", "Luxurious rooms", "Swimming pool"],
    media: [
      photo("lakshmi-palace", 1, "Ornate lounge at Lakshmi Palace"),
      photo("lakshmi-palace", 2, "Interior of Lakshmi Palace"),
      photo("lakshmi-palace", 3, "A seating area at Lakshmi Palace"),
      video("lakshmi-palace", 1, "Lakshmi Palace’s original website film"),
    ],
  },
];
export const destinations = [
  {
    image: "people-of-rajasthan",
    title: "The soul of Rajasthan",
    label: "Culture & connection",
    description:
      "Meet the people, traditions and everyday moments that give Rajasthan its warmth.",
  },
  {
    image: "kumbhalgarh-fort",
    title: "Stories written in stone",
    label: "Kumbhalgarh Fort",
    description:
      "Ancient walls, sweeping landscapes and a remarkable window into Rajasthan’s heritage.",
  },
  {
    image: "palace-on-lake",
    title: "A palace. A lake. A pause.",
    label: "Palace on the lake",
    description:
      "Discover the romance of Rajasthan’s lakeside palaces and their timeless silhouettes.",
  },
  {
    image: "kota-riverfront",
    title: "Evenings by the river",
    label: "Kota Riverfront",
    description:
      "Watch the riverfront light up as the day gives way to a different kind of beauty.",
  },
];
export const testimonials = [
  {
    name: "Naman Jain",
    text: "Akshay Garh is incredibly refreshing. It’s a beautiful and peaceful place, perfect for relaxing and unwinding. The best spot to chill on the weekends.",
  },
  {
    name: "Shilpi Silvi",
    text: "Stunning landscaping and views. Well designed property, peaceful, fantastic food, and courteous staff.",
  },
  {
    name: "Anshmaan Singh",
    text: "Your hospitality and generosity were amazing. Thank you for making our stay truly remarkable.",
  },
];
export const founderFocus = [
  "Hospitality management",
  "Tourism & travel",
  "Strategic partnerships",
  "Business development",
  "Guest experience",
  "Property development",
  "Branding & marketing",
];
export const faqs = [
  {
    question: "How do I book a stay?",
    answer:
      "Choose a property and send us an enquiry on WhatsApp. Our team will help with availability, prices and booking details. Your reservation is confirmed directly by the team.",
  },
  {
    question: "Can you help with a group stay or celebration?",
    answer:
      "Yes. The team welcomes enquiries for weddings, family functions, corporate events, school and college groups, and tour groups. Tell us your dates, group size and preferred property so we can discuss the options.",
  },
  {
    question: "Where can I see each property’s photos and videos?",
    answer:
      "Select “Explore the stay” on any property above. Explore its rooms, surroundings and films, then chat with our team to plan your stay.",
  },
  {
    question: "What are the cancellation and refund terms?",
    answer:
      "Terms vary by property, season and booking type. The team will share the applicable cancellation and refund policy when confirming your booking. Please ask before making a payment.",
  },
];
