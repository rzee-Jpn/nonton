import type { Episode } from '@/types';

const episodes: Episode[] = [
  { number: 1, title: "Help Wanted", description: "SpongeBob melamar kerja di Krusty Krab.", servers: [{ name: "Default", url: "" }] },
  { number: 2, title: "Reef Blower", description: "SpongeBob mencoba membersihkan halaman dengan alat blower.", servers: [{ name: "Default", url: "" }] },
  { number: 3, title: "Tea at the Treedome", description: "SpongeBob bertemu Sandy dan kesulitan bernapas di darat.", servers: [{ name: "Default", url: "" }] },

  { number: 4, title: "Bubblestand", description: "SpongeBob membuka stand meniup gelembung.", servers: [{ name: "Default", url: "" }] },
  { number: 5, title: "Ripped Pants", description: "SpongeBob membuat lelucon celana robek demi perhatian.", servers: [{ name: "Default", url: "" }] },

  { number: 6, title: "Jellyfishing", description: "SpongeBob dan Patrick berburu ubur-ubur.", servers: [{ name: "Default", url: "" }] },
  { number: 7, title: "Plankton!", description: "Plankton mencoba mencuri resep Krabby Patty.", servers: [{ name: "Default", url: "" }] },

  { number: 8, title: "Naughty Nautical Neighbors", description: "SpongeBob dan Patrick mengganggu Squidward.", servers: [{ name: "Default", url: "" }] },
  { number: 9, title: "Boating School", description: "SpongeBob terus gagal dalam ujian mengemudi.", servers: [{ name: "Default", url: "" }] },

  { number: 10, title: "Pizza Delivery", description: "SpongeBob dan Squidward mengantar pizza ke pelanggan.", servers: [{ name: "Default", url: "" }] },
  { number: 11, title: "Home Sweet Pineapple", description: "Rumah SpongeBob hancur dan ia kehilangan tempat tinggal.", servers: [{ name: "Default", url: "" }] },

  { number: 12, title: "Mermaid Man and Barnacle Boy", description: "SpongeBob bertemu pahlawan favoritnya.", servers: [{ name: "Default", url: "" }] },
  { number: 13, title: "Pickles", description: "SpongeBob kehilangan kepercayaan diri karena acar.", servers: [{ name: "Default", url: "" }] },

  { number: 14, title: "Hall Monitor", description: "SpongeBob menjadi polisi lalu lintas yang berlebihan.", servers: [{ name: "Default", url: "" }] },
  { number: 15, title: "Jellyfish Jam", description: "Pesta ubur-ubur mengganggu Squidward.", servers: [{ name: "Default", url: "" }] },

  { number: 16, title: "Sandy's Rocket", description: "SpongeBob dan Patrick menyusup ke roket Sandy.", servers: [{ name: "Default", url: "" }] },
  { number: 17, title: "Squeaky Boots", description: "Sepatu berdecit membuat Mr. Krabs terganggu.", servers: [{ name: "Default", url: "" }] },

  { number: 18, title: "Nature Pants", description: "SpongeBob mencoba hidup seperti ubur-ubur.", servers: [{ name: "Default", url: "" }] },
  { number: 19, title: "Opposite Day", description: "Squidward mencoba menjual rumahnya dengan trik kebalikan.", servers: [{ name: "Default", url: "" }] },

  { number: 20, title: "Culture Shock", description: "Krusty Krab mengadakan pertunjukan bakat.", servers: [{ name: "Default", url: "" }] },
  { number: 21, title: "F.U.N.", description: "SpongeBob mengajarkan Plankton arti kesenangan.", servers: [{ name: "Default", url: "" }] },

  { number: 22, title: "MuscleBob BuffPants", description: "SpongeBob memakai otot palsu untuk terlihat kuat.", servers: [{ name: "Default", url: "" }] },
  { number: 23, title: "Squidward the Unfriendly Ghost", description: "Squidward berpura-pura menjadi hantu.", servers: [{ name: "Default", url: "" }] },

  { number: 24, title: "The Chaperone", description: "SpongeBob menemani Pearl ke pesta.", servers: [{ name: "Default", url: "" }] },
  { number: 25, title: "Employee of the Month", description: "SpongeBob bersaing dengan Squidward.", servers: [{ name: "Default", url: "" }] },

  { number: 26, title: "Scaredy Pants", description: "SpongeBob mencoba menakuti orang saat Halloween.", servers: [{ name: "Default", url: "" }] },
  { number: 27, title: "I Was a Teenage Gary", description: "SpongeBob berubah menjadi siput.", servers: [{ name: "Default", url: "" }] },

  { number: 28, title: "SB-129", description: "Squidward terjebak di masa depan.", servers: [{ name: "Default", url: "" }] },
  { number: 29, title: "Karate Choppers", description: "SpongeBob dan Sandy kecanduan karate.", servers: [{ name: "Default", url: "" }] },

  { number: 30, title: "Sleepy Time", description: "Petualangan di dunia mimpi.", servers: [{ name: "Default", url: "" }] },
  { number: 31, title: "Suds", description: "SpongeBob sakit dan takut ke dokter.", servers: [{ name: "Default", url: "" }] },

  { number: 32, title: "Valentine's Day", description: "Patrick kecewa dengan hadiah Valentine.", servers: [{ name: "Default", url: "" }] },
  { number: 33, title: "The Paper", description: "Squidward menemukan nilai dari kertas.", servers: [{ name: "Default", url: "" }] },

  { number: 34, title: "Arrgh!", description: "Perburuan harta karun bersama Mr. Krabs.", servers: [{ name: "Default", url: "" }] },
  { number: 35, title: "Rock Bottom", description: "SpongeBob tersesat di tempat aneh.", servers: [{ name: "Default", url: "" }] },

  { number: 36, title: "Texas", description: "Sandy rindu kampung halamannya.", servers: [{ name: "Default", url: "" }] },
  { number: 37, title: "Walking Small", description: "Plankton mencoba mengajari kejahatan.", servers: [{ name: "Default", url: "" }] },

  { number: 38, title: "Fools in April", description: "Lelucon April Mop membuat SpongeBob sedih.", servers: [{ name: "Default", url: "" }] },
  { number: 39, title: "Neptune's Spatula", description: "SpongeBob menantang Neptune memasak.", servers: [{ name: "Default", url: "" }] },

  { number: 40, title: "Hooky", description: "SpongeBob tergoda kait misterius.", servers: [{ name: "Default", url: "" }] },
  { number: 41, title: "Mermaid Man and Barnacle Boy II", description: "Petualangan lanjutan bersama pahlawan favorit.", servers: [{ name: "Default", url: "" }] }
];

export default episodes;