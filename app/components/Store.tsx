import React, { useState } from "react";

export type NavItem = { label: string; key: string };

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  categoryKey: string;
};

type Category = {
  key: string;
  label: string;
  products: Product[];
};

const initialCategories: Category[] = [
  {
    key: "home",
    label: "Home",
    products: [],
  },
  {
    key: "category",
    label: "Category",
    products: Array.from({ length: 6 }).map((_, index) => ({
      id: index + 1,
      name: `Product ${index + 1}`,
      image: `/ProductSample_${index + 1}.jpg`,
      price: (index + 1) * 10,
      categoryKey: "category",
    })),
  },
  {
    key: "inner",
    label: "Inner",
    products: [],
  },
  {
    key: "testimonials",
    label: "Testimonials",
    products: [],
  },
];

const Store: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeNav, setActiveNav] = useState<string>("category");
  const [showImageEditor, setShowImageEditor] = useState<boolean>(false);
  const [showCategoryEditor, setShowCategoryEditor] = useState<boolean>(false);

  const activeCategory = categories.find((cat) => cat.key === activeNav);

  const addNavItem = () => {
    const label = prompt("新分類名稱:");
    if (!label) return;
    const key = label.trim().toLowerCase().replace(/\s+/g, "-");
    if (categories.find((cat) => cat.key === key)) {
      alert("分類已存在，請確認或改用其他名稱");
      return;
    }

    setCategories((prev) => [...prev, { key, label, products: [] }]);
  };

  const deleteNavItem = (keyToDelete: string) => {
    if (categories.length <= 1) {
      alert("至少需要保留一個分類，無法刪除");
      return;
    }

    if (
      confirm(
        `確定要刪除"${categories.find((c) => c.key == keyToDelete)?.label}"分類嗎`
      )
    ) {
      setCategories((prev) => prev.filter((c) => c.key !== keyToDelete));
      if (activeNav === keyToDelete) {
        const remainCategories = categories.filter(
          (cat) => cat.key != keyToDelete
        );
        setActiveNav(
          remainCategories.length > 0 ? remainCategories[0].key : "home"
        );
      }
    }
  };

  const addProductToCategory = () => {
    if (!activeCategory) {
      alert("請先選擇一個分類");
      return;
    }

    const name = prompt("輸入新商品名稱:");
    if (!name) return;
    const priceStr = prompt("輸入商品價格:");
    const price = parseFloat(priceStr || "0");
    const image = prompt("輸入商品圖片URL:", "/ProductSample_1.jpg");
    if (!image) return;

    const newProduct: Product = {
      id: Date.now(),
      name,
      image,
      price,
      categoryKey: activeCategory.key,
    };

    setCategories((prev) =>
      prev.map((cat) =>
        cat.key === activeCategory.key
          ? { ...cat, products: [...cat.products, newProduct] }
          : cat
      )
    );
  };

  const deleteProduct = (productId: number) => {
    if (confirm("確定要刪除這個商品嗎？")) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.key === activeNav
            ? {
                ...cat,
                products: cat.products.filter((p) => p.id !== productId),
              }
            : cat
        )
      );
    }
  };

  const updateProduct = (
    productId: number,
    field: keyof Product,
    value: string | number
  ) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.key === activeNav
          ? {
              ...cat,
              products: cat.products.map((product) =>
                product.id === productId
                  ? { ...product, [field]: value }
                  : product
              ),
            }
          : cat
      )
    );
  };

  const renderCategoryManager = () => {
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">分類管理</h3>
        <button
          onClick={() => setShowCategoryEditor(!showCategoryEditor)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showCategoryEditor ? "收起" : "展開"}
        </button>
      </div>
      {showCategoryEditor && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div
                key={cat.key}
                className="flex items-center bg-white px-3 py-2 rounded border"
              >
                <span className="mr-2">
                  {cat.label}
                  {cat.products.length}
                </span>
                <button
                  onClick={() => deleteNavItem(cat.key)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  +新增分類
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>;
  };

  const PageMap: Record<string, React.ReactNode> = {};

  categories.forEach((category) => {
    if (category.key === activeNav) {
      PageMap[category.key] = (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">{category.label}</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowCategoryEditor(!showCategoryEditor)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {showImageEditor ? "關閉編輯" : "開啟編輯"}
              </button>
              <button
                onClick={addProductToCategory}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                + 新增商品
              </button>
            </div>
          </div>

          {renderCategoryManager()}

          {category.products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>此分類暫無商品</p>
              <button
                onClick={addProductToCategory}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                新增第一個商品
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded shadow relative"
                >
                  {showImageEditor && (
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                      title="刪除商品"
                    >
                      X
                    </button>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = ""; // 預設圖片
                    }}
                  />
                  {showImageEditor && (
                    <div className="flex flex-col mb-3">
                      <label className="text-gray-600 mb-1 text-sm">
                        圖片 URL
                      </label>
                      <input
                        type="text"
                        value={product.image}
                        onChange={(e) =>
                          updateProduct(
                            product.id,
                            "image",
                            e.target.validationMessage
                          )
                        }
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <label className="text-gray-600 mb-1 text-sm">
                        商品名稱
                      </label>
                      {showImageEditor ? (
                        <input
                          type="text"
                          value={product.image}
                          onChange={(e) =>
                            updateProduct(product.id, "image", e.target.value)
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        <p className="text-lg font-semibold">{product.name}</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-600 mb-1 text-sm">價格</label>
                      {showImageEditor ? (
                        <input
                          type="number"
                          value={product.price}
                          step="1"
                          onChange={(e) =>
                            updateProduct(
                              product.id,
                              "price",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-24 px-2 py-1 border rounded"
                        />
                      ) : (
                        <p className="text-gray-800 font-semibold">
                          ${product.price}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-2">
                      <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                        保存
                      </button>
                      <button className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-100">
                        詳情
                      </button>
                      <button className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700">
                        訂購
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      );
    } else {
      PageMap[category.key] = (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">{category.label} 頁面</h2>
          <p className="text-gray-600">詳細</p>
        </div>
      );
    }
  });

  const ActiveContent = PageMap[activeNav] || <div>未設定的頁面</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold mb-2">商店管理</h1>
          <button
            onClick={addNavItem}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
            title="新增分類"
          >
            + 新增分類
          </button>
        </div>

        <nav className="p-4 flex-1">
          <h2 className="text-gray-500 uppercase tracking-wider mb-3 text-sm">
            導航分類
          </h2>
          <ul className="space-x-1">
            {categories.map((category) => (
              <li key={category.key}>
                <button
                  onClick={() => setActiveNav(category.key)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors flex items-center justify-between
                  ${activeNav === category.key ? "bg-blue-100 text-blue-800 font-semibold" : "hover:bg-gray-100"}`}
                >
                  <span>{category.label}</span>
                  <span className="text-xd bg-gray-200 px-2 py-1 rounded-full">
                    {category.products.length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">{ActiveContent}</main>
    </div>
  );
};

export default Store;
