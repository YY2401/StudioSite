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
        content: "這是我們的首頁介紹，提供最新的資訊和服務。",
        sources: ["/AboutUsSample.jpg"],
      },
    ],
  },
  {
    id: "games",
    title: "遊戲",
    items: [
      {
        id: "game-intro",
        title: "最新遊戲介紹",
        content: "這裡是我們最新遊戲的介紹，包含遊戲特色和玩法。",
        sources: ["/GameSample_3.png"],
      },
      {
        id: "game-events",
        title: "遊戲活動",
        content: "參加我們的遊戲活動，獲得豐富獎勵！",
        sources: ["/GameSample_2.png"],
      },
    ],
  },
  {
    id: "esports",
    title: "電子競技",
    items: [
      {
        id: "esports-intro",
        title: "電子競技介紹",
        content: "了解我們的電子競技團隊和比賽資訊。",
        sources: ["/GameSample_2.png"],
      },
      {
        id: "esports-events",
        title: "電子競技活動",
        content: "參加我們的電子競技活動，挑戰自我！",
        sources: ["/GameSample_4.png"],
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
