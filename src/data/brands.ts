import type { Brand } from "../models/brand";

const ASSET_BASE_URL = "https://line-gateway.seoul-moment.workers.dev";

export const BRANDS: Brand[] = [
  {
    id: "nodelabs",
    name: "NodeLabs",
    description: "韓國機能帽品牌",
    imageUrl: `${ASSET_BASE_URL}/brands/nodelabs.webp`,
    url: "https://https://seoulmoment.com.tw/zh-TW/product?brandId=2",
    tags: ["🇰🇷 韓國直送", "🧢 機能帽款", "⭐ 官方合作"],
  },
  {
    id: "ossmove",
    name: "OSSMOVE",
    description: "韓國運動品牌",
    imageUrl: `${ASSET_BASE_URL}/brands/ossmove.webp`,
    url: "https://seoulmoment.com.tw/zh-TW/product?brandId=3",
    tags: ["🇰🇷 韓國直送", "🏃 跑步裝備", "🔥 熱銷品牌"],
  },
  {
    id: "chwi",
    name: "CHWI",
    description: "韓國香氛品牌",
    imageUrl: `${ASSET_BASE_URL}/brands/CHWI.webp`,
    url: "https://seoulmoment.com.tw/zh-TW/product?brandId=113",
    tags: ["🇰🇷 韓國直送", "🌿 香氛生活", "🎁 送禮推薦"],
  },
  {
    id: "runstate",
    name: "RUNSTATE",
    description: "韓國跑步品牌",
    imageUrl: `${ASSET_BASE_URL}/brands/RUNSTATE.webp`,
    url: "https://seoulmoment.com.tw/zh-TW/product?brandId=4",
    tags: ["🇰🇷 韓國直送", "🏃 專業跑步", "⭐ 官方合作"],
  },
];
