import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("Navbar", "components/Navbar.tsx"),
  route("Store", "components/Store.tsx"),
  route("InventoryChart", "components/InventoryChart.tsx"),
] satisfies RouteConfig;
