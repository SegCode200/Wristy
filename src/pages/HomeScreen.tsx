import Hero from "./Hero";
import FeaturedSection from "./FeaturedSection";
import Footer from "../components/static/Footer";
import ProductList from "./ProductList";
import ShopIntroBanner from "../components/static/ShopIntroBanner";


const HomeScreen = () => {

  return (
    <div>
      <Hero />
      <FeaturedSection />
      <ShopIntroBanner/>
      <ProductList />
      <Footer />
    </div>
  );
};

export default HomeScreen;
