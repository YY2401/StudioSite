import React from "react";

export interface SidebarMenuItem {
  id: string;
  title: string;
}

export interface SidebarMenuProps {
  header: string;
  items: SidebarMenuItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  header,
  items,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="bg-white shadow rounded p-4">
      {/* 選單標題 */}
      <h3 className="text-lg font-semibold mb-4">{header}</h3>

      {/* 列表 */}
      <ul className="divide-y divide-gray-200">
        {items.map((item) => {
          const isActive = item.id === selectedId;
          return (
            <li key={item.id}>
              <button
                onClick={() => onSelect?.(item.id)}
                className={`
                  w-full flex items-center justify-between py-3
                  ${
                    isActive
                      ? "text-red-600 font-medium"
                      : "text-gray-700 hover:text-red-600"
                  }
                `}
              >
                <span>{item.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarMenu;
