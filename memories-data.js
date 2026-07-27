/* =====================================================================
   MEMORIES DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to touch to personalize the site.

   1) Edit the intro text in index.html (recipient name + message).
   2) Write your birthday card message in BIRTHDAY_CARD below.
   3) Add or edit categories in CATEGORIES (optional — defaults are set).
   4) Fill in the MEMORIES array with your real photos/videos + captions.

   Each memory looks like this:

   {
     type: "photo",              // "photo" or "video"
     src: "images/cute/img1.jpg",// path to your file (relative to index.html)
     poster: "images/cute/img1.jpg", // (video only, optional)
     caption: "A little note about this moment.",
     date: "June 2019",          // optional, shown as a small tag
     category: "cute",           // must match a CATEGORIES id below
     special: false              // true = also appears in "Special" + gold border + confetti
   }

   Put photos in folders like images/mirror/, images/cute/, etc.
   Media is lazy-loaded — only the card you're viewing is fetched.
   ===================================================================== */

const SITE_CONFIG = {
  // Roughly 1 in this many pulls is treated as "special" (gold border + confetti),
  // in addition to any memory you've manually marked special: true.
  specialEveryAbout: 9,
};

// ---------------------------------------------------------------------
// BIRTHDAY CARD — shown when she taps the letter on the home page.
// Use blank lines between paragraphs in `message`.
// ---------------------------------------------------------------------
const BIRTHDAY_CARD = {
  heading: "To Nawal",

  message:
"Happy 21st birthday, Nawal!!!!! I love you more than words can ever explain 💖\n\n" +

"عشان أنا الهكر المفضلة عندك 😌 قررت أعملك ألبوم إلكتروني أجمع فيه كل صورنا وذكرياتنا من 2024 لـ 2026 ممكن تعتبرِيه هدية صغيرة على كل اشي بينا 🤍\n\n" +

"لكل الأيام اللي ضحكنا فيها من القلب، ولكل المواقف اللي قلنا فيها \"ما لازم نضحك\" وضحكنا أكتر، " +
"ولكل اللحظات اللي بكينا فيها وواسينا بعض بدون ما نحكي كتير، " +
"ولكل الذكريات الحلوة والجنونية اللي عملناها \n\n" +

"إحنا صحبات دراسة وهبل وجوسيب وديب توكس حرفيا كله مكس مع بعضه، " +

"وجودك بحياتي نعمة كبيرة أنا دايمًا بحمد ربي عليها\n\n" +

"شكرًا لأنك كنتِ دايمًا سبب في إنو أيامي الجامعية أحلى بكتير من ما كنت بتخيل\n\n" +

"بتمنالك سنة جديدة مليانة فرح، نجاح، تحقيق أحلام، وكل الأشياء الحلوة اللي بتستاهليها وأكثر. وإن شاء الله نكمل نعمل ذكريات أحلى وأحلى مع بعض 💖✨",

  signoff: "\nCeline ♡"
};
const CATEGORIES = [
  { id: "favorite-trio", label: "Your Favorite Trio", emoji: "✨" },
  { id: "mirror-selfies", label: "Mirror Selfies", emoji: "🪞" },
  { id: "funny", label: "Funny Moments", emoji: "😂" },
  { id: "cute", label: "Cute Moments", emoji: "🥰" },
  { id: "special", label: "Special", emoji: "💖" },
];

const MEMORIES = [
  { type: "photo", src: "images/mirror/img1.jpg", caption: "Techno park", date: "November 2024", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img2.jpg", caption: " ", date: "April 2026", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img3.jpg", caption: " ", date: "April 2026", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img4.jpg", caption: "Leen's event", date: "April 2025", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img5.jpg", caption: "The start of our mirror tradition", date: "May 2026", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img6.jpg", caption: " ", date: "May 2026", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img7.jpg", caption: " ", date: "May 2026", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img8.jpg", caption: "missing Ahlam", date: "June 2026", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img9.jpg", caption: " ", date: "June 2026", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img10.jpg", caption: "The mirror tells no lies", date: "November 2025", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img11.jpg", caption: "summer course", date: "July 2026", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img12.JPG", caption: "Gym partner", date: "September 2025", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img13.jpg", caption: "Icon mall", date: "July 2025", category: "mirror-selfies", special: false },
  { type: "photo", src: "images/mirror/img14.jpg", caption: "اول خيانة لاحلام وطلعنا بدونها", date: "November 2024", category: "mirror-selfies", special: false },

  { type: "photo", src: "images/cute/img1.jpg", caption: "I know you hate this photo, but it has to be here", date: "July 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img2.jpg", caption: "Don't really remember that day but it's cute", date: "October 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img3.jpg", caption: " ", date: "October 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img4.PNG", caption: "Day one footaball", date: "April 2026", category: "cute", special: false },
  { type: "photo", src: "images/cute/img5.JPG", caption: "اول صيفي ", date: "August 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img6.jpg", caption: " ", date: "August 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img7.jpg", caption:" ", date: "February 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img8.jpg", caption: " ", date: "January 2026", category: "cute", special: false },
  { type: "photo", src: "images/cute/img9.jpg", caption: " ", date: "January 2026", category: "cute", special: false },
  { type: "photo", src: "images/cute/img10.jpg", caption: " ", date: "June 2026", category: "cute", special: false },
  { type: "photo", src: "images/cute/img11.jpg", caption: " ", date: "June 2026", category: "cute", special: false },
  { type: "photo", src: "images/cute/img12.jpg", caption: " ", date: "October 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img13.jpg", caption: "We look so cute!! ", date: "July 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img14.jpg", caption: " ", date: "December 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img15.jpg", caption: " ", date: "December 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img16.JPG", caption: " ", date: "May 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img17.JPG", caption: "Our favorite photographer", date: "December 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img18.JPG", caption: "Study partner", date: "December 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img19.jpg", caption: " ", date: "November 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img20.jpg", caption: " ", date: "October 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img21.jpg", caption: " ", date: "June 2026", category: "cute", special: false },
  { type: "photo", src: "images/cute/img22.JPG", caption: "GDG event", date: "November 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img23.jpg", caption: " ", date: "December 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img24.JPG", caption: " ", date: "February 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img25.jpg", caption: "The day it snowed in Birzeit", date: "February 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img26.jpg", caption: "Dorms tour", date: "October 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img27.PNG", caption: "Day two football games", date: "April 2026", category: "cute", special: false },
  { type: "photo", src: "images/cute/img28.jpg", caption: " ", date: "December 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img29.jpg", caption: "Ahlam's birthday", date: "November 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img30.jpg", caption: " buying Ahlam's birthday gift", date: "November 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img31.jpg", caption: " ", date: "April 2026", category: "cute", special: false },
  { type: "photo", src: "images/cute/img32.JPG", caption: " ", date: "April 2026", category: "cute", special: false },
  { type: "photo", src: "images/cute/img33.JPG", caption: "", date: "December 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img34.jpg", caption: "Mayar's seminar", date: "July 2026", category: "cute", special: false },
  { type: "photo", src: "images/cute/img35.jpeg", caption: " ", date: "August 2024", category: "cute", special: false },
  { type: "photo", src: "images/cute/img36.jpg", caption: " ", date: "December 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img37.jpg", caption: "Our inner artists came out.", date: "August 2025", category: "cute", special: false },
  { type: "photo", src: "images/cute/img38.jpg", caption: "Attara traffic", date: "November 2024", category: "cute", special: false },
  { type: "video", src: "videos/cute/vid1.mp4", caption: " ", date: "June 2026", category: "cute", special: false },
  { type: "video", src: "videos/cute/vid2.mp4", caption: " ", date: "November 2025", category: "cute", special: false },
  { type: "video", src: "videos/cute/vid3.MP4", caption: " ", date: "May 2026", category: "cute", special: false },
  { type: "video", src: "videos/cute/vid4.mp4", caption: " ", date: "June 2026", category: "cute", special: false },
  { type: "video", src: "videos/cute/vid5.MP4", caption: " ", date: "May 2026", category: "cute", special: false },
  { type: "video", src: "videos/cute/vid6.mp4", caption: " ", date: "June 2026", category: "cute", special: false },
  { type: "video", src: "videos/cute/vid7.mp4", caption: "الكثير والكثير من الازمات ", date: "May 2025", category: "cute", special: false },
  { type: "video", src: "videos/cute/vid8.mp4", caption: " محاضرة السي اس", date: "January 2026", category: "cute", special: false },

  { type: "photo", src: "images/funny/img1.jpg", caption: " ", date: "October 2024", category: "funny", special: false },
  { type: "photo", src: "images/funny/img2.jpg", caption: "دوارنا ", date: "October 2025", category: "funny", special: false },
  { type: "photo", src: "images/funny/img3.jpg", caption: " ", date: "July 2025", category: "funny", special: false },
  { type: "photo", src: "images/funny/img4.jpg", caption: "ايام ما كان تلفوني اجدد واحد وبتجربوا بالكاميرا", date: "April 2025", category: "funny", special: false },
  { type: "photo", src: "images/funny/img5.jpg", caption: "I still think mine is better", date: "June 2026", category: "funny", special: false },
  { type: "photo", src: "images/funny/img6.jpg", caption: "We can't forget these", date: "July 2025", category: "funny", special: false },
  { type: "photo", src: "images/funny/img7.jpg", caption: " ", date: "July 2025", category: "funny", special: false },
  { type: "photo", src: "images/funny/img8.jpg", caption: " ", date: "July 2025", category: "funny", special: false },
  { type: "photo", src: "images/funny/img9.jpg", caption: " ", date: "July 2025", category: "funny", special: false },
  { type: "photo", src: "images/funny/img10.jpg", caption: " الجاسوسات ", date: "August 2025", category: "funny", special: false },
  { type: "photo", src: "images/funny/img11.jpg", caption: " ", date: "December 2025", category: "funny", special: false },
  { type: "photo", src: "images/funny/img12.jpeg", caption: "Showcasing my editing skills with Vogue", date: "March 2025", category: "funny", special: false },
  { type: "video", src: "videos/funny/vid1.mp4", caption: "Sorry but this video has to be here", date: "April 2026", category: "funny", special: false },
  { type: "video", src: "videos/funny/vid2.mp4", caption: " ", date: "December 2025", category: "funny", special: false },
  { type: "video", src: "videos/funny/vid3.mp4", caption: "Visa and a car! We are RICH", date: "July 2025", category: "funny", special: false },
  { type: "video", src: "videos/funny/vid4.mp4", caption: " 🚬🚬", date: "November 2024", category: "funny", special: false },
  { type: "video", src: "videos/funny/vid5.mp4", caption: "فجاة صرنا نشجع الصيدلية", date: "April 2026", category: "funny", special: false },
  { type: "video", src: "videos/funny/vid6.mp4", caption: "ديماا المغرب", date: "December 2025", category: "funny", special: false },
  { type: "video", src: "videos/funny/vid7.mp4", caption: " ", date: "October 2024", category: "funny", special: false },

  { type: "photo", src: "images/trio/img1.jpg", caption: " ", date: "July 2025", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img2.jpg", caption: "My favorite picture of us", date: "July 2025", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img3.jpg", caption: "Your 19th birthday", date: "August 2024", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img4.JPG", caption: "Road trip ", date: "July 2025", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img5.jpg", caption: " ", date: "July 2025", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img6.jpg", caption: " ", date: "November 2025", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img7.jpg", caption: " ", date: "November 2025", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img8.jpg", caption: " ", date: "July 2026", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img9.jpg", caption: "World cup winners", date: "July 2026", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img10.JPG", caption: " ", date: "October 2025", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img11.jpg", caption: " يمكن ما طلعنا بمعلومات من هاد الايفنت بس عالاقل طلعنا بصور", date: "April 2025", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img12.jpg", caption: " ", date: "April 2025", category: "favorite-trio", special: false },
  { type: "photo", src: "images/trio/img13.JPG", caption: " ", date: "October 2024", category: "favorite-trio", special: false },
  { type: "video", src: "videos/trio/vid1.mp4", caption: " ", date: "October 2025", category: "favorite-trio", special: false },
  { type: "video", src: "videos/trio/vid2.mp4", caption: " نكتسح التريند", date: "November 2025", category: "favorite-trio", special: false },

  { type: "photo", src: "images/special/img1.jpg", caption: "بداية صداقتنا", date: "July 2024", category: "special", special: true },
  { type: "photo", src: "images/special/img2.jpg", caption: " ", date: "July 2026", category: "special", special: true },
  { type: "photo", src: "images/special/img3.jpg", caption: "يوم رائع لازم نعيده ", date: "July 2025", category: "special", special: true },
  { type: "photo", src: "images/special/img4.jpg", caption: " ", date: "July 2025", category: "special", special: true },
  { type: "photo", src: "images/special/img5.jpg", caption: " ", date: "October 2024", category: "special", special: true },
  { type: "photo", src: "images/special/img6.jpg", caption: " شكرا لابو لينا عالصورة( مع انه راح لونها بعد باسبوع)", date: "April 2025", category: "special", special: true },
  { type: "photo", src: "images/special/img7.PNG", caption: " ", date: "April 2026", category: "special", special: true },
  { type: "photo", src: "images/special/img8.JPG", caption: "Science experiment", date: "May 2025", category: "special", special: true },
  { type: "photo", src: "images/special/img9.jpg", caption: " لفة بييرزيت", date: "June 2026", category: "special", special: true },
  { type: "photo", src: "images/special/img10.jpg", caption: " دوارنا", date: "October 2025", category: "special", special: true },
  { type: "video", src: "videos/special/vid1.mp4", caption: "الماتشنج الاسطوري ", date: "March 2025", category: "special", special: true }
];
