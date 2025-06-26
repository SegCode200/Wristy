import { useState } from "react";
import ProductModal from "./ProductModal";

interface WatchItem {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
  category: "Men" | "Women" | "Others" | "All";
  quantity?: number; // used when added to cart
}
const WatchCard: React.FC<{ watch: WatchItem }> = ({ watch }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform duration-300 transform hover:scale-105 cursor-pointer"
      >
        <img
          src={watch.image_url}
          alt={watch.name}
          className="w-full h-56 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{watch.name}</h3>
           <p className="text-xs text-gray-400">{watch.category}</p>
          <p className="text-gray-600 text-sm">
            ₦{watch.price.toLocaleString()}
          </p>
        </div>
      </div>

      {open && <ProductModal product={watch} onClose={() => setOpen(false)} />}
    </>
  );
};
export default WatchCard;
