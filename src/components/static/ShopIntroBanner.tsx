// components/ShopIntroBanner.tsx
import image from "../../assets/background.jpeg"
const ShopIntroBanner = () => {
  return (
    <section className="relative h-[60vh] w-full mb-12">
      <img
        src={image} // Replace with your Supabase image or public image URL
        alt="Shop Banner"
        className="w-full h-full object-cover bg-fixed"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-3">Explore Our Exclusive Watches</h2>
        <p className="text-lg md:text-xl">Quality meets elegance in every timepiece</p>
      </div>
    </section>
  );
};

export default ShopIntroBanner;
