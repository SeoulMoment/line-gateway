export class MenuService {
  getBrandMenu() {
    return {
      title: "品牌館",
      description: "探索韓國品牌",
      button: "前往品牌館",
      url: "https://seoulmoment.com.tw/brands",
      image: "https://placehold.co/1200x630",
    };
  }

  getNewArrivalMenu() {
    return {
      title: "新品",
      description: "最新上架商品",
      button: "查看新品",
      url: "https://seoulmoment.com.tw/new",
      image: "https://placehold.co/1200x630",
    };
  }

  // ...
}
