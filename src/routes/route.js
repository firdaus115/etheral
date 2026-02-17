import { lazy } from "react";
import { allPaths } from "./path";

const Home = lazy(() => import("../pages/Home.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const Contact = lazy(() => import("../pages/Contact.jsx"));
const FAQ = lazy(() => import("../pages/FAQ.jsx"));
const Singup = lazy(() => import("../pages/Singup.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Collections = lazy(() => import("../pages/Collection.jsx"));
const ProductDetail = lazy(() => import("../pages/ProductDetail.jsx"));
const Wrapper = lazy(() => import("../components/Wrapper.jsx"));

export const allRoutes = [
  {
    path: allPaths.signup,
    element: Singup,
  },
  {
    path: allPaths.login,
    element: Login,
  },
  {
    path: "",
    element: Wrapper,
    children: [
      { path: allPaths.home, element: Home },
      { path: allPaths.about, element: About },
      { path: allPaths.contact, element: Contact },
      { path: allPaths.faq, element: FAQ },
      { path: allPaths.collection, element: Collections },
      { path: allPaths.product, element: ProductDetail },
    ],
  },
];
