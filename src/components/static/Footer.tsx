const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm mb-1">📞 <a href="https://wa.me/+2348186729930" className="underline">WhatsApp Chat</a></p>
          {/* <p className="text-sm">📧 hello@timexstore.com</p> */}
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Shop</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#shop" className="hover:underline">Men</a></li>
            <li><a href="#shop" className="hover:underline">Women</a></li>
            <li><a href="#shop" className="hover:underline">Others</a></li>
          </ul>
        </div>

        {/* Branding */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Wristy</h3>
          <p className="text-sm">Timeless. Elegant. Affordable.</p>
          <p className="text-sm mt-2">© {new Date().getFullYear()} Wristy Store</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
