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
    title: "Được vẽ nên những đám mây, được ôm lấy bầu trời",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/page-3.jpeg",
    imageAlt: "Outfit sọc hồng, cầm táo đỏ",
    title: "Được hóa thân thành những nàng công chúa trong truyện cổ tích",
    imageOnRight: true,
  },
  {
    imageSrc: "/images/page-4.jpeg",
    imageAlt: "Váy hoa nâu, túi da, tự tin sành điệu",
    title: "Được trở thành những cô thiếu nữ Sài Gòn xưa",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/page-5.jpeg",
    imageAlt: "Áo robe, mũ nhọn, đũa phép, cú nhỏ",
    title: "Được hóa thân thành cô phù thủy nhỏ trong Harry Potter",
    imageOnRight: true,
  },

  {
    imageSrc: "/images/page-7.jpeg",
    imageAlt: "4 người mặc Hanbok, phụ kiện truyền thống",
    title: "Được hóa trang thành những nàng công chúa Hàn Quốc",
    imageOnRight: true,
  },
    {
    imageSrc: "/images/taydua.jpeg",
    imageAlt: "Tay đua Ụn Ụn",
    title: "Được trở thành tay đua Ụn Ụn",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/page-8.jpeg",
    imageAlt: "Góc nhìn từ dưới lên sân khấu, Army Bomb",
    title: "Được ngắm nhìn người mình ngưỡng mộ nơi sân khấu",
    imageOnRight: false,
  },
    {
    imageSrc: "/images/page-6.jpeg",
    imageAlt: "4 người bạn, mỗi người một outfit riêng",
    title: "Được hát cùng chị em cả ngày",
    imageOnRight: false,
  },
  {
    imageSrc: "/images/page-9.jpeg",
    imageAlt: "Tết, hoa đào, nhân vật áo hồng nổi bật",
    title: "Được sum vầy cùng gia đình đáng iu của mình",
    imageOnRight: true,
  },

];
