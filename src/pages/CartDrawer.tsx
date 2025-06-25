import { useCart } from "../context/CartContext";
import { FiX, FiTrash2 } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );

  const buildWhatsAppMessage = () => {
    const orderId = `ORDER-${Math.floor(Math.random() * 1000000)}`;

    let message = `🧾 *Order ID:* ${orderId}\n`;
    message += "Hello, I want to order:\n\n";
    cartItems.forEach((item) => {
      message += `• *${item.name}* x ${item.quantity}\n`;
      message += `*Price*: ₦${item.price.toLocaleString()}\n`;
      message += `🖼️Image: ${item.image_url}\n\n`; // <-- Add image as a URL
    });

    message += `*Total:* ₦${total.toLocaleString()}`;

    return encodeURIComponent(message);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={onClose}>
            <FiX size={24} className="text-gray-700" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 items-start">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-600 mb-1">
                    ₦{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 text-sm bg-gray-200 rounded"
                    >
                      −
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 py-1 text-sm bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-500"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t mt-4">
            <p className="font-semibold mb-2">
              Total: ₦{total.toLocaleString()}
            </p>
            <div className="mt-4 border-t pt-4 text-right">
              <p className="text-sm text-gray-600">Subtotal:</p>
              <p className="text-lg font-semibold text-black">
                ₦{total.toLocaleString()}
              </p>
            </div>

            <a
              href={`https://wa.me/+2348186729930?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={clearCart}
              className="block bg-black text-white text-center py-2 rounded hover:bg-gray-900 text-sm"
            >
              Checkout via WhatsApp
            </a>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default CartDrawer;
