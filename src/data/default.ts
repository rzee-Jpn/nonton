import type { Database } from '@/types';

export const DEFAULT_DB: Database = {
  settings: {
    site_name: "AnimeXStream",
    site_tagline: "Nonton Anime Subtitle Indonesia",
    gojek_number: "6285000000001",
    dana_link: "https://link.dana.id/qr/contoh",
    ovo_link: "https://ovo.id/send/contoh",
    shopee_link: "https://shopee.co.id/universal-link/contoh",
    whatsapp_number: "6285000000001",
    whatsapp_msg: "Halo, saya ingin donasi untuk support AnimeXStream 🙏",
    qris_image: "",
    admin_password: "admin123",
    featured_slug: "naruto",
    // GitHub Sync (isi di Admin → GitHub Sync)
    github_token: "",
    github_owner: "",
    github_repo: "",
    github_branch: "main"
  },
  anime: [
    {
      id: 1,
      title: "Naruto",
      slug: "naruto",
      cover: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
      banner: "https://cdn.myanimelist.net/images/anime/13/17405l.jpg",
      status: "Completed",
      total_episodes: 220,
      genres: ["Action", "Adventure", "Comedy", "Shounen"],
      year: 2002,
      studio: "Studio Pierrot",
      rating: "8.4",
      description: "Naruto Uzumaki adalah ninja muda dari Desa Konoha yang menyimpan dalam tubuhnya siluman rubah berekor sembilan. Diejek dan dikucilkan oleh warga desa, Naruto bertekad untuk menjadi Hokage — pemimpin terkuat desa — agar semua orang mengakui keberadaannya.",
      trailer: ""
    },
    {
      id: 2,
      title: "Attack on Titan",
      slug: "aot",
      cover: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      banner: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
      status: "Completed",
      total_episodes: 87,
      genres: ["Action", "Drama", "Fantasy", "Military"],
      year: 2013,
      studio: "MAPPA",
      rating: "9.1",
      description: "Berabad-abad lalu, manusia hampir punah karena makhluk raksasa pemangsa manusia yang disebut Titan. Manusia berlindung di balik tembok raksasa — sampai hari itu tiba ketika Titan Kolosal menerobos masuk. Eren Yeager bersumpah untuk membasmi seluruh Titan.",
      trailer: ""
    },
    {
      id: 3,
      title: "Demon Slayer",
      slug: "demon-slayer",
      cover: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
      banner: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
      status: "Ongoing",
      total_episodes: 44,
      genres: ["Action", "Fantasy", "Historical", "Shounen"],
      year: 2019,
      studio: "ufotable",
      rating: "8.7",
      description: "Tanjiro Kamado hidup damai bersama keluarganya di pegunungan. Sampai suatu hari ia pulang dan mendapati seluruh keluarganya dibantai iblis. Satu-satunya yang selamat adalah adiknya, Nezuko — yang kini berubah menjadi iblis. Tanjiro bersumpah untuk menyembuhkan Nezuko dan membalas dendam.",
      trailer: ""
    },
    {
      id: 4,
      title: "One Piece",
      slug: "one-piece",
      cover: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
      banner: "https://cdn.myanimelist.net/images/anime/6/73245l.jpg",
      status: "Ongoing",
      total_episodes: 1100,
      genres: ["Action", "Adventure", "Comedy", "Fantasy"],
      year: 1999,
      studio: "Toei Animation",
      rating: "8.7",
      description: "Monkey D. Luffy memiliki mimpi menjadi Raja Bajak Laut dengan menemukan harta karun legendaris One Piece. Setelah memakan buah iblis Gomu Gomu, tubuhnya menjadi karet. Bersama kru Topi Jerami, ia mengarungi Grand Line dalam petualangan epik.",
      trailer: ""
    },
    {
      id: 5,
      title: "Jujutsu Kaisen",
      slug: "jjk",
      cover: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
      banner: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
      status: "Ongoing",
      total_episodes: 48,
      genres: ["Action", "Horror", "Supernatural", "Shounen"],
      year: 2020,
      studio: "MAPPA",
      rating: "8.6",
      description: "Yuji Itadori adalah anak SMA dengan kekuatan fisik luar biasa. Ketika temannya terlibat dengan kutukan kelas tinggi, Yuji menelan jari Sukuna — Raja Kutukan. Kini ia menjadi inang Sukuna dan harus mengumpulkan seluruh jari kutukan sebelum dieksekusi.",
      trailer: ""
    },
    {
      id: 6,
      title: "Bleach",
      slug: "bleach",
      cover: "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
      banner: "https://cdn.myanimelist.net/images/anime/3/40451l.jpg",
      status: "Completed",
      total_episodes: 366,
      genres: ["Action", "Adventure", "Supernatural"],
      year: 2004,
      studio: "Studio Pierrot",
      rating: "8.1",
      description: "Ichigo Kurosaki adalah remaja yang bisa melihat roh. Hidupnya berubah saat ia secara tidak sengaja menyerap kekuatan Soul Reaper milik Rukia Kuchiki. Kini ia harus menjalankan tugas sebagai Soul Reaper — membasmi makhluk jahat Hollow.",
      trailer: ""
    }
  ],
  episodes: {
    "naruto": [
      { number: 1, title: "Enter: Naruto Uzumaki!", description: "Naruto Uzumaki, ninja nakal yang menjengkelkan warga Konoha, nekat mencuri gulungan terlarang untuk jadi ninja.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, { name: "VK", url: "https://vk.com/video_ext.php?oid=-22500&id=456245943&hash=b3ae4b4143e3e0be" }] },
      { number: 2, title: "My Name Is Konohamaru!", description: "Naruto bertemu Konohamaru, cucu Hokage Ketiga yang ingin belajar Jutsu Pembuatan Bayangan.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, { name: "Doodstream", url: "https://dood.watch/e/sample" }] },
      { number: 3, title: "Sasuke and Sakura: Friends or Foes?", description: "Tim 7 terbentuk. Naruto, Sasuke, dan Sakura bertemu Kakashi-sensei mereka.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }] },
      { number: 4, title: "Pass or Fail: Survival Test", description: "Kakashi menguji Tim 7 dengan latihan lonceng — dan hanya ada dua lonceng untuk tiga orang.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, { name: "VK", url: "https://vk.com/video_ext.php?oid=-22500&id=456245943&hash=b3ae4b4143e3e0be" }] },
      { number: 5, title: "You Failed! Kakashi's Final Decision", description: "Tim 7 gagal ujian lonceng. Kakashi memberi mereka satu kesempatan terakhir.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }] },
    ],
    "aot": [
      { number: 1, title: "To You, in 2000 Years: The Fall of Shiganshina, Part 1", description: "Dalam dunia yang dikelilingi tembok raksasa, Eren Yeager menyaksikan Titan Kolosal menghancurkan kotanya.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, { name: "Doodstream", url: "https://dood.watch/e/sample" }] },
      { number: 2, title: "That Day: The Fall of Shiganshina, Part 2", description: "Eren dan Mikasa berhasil melarikan diri dari kepungan Titan. Sang Ibu tidak seberuntung itu.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }] },
      { number: 3, title: "A Dim Light Amid Despair: Humanity's Comeback, Part 1", description: "Beberapa tahun berlalu. Eren, Mikasa, dan Armin bergabung dengan Pasukan Pengintai.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, { name: "VK", url: "https://vk.com/video_ext.php?oid=-22500&id=456245943&hash=b3ae4b4143e3e0be" }] },
    ],
    "demon-slayer": [
      { number: 1, title: "Cruelty", description: "Tanjiro pulang ke rumah dan mendapati seluruh keluarganya dibantai iblis. Hanya Nezuko yang selamat — tapi ia telah berubah.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, { name: "Doodstream", url: "https://dood.watch/e/sample" }] },
      { number: 2, title: "Trainer Sakonji Urokodaki", description: "Giyu Tomioka mengirim Tanjiro ke Sakonji Urokodaki untuk pelatihan Pembasmi Iblis.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }] },
      { number: 3, title: "Sabito and Makomo", description: "Selama latihan di gunung, Tanjiro bertemu dua anak misterius — Sabito dan Makomo.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, { name: "VK", url: "https://vk.com/video_ext.php?oid=-22500&id=456245943&hash=b3ae4b4143e3e0be" }] },
    ],
    "one-piece": [
      { number: 1, title: "I'm Luffy! The Man Who's Gonna Be King of the Pirates!", description: "Seorang anak bernama Luffy bermimpi menjadi Raja Bajak Laut. Ia menyelamatkan Shanks yang kemudian memberinya topi jerami.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }] },
      { number: 2, title: "The Great Swordsman! Pirate Hunter Roronoa Zoro!", description: "Luffy menemukan Zoro, pemburu bajak laut dengan tiga pedang yang dipenjara oleh Kapten Morgan.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, { name: "Doodstream", url: "https://dood.watch/e/sample" }] },
    ],
    "jjk": [
      { number: 1, title: "Ryomen Sukuna", description: "Yuji Itadori menelan jari Ryomen Sukuna untuk melindungi teman-temannya dari kutukan.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, { name: "VK", url: "https://vk.com/video_ext.php?oid=-22500&id=456245943&hash=b3ae4b4143e3e0be" }] },
      { number: 2, title: "For Myself", description: "Yuji dibawa ke Tokyo Jujutsu High. Gojo Satoru memutuskan untuk memanfaatkan Yuji alih-alih mengeksekusinya.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }] },
    ],
    "bleach": [
      { number: 1, title: "The Day I Became a Shinigami", description: "Ichigo Kurosaki, remaja yang bisa melihat roh, secara tidak sengaja menyerap kekuatan Soul Reaper Rukia Kuchiki.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }] },
      { number: 2, title: "A Shinigami's Work", description: "Ichigo menjalani tugasnya sebagai Soul Reaper pengganti, membersihkan Hollow dari jalanan Karakura.", servers: [{ name: "YouTube", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, { name: "Doodstream", url: "https://dood.watch/e/sample" }] },
    ]
  },
  donators: [
    { id: 1, name: "Ahmad Rizky", amount: 100000, message: "Semangat terus! Suka banget sama subnya 🔥", date: "2025-03-18" },
    { id: 2, name: "Rina K.", amount: 50000, message: "Makasih udah gratis ya, semoga makin berkembang", date: "2025-03-17" },
    { id: 3, name: "Bagas W.", amount: 75000, message: "Top donator bulan ini! Keep it up 💪", date: "2025-03-16" },
    { id: 4, name: "Anonymous", amount: 25000, message: "", date: "2025-03-15" },
    { id: 5, name: "Dewi S.", amount: 30000, message: "AoT forever 🙏", date: "2025-03-14" },
    { id: 6, name: "Farhan D.", amount: 20000, message: "Terimakasih sudah kasih sub Indo", date: "2025-03-12" },
  ]
};
