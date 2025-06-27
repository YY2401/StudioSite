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

const introItems: IntroItem[] = [
  {
    id: "games",
    title: "遊戲",
    content: "作為熱愛遊戲的玩家…",
    sources: ["/game1.jpg", "/game2.mp4"],
  },
  {
    id: "esports",
    title: "電子競技",
    content: "透過精彩的電競活動…",
    sources: ["/esports.jpg"],
  },
  {
    id: "community",
    title: "社群",
    content: "Garena 透過遊戲驅動社交…",
    sources: ["/comm1.jpg", "/comm2.jpg"],
  },
];

const IndexIntro: React.FC = () => {
  const [selected, setSelected] = useState<string>(introItems[0].id);
  const active = introItems.find((i) => i.id === selected)!;

  // 將 introItems 轉成 SidebarMenu 接受的格式
  const menuItems: SidebarMenuItem[] = introItems.map((i) => ({
    id: i.id,
    title: i.title,
  }));

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-center text-2xl font-bold mb-8">所有產品分類</h2>

      <div className="md:flex md:space-x-8">
        {/* 左側：SidebarMenu */}
        <div className="md:w-1/4 mb-6 md:mb-0">
          <SidebarMenu
            header="所有產品分類"
            items={menuItems}
            selectedId={selected}
            onSelect={setSelected}
          />
        </div>

        {/* 右側：動態內容 */}
        <div className="md:w-3/4">
          <div className="md:flex items-center md:space-x-8">
            <div className="md:w-1/2">
              {active.sources.length > 1 ? (
                <Carousel sources={active.sources} controls={false} />
              ) : (
                <img
                  src={active.sources[0]}
                  alt={active.title}
                  className="w-full h-auto rounded-lg shadow"
                />
              )}
            </div>
            <div className="md:w-1/2">
              <h3 className="flex items-center text-xl font-semibold mb-4">
                <span className="inline-block w-1.5 h-6 bg-red-600 mr-3" />
                {active.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{active.content}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default IndexIntro;
