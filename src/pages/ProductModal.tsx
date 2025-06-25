
import { FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";

interface WatchItem {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
  category: "Men" | "Women" | "Others" | "All";
  quantity?: number; // used when added to cart
}
interface ProductModalProps {
  product: WatchItem | null;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
          >
            <FiX size={22} />
          </button>

          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-cover rounded mb-4"
          />

          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4 text-sm">₦{product.price.toLocaleString()}</p>

          <button
            onClick={() => {
              addToCart(product);
              onClose();
            }}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
