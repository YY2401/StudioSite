// src/components/IndexIntro.tsx
import React, { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import type { SidebarMenuItem } from "./SidebarMenu";
import Carousel from "./Carousel";
import Footer from "./Footer";

type IntroItem = {
  id: string;
  title: string;
  content: string;
  sources: string[];
};

type CategoryData = {
  id: string;
  title: string;
  items?: IntroItem[];
};

const categoryData: CategoryData[] = [
  {
    id: "home",
    title: "首頁",
    items: [
      {
        id: "home-intro",
        title: "歡迎來到我們的網站",
        content: "",
        sources: ["/AboutUsSample.jpg"],
      },
      {
        id: "home-hope",
        title:
          "是否覺得腦袋中有很多點子希望被人看見，但又不知道怎麼能夠落實？請讓我們來協助！",
        content: "",
        sources: ["/AboutUsSample_1.jpg"],
      },
    ],
  },
  {
    id: "games",
    title: "軟體",
    items: [
      {
        id: "game-intro",
        title: "服務內容介紹",
        content:
          "我們致力於為每一位客戶的點子落實，並推動於各個平台上，使其能讓更多人看見。",
        sources: ["/GameSample_3.png"],
      },
      {
        id: "game-events",
        title: "當前活動",
        content: "參加我們的推廣活動，獲得更多資訊！",
        sources: ["/GameSample_2.png"],
      },
    ],
  },
  {
    id: "esports",
    title: "公司願景",
    items: [
      {
        id: "esports-intro",
        title: "服務介紹",
        content:
          "我們努力將所有客戶的期許做到完善，透過開發產品將每一位客戶的點子落實，也透過網頁開發系統呈現所需的功能為實務流程帶來加速，產生更多收益。",
        sources: ["/DevSampleImg.png"],
      },
    ],
  },
  {
    id: "community",
    title: "社群",
    items: [
      {
        id: "community-intro",
        title: "社群介紹",
        content: "加入我們的社群，與其他玩家交流。",
        sources: ["/TeamSample_1.jpg"],
      },
    ],
  },
];

const IndexIntro: React.FC = () => {
  const [selected, setSelected] = useState<string>(categoryData[0].id);
  const activeCategory = categoryData.find((i) => i.id === selected)!;

  const menuItems: SidebarMenuItem[] = categoryData.map((c) => ({
    id: c.id,
    title: c.title,
  }));

  const ContentItem: React.FC<{ item: IntroItem; isReserved?: boolean }> = ({
    item,
    isReserved = false,
  }) => (
    <div
      className={`md:flex items-center md:space-x-8 mb-12 
        ${isReserved ? "md:flex-row-reserve md:space-x-reserve" : ""}`}
    >
      <div className="md:w-1/2 mb-6 md:mb-0">
        {item.sources.length > 1 ? (
          <Carousel sources={item.sources} controls={false} />
        ) : (
          <img
            src={item.sources[0]}
            alt={item.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        )}
      </div>
      <div className="md:w-1/2">
        <h3 className="flex items-center text-xl font-semibold mb-4">
          <span className="inline-block w-1.5 h-6 bg-red-600 mr-3" />
          {item.title}
        </h3>
        <p className="text-gray-700 leading-relaxed">{item.content}</p>
      </div>
    </div>
  );

  return (
    <section className="container mx-auto py-12">
      <div className="md:flex md:space-x-8">
        {/* 左側：SidebarMenu */}
        <div className="md:w-1/4 mb-6 md:mb-0">
          <SidebarMenu
            header="分類"
            items={menuItems}
            selectedId={selected}
            onSelect={setSelected}
          />
        </div>

        {/* 右側：動態內容 */}
        <div className="md:w-3/4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">
              {activeCategory.title}
            </h2>
            {activeCategory.items?.length === 1 ? (
              <ContentItem item={activeCategory.items[0]} />
            ) : (
              <div className="space-y-8">
                {activeCategory.items?.map((item: IntroItem, index: number) => (
                  <ContentItem
                    key={item.id}
                    item={item}
                    isReserved={index % 2 === 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default IndexIntro;
