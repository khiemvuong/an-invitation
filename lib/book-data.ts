export interface PageData {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text?: string;
  imageOnRight?: boolean;
}

export const bookPages: PageData[] = [
  {
    imageSrc: "/images/page-1.jpeg",
    imageAlt: "Chibi vẫy tay chào, cầm bảng tên",
    title: "Hé lô mình là Pan nè",
    imageOnRight: true,
  },
  {
    imageSrc: "/images/page-2.jpeg",
    imageAlt: "Ngồi trên mây, cầm cọ vẽ, nhìn ra biển xanh",
    title: "Được vẽ nên những đám mây và được ôm lấy bầu trời",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/page-3.jpeg",
    imageAlt: "Outfit sọc hồng, cầm táo đỏ",
    title: "Những nàng công chúa trong truyện cổ tích",
    imageOnRight: true,
  },
  {
    imageSrc: "/images/page-4.jpeg",
    imageAlt: "Váy hoa nâu, túi da, tự tin sành điệu",
    title: "Những cô thiếu nữ Sài Gòn xưa",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/page-5.jpeg",
    imageAlt: "Áo robe, mũ nhọn, đũa phép, cú nhỏ",
    title: "Một cô phù thủy nhỏ",
    imageOnRight: true,
  },

  {
    imageSrc: "/images/taydua.jpeg",
    imageAlt: "Tay đua ịn ịn",
    title: "Tay đua ịn ịn vèo vèo",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/page-8.jpeg",
    imageAlt: "Góc nhìn từ dưới lên sân khấu, Army Bomb",
    title: "Thấy mấy ảnh nơi sân khấu",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/page-7.jpeg",
    imageAlt: "4 người mặc Hanbok, phụ kiện truyền thống",
    title: "Những nàng công chúa Hàn Quốc",
    imageOnRight: true,
  },
  {
    imageSrc: "/images/page-6.jpeg",
    imageAlt: "4 người bạn, mỗi người một outfit riêng",
    title: "Và được ca hát cùng chị em cả ngày lun",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/page-9.jpeg",
    imageAlt: "Tết, hoa đào, nhân vật áo hồng nổi bật",
    title: "Được sum vầy cùng gia đình to đáng iu của mình",
    imageOnRight: true,
  },
];
