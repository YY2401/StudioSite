import React, { useState } from "react";

export type NavItem = { label: string; key: string };
const initialItems: NavItem[] = [
  { label: "Home", key: "home" },
  { label: "Category", key: "category" },
  { label: "Inner", key: "inner" },
  { label: "Testimonials", key: "testimonials" },
];

type Product = { id: number; name: string; image: string; price: number };
const initialProducts: Product[] = Array.from({ length: 6 }).map(
  (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    image: `/ProductSample_${index + 1}.jpg`,
    price: (index + 1) * 10,
  })
);

const Store: React.FC = () => {
  const [navItems, setNavItems] = useState<NavItem[]>(initialItems);
  const [activeNav, setActiveNav] = useState<string>("category");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showImageEditor, setShowImageEditor] = useState<boolean>(false);
  const addNavItem = () => {
    const label = prompt("Enter new nav item label:");
    if (!label) return;
    const key = label.trim().toLowerCase().replace(/\s+/g, "-");
    setNavItems((prev) => [...prev, { label, key }]);
  };
  const PageMap: Record<string, React.ReactNode> = {
    home: <div>Home Page</div>,
    category: (
      <>
        <h2 className="text-2xl font-semibold mb-6">Category name</h2>
        <button
          onClick={() => setShowImageEditor((prev) => !prev)}
          className="absolute right-3 top-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showImageEditor ? "關閉編輯" : "開啟編輯"}
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-70 h-70 mb-4 rounded"
              />
              {showImageEditor && (
                <div className="flex flex-col">
                  <label className="text-gray-600 mb-1">Image Url:</label>
                  <input
                    type="text"
                    value={product.image}
                    onChange={(e) => {
                      const newImage = e.target.value;
                      setProducts((prev) =>
                        prev.map((p) =>
                          p.id === product.id ? { ...p, image: newImage } : p
                        )
                      );
                    }}
                    className="w-full px-2 py-1 border rounded"
                  ></input>
                </div>
              )}
              <div className="space-y-3">
                <div className="flex flex-col">
                  <label className="text-gray-600 mb-1">Name</label>
                  {showImageEditor ? (
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        setProducts((prev) =>
                          prev.map((p) =>
                            p.id === product.id ? { ...p, name: newName } : p
                          )
                        );
                      }}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{product.name}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-600 mb-1">Price</label>
                  {showImageEditor ? (
                    <input
                      type="number"
                      value={product.price}
                      step="1"
                      onChange={(e) => {
                        const newPrice = parseFloat(e.target.value) || 0;
                        setProducts((prev) =>
                          prev.map((p) =>
                            p.id === product.id ? { ...p, price: newPrice } : p
                          )
                        );
                      }}
                      className="w-24 px-2 py-1 border rounded text-left"
                    />
                  ) : (
                    <p className="text-gray-800">{product.price}</p>
                  )}
                </div>
                <div className="flex item-center justify-end space-x-2">
                  <button className="px-2 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700">
                    Save
                  </button>
                  <button className="px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-100">
                    Details
                  </button>
                  <button className="px-2 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700">
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
    inner: <div>Inner Page</div>,
    testimonials: <div>Testimonials Page</div>,
  };

  const ActiveContent = PageMap[activeNav] || <div>未設定的頁面</div>;

  return (
    <div className="flex min h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="px-4 border-b">
          <h1 className="text-xl font-bold">Site Name</h1>
          <button
            onClick={addNavItem}
            className="text-2xl leading-none text-gray-500 hover:text-gray-800"
          >
            +
          </button>
        </div>
        <nav className="p-4">
          <h2 className="text-gray-500 uppercase tracking-wider mb-2">
            Navigation
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveNav(item.key)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors 
                ${activeNav == item.key ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8">{ActiveContent}</main>
    </div>
  );
};

export default Store;
