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
  }
];

export default DEFAULT_ANIME;
