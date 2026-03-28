import type { Anime } from '@/types';

const DEFAULT_ANIME: Anime[] = [
  {
    "id": 1,
    "title": "Naruto",
    "slug": "naruto",
    "cover": "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    "banner": "https://cdn.myanimelist.net/images/anime/13/17405l.jpg",
    "status": "Completed",
    "total_episodes": 220,
    "genres": [
      "Action",
      "Adventure",
      "Comedy",
      "Shounen"
    ],
    "year": 2002,
    "studio": "Studio Pierrot",
    "rating": "8.4",
    "description": "Naruto Uzumaki adalah ninja muda dari Desa Konoha yang menyimpan dalam tubuhnya siluman rubah berekor sembilan. Diejek dan dikucilkan oleh warga desa, Naruto bertekad untuk menjadi Hokage — pemimpin terkuat desa — agar semua orang mengakui keberadaannya.",
    "trailer": ""
  },
  {
    "id": 2,
    "title": "Attack on Titan",
    "slug": "aot",
    "cover": "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    "banner": "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
    "status": "Completed",
    "total_episodes": 87,
    "genres": [
      "Action",
      "Drama",
      "Fantasy",
      "Military"
    ],
    "year": 2013,
    "studio": "MAPPA",
    "rating": "9.1",
    "description": "Berabad-abad lalu, manusia hampir punah karena makhluk raksasa pemangsa manusia yang disebut Titan. Manusia berlindung di balik tembok raksasa — sampai hari itu tiba ketika Titan Kolosal menerobos masuk. Eren Yeager bersumpah untuk membasmi seluruh Titan.",
    "trailer": ""
  },
  {
    "id": 3,
    "title": "Demon Slayer",
    "slug": "demon-slayer",
    "cover": "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    "banner": "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
    "status": "Ongoing",
    "total_episodes": 44,
    "genres": [
      "Action",
      "Fantasy",
      "Historical",
      "Shounen"
    ],
    "year": 2019,
    "studio": "ufotable",
    "rating": "8.7",
    "description": "Tanjiro Kamado hidup damai bersama keluarganya di pegunungan. Sampai suatu hari ia pulang dan mendapati seluruh keluarganya dibantai iblis. Satu-satunya yang selamat adalah adiknya, Nezuko — yang kini berubah menjadi iblis. Tanjiro bersumpah untuk menyembuhkan Nezuko dan membalas dendam.",
    "trailer": ""
  },
  {
    "id": 4,
    "title": "One Piece",
    "slug": "one-piece",
    "cover": "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    "banner": "https://cdn.myanimelist.net/images/anime/6/73245l.jpg",
    "status": "Ongoing",
    "total_episodes": 1100,
    "genres": [
      "Action",
      "Adventure",
      "Comedy",
      "Fantasy"
    ],
    "year": 1999,
    "studio": "Toei Animation",
    "rating": "8.7",
    "description": "Monkey D. Luffy memiliki mimpi menjadi Raja Bajak Laut dengan menemukan harta karun legendaris One Piece. Setelah memakan buah iblis Gomu Gomu, tubuhnya menjadi karet. Bersama kru Topi Jerami, ia mengarungi Grand Line dalam petualangan epik.",
    "trailer": ""
  },
  {
    "id": 5,
    "title": "Jujutsu Kaisen",
    "slug": "jjk",
    "cover": "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    "banner": "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
    "status": "Ongoing",
    "total_episodes": 48,
    "genres": [
      "Action",
      "Horror",
      "Supernatural",
      "Shounen"
    ],
    "year": 2020,
    "studio": "MAPPA",
    "rating": "8.6",
    "description": "Yuji Itadori adalah anak SMA dengan kekuatan fisik luar biasa. Ketika temannya terlibat dengan kutukan kelas tinggi, Yuji menelan jari Sukuna — Raja Kutukan. Kini ia menjadi inang Sukuna dan harus mengumpulkan seluruh jari kutukan sebelum dieksekusi.",
    "trailer": ""
  },
  {
    "id": 6,
    "title": "Bleach",
    "slug": "bleach",
    "cover": "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
    "banner": "https://cdn.myanimelist.net/images/anime/3/40451l.jpg",
    "status": "Completed",
    "total_episodes": 366,
    "genres": [
      "Action",
      "Adventure",
      "Supernatural"
    ],
    "year": 2004,
    "studio": "Studio Pierrot",
    "rating": "8.1",
    "description": "Ichigo Kurosaki adalah remaja yang bisa melihat roh. Hidupnya berubah saat ia secara tidak sengaja menyerap kekuatan Soul Reaper milik Rukia Kuchiki. Kini ia harus menjalankan tugas sebagai Soul Reaper — membasmi makhluk jahat Hollow.",
    "trailer": ""
  },
  {
    "title": "Spongebob Squarepants",
    "slug": "spongebob",
    "cover": "https://static.wikia.nocookie.net/spongebob/images/3/3a/SBPSP1.jpg/revision/latest/scale-to-width-down/250?cb=20160807184109",
    "banner": "https://static.wikia.nocookie.net/spongebob/images/3/3a/SBPSP1.jpg/revision/latest/scale-to-width-down/250?cb=20160807184109",
    "studio": "Nickelodeon",
    "status": "Completed",
    "total_episodes": 1,
    "year": 1999,
    "rating": "8.2",
    "genres": [
      "Comedy",
      "adventure",
      "fantasy"
    ],
    "description": "SpongeBob SquarePants adalah serial animasi komedi tentang spons laut kuning ceria yang tinggal di dalam nanas, kota Bikini Bottom. Bekerja sebagai koki di Krusty Krab, SpongeBob menjalani petualangan kocak bersama sahabatnya, Patrick Star (bintang laut), dan tetangganya yang pemarah, Squidward, sambil melindungi resep Krabby Patty dari Plankton. ",
    "trailer": "",
    "id": 1774403149494
  },
  {
    "title": "Shinchan",
    "slug": "shinchan",
    "cover": "https://m.media-amazon.com/images/I/51qDrwg8vXL._AC_UF894,1000_QL80_.jpg",
    "banner": "https://m.media-amazon.com/images/I/51qDrwg8vXL._AC_UF894,1000_QL80_.jpg",
    "studio": "Shin-ei",
    "status": "Completed",
    "total_episodes": 1,
    "year": 1990,
    "rating": "7.0",
    "genres": [
      "Comedy",
      "Slice of life",
      "Adventure"
    ],
    "description": "Shinchan menceritakan tentang keseharian Shinnosuke \"Shinchan\" Nohara, anak TK berusia 5 tahun yang nakal, lucu, genit, dan sering menjahili orang tua serta gurunya. Berlatar di Kasukabe, Jepang, cerita ini menyoroti kekacauan konyol yang ia buat bersama keluarga (Misae, Hiroshi, Himawari), anjingnya (Shiro), dan teman-temannya. ",
    "trailer": "",
    "id": 1774530890915
  },
  {
    "title": "Berhenti Jadi bucin hidupku malah mewah",
    "slug": "Santoso",
    "cover": "https://hwztchapter.dramaboxdb.com/data/cppartner/4x2/42x0/420x0/42000003451/42000003451.jpg?t=1767604240602",
    "banner": "https://hwztchapter.dramaboxdb.com/data/cppartner/4x2/42x0/420x0/42000003451/42000003451.jpg?t=1767604240602",
    "studio": "-",
    "status": "Completed",
    "total_episodes": 1,
    "year": 2026,
    "rating": "5.5",
    "genres": [
      "Slice of life"
    ],
    "description": "Nxislspcjkslsxnudnsndb",
    "trailer": "",
    "id": 1774552070939
  },
  {
    "title": "Doraemon 2005",
    "slug": "doraemon",
    "cover": "https://m.media-amazon.com/images/M/MV5BOTE4ZjlkOWYtZDViYy00ZmZlLTkyMmQtZjNiNTBjMzBiNDA0XkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg",
    "banner": "https://m.media-amazon.com/images/M/MV5BOTE4ZjlkOWYtZDViYy00ZmZlLTkyMmQtZjNiNTBjMzBiNDA0XkEyXkFqcGc@._V1_QL75_UY281_CR4,0,190,281_.jpg",
    "studio": "Shin-Ei",
    "status": "Completed",
    "total_episodes": 20,
    "year": 2005,
    "rating": "8.2",
    "genres": [
      "Adventure",
      "Slice of life"
    ],
    "description": "Doraemon adalah robot kucing dari abad ke-22 yang dikirim ke masa lalu untuk membantu Nobita Nobi, seorang anak SD pemalas, agar nasib masa depannya berubah menjadi lebih baik. Dengan berbagai alat ajaib dari kantong ajaibnya, Doraemon membantu Nobita mengatasi masalah sehari-hari, terutama dari Gian dan Suneo, serta mendekati Shizuka.",
    "trailer": "",
    "id": 1774564314718
  },
  {
    "title": "Majo no tabi tabi",
    "slug": "elaina",
    "cover": "https://static.wikia.nocookie.net/majo-no-tabitabi/images/3/3b/Anime_Key_Visual.png/revision/latest?cb=20201006044342",
    "banner": "https://static.wikia.nocookie.net/majo-no-tabitabi/images/3/3b/Anime_Key_Visual.png/revision/latest?cb=20201006044342",
    "studio": "C2C",
    "status": "Completed",
    "total_episodes": 12,
    "year": 2020,
    "rating": "7.0",
    "genres": [
      "Adventure",
      "Fantasy"
    ],
    "description": "Majo no tabi",
    "trailer": "",
    "id": 1774663157181
  }
];

export default DEFAULT_ANIME;
