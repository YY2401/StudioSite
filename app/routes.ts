import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("Navbar", "components/Navbar.tsx"),
  route("Store", "components/Store.tsx"),
] satisfies RouteConfig;
