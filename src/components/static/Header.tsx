import { useEffect, useState } from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../../pages/CartDrawer";

const Header = () => {
  const { cartItems } = useCart();
  const [bump, setBump] = useState(false);
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    if (cartItems.length === 0) return;

    setBump(true);
    const timer = setTimeout(() => setBump(false), 300);

    return () => clearTimeout(timer);
  }, [cartItems]);

  return (
    <>
      {/* Top Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        {/* Hamburger Icon (mobile only) */}
        <button className="md:hidden" onClick={() => setMenuOpen(true)}>
          <FiMenu size={24} className="text-gray-700" />
        </button>

        {/* Logo */}
        <div className="text-xl font-bold text-black">Wristy</div>

        {/* Cart Icon */}
        <div
          onClick={() => setIsCartOpen(true)}
          className={`relative transition-transform cursor-pointer ${
            bump ? "animate-bounce" : ""
          }`}
        >
          <FiShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-black text-white px-1.5 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </header>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <FiX size={24} className="text-gray-700" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <a href="#" className="text-gray-700 hover:text-black">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Men
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Women
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Others
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Contact
          </a>
        </nav>
      </div>

      {/* Screen overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
