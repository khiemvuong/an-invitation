export interface PageData {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text?: string;
  imageOnRight?: boolean;
}

export const bookPages: PageData[] = [
  // ── HÓA THÂN (Moved to front as requested) ──────────────────
  {
    imageSrc: "/images/page-1.jpeg",
    imageAlt: "Chibi vẫy tay chào, cầm bảng tên",
    title: "Hé lô mình là Pan nè",
    text: "Một cô gái bình thường với những mơ ước không bình thường~",
    imageOnRight: true,
  },

  // ── CHƯƠNG MỞ ĐẦU ──────────────────────────────────
  {
    imageSrc: "/images/intro.jpeg",
    imageAlt: "Chibi ngồi mở cuốn sách nhỏ, mắt sáng long lanh",
    title: "Tớ có một ước mơ...",
    text: "Không, thực ra là nhiều lắm ấy~",
    imageOnRight: false,
  },

  // ── ƯỚC MƠ 1: Ngủ ───────────────────────────────────
  {
    imageSrc: "/images/sleep.jpeg",
    imageAlt: "Chibi nằm ngủ trên đám mây bông, có trăng sao xung quanh",
    title: "Được ngủ một giấc thật dài...",
    text: "Không báo thức, không deadline ",
    imageOnRight: true,
  },

  // ── ƯỚC MƠ 2: Ôm bầu trời ──────────────────────────
  {
    imageSrc: "/images/sky.jpeg",
    imageAlt: "Chibi dang tay ôm bầu trời rộng lớn, đứng trên đỉnh đồi",
    title: "Và được ôm lấy cả bầu trời~",
    text: "Vẽ những đám mây theo ý mình thích ",
    imageOnRight: false,
  },

  {
    imageSrc: "/images/page-3.jpeg",
    imageAlt: "Outfit sọc hồng, cầm táo đỏ",
    title: "Đôi khi tớ là nàng công chúa",
    text: "Trong những trang truyện cổ tích tớ tự viết ",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/page-4.jpeg",
    imageAlt: "Váy hoa nâu, túi da, tự tin sành điệu",
    title: "Đôi khi là cô thiếu nữ Sài Gòn xưa",
    text: "Chậm rãi và duyên dáng giữa phố xá ",
    imageOnRight: true,
  },
  {
    imageSrc: "/images/page-5.jpeg",
    imageAlt: "Áo robe, mũ nhọn, đũa phép, cú nhỏ",
    title: "Hay một cô phù thủy nhỏ",
    text: "Đang học bài... à không, đang học phép thuật ",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/taydua.jpeg",
    imageAlt: "Tay đua ịn ịn",
    title: "Thậm chí là tay đua ịn ịn vèo vèo",
    text: "Không ai cản được tớ đâu nha ",
    imageOnRight: true,
  },

  // ── NHỮNG KỶ NIỆM ────────────────────────────────────
  {
    imageSrc: "/images/page-8.jpeg",
    imageAlt: "Góc nhìn từ đám đông lên sân khấu rực rỡ",
    title: "Tay cầm lightstick, miệng hát vang...",
    text: "Một lần được đứng dưới ánh đèn sân khấu ấy cùng thần tượng là ước mơ lớn của tớ đó!",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/hanbok.jpeg",
    imageAlt: "4 người mặc Hanbok, phụ kiện truyền thống",
    title: "Đi chụp hình cả ngày lun nha~",
    text: "Bé nào cũng xinh hết ối tròi oi ",
    imageOnRight: true,
  },
  {
    imageSrc: "/images/page-6.jpeg",
    imageAlt: "4 người bạn, mỗi người một outfit riêng",
    title: "Và cùng nhau ca hát cả ngày~",
    text: "Ai cần lý do đâu, tụi tớ thích là được ",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/page-9.jpeg",
    imageAlt: "Tết, hoa đào, nhân vật áo hồng nổi bật",
    title: "Luôn có gia đình ở bên",
    text: "Nơi tớ luôn muốn trở về ",
    imageOnRight: true,
  },
  // ── ƯỚC MƠ TỐT NGHIỆP ─────────────────────────
  {
    imageSrc: "/images/want-to-graduate.jpeg",
    imageAlt: "Chibi ngồi chống cằm mơ mộng, nghĩ về ngày tốt nghiệp",
    title: "Tớ cũng mơ được khoác áo cử nhân...",
    text: "Đứng trên bục nhận bằng và tung chiếc mũ thật cao",
    imageOnRight: false,
  },

  // ── TRANG KẾT — TÂN CỬ NHÂN ─────────────────────────
  {
    imageSrc: "/images/graduate1.jpeg",
    imageAlt: "Chibi mặc áo cử nhân, cầm bằng tốt nghiệp, tung mũ lên",
    title: "Ủa khoan... tớ là tân cử nhân rồi mà!",
    text: "Mời mọi người đến chung vui cùng tớ nha~ ",
    imageOnRight: false,
  },
];
