import { useEffect } from "react";
import Product from "../../components/product/Product";
import Slider from "../../components/slider/Slider";

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollToProduct = () => {
      if (url.includes("#product")) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return;
      }
    };
    scrollToProduct();
  }, [url]);
  return (
    <>
      <Slider />
      <Product />
    </>
  );
};

export default Home;
