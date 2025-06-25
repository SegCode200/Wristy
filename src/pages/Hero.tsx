const Hero = () => {
  return (
    <section className="relative h-[90vh] w-full">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1620477402874-1cafbcd8651c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fG1hbiUyMHdlYXJpbmclMjB3cmlzdCUyMHdhdGNofGVufDB8fDB8fHww"
        alt="Watch banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Elevate Your Wrist Game
          </h1>
          <p className="text-white text-lg mb-6 max-w-xl mx-auto">
            Discover luxury watches crafted to fit your lifestyle. Timeless, elegant, and uniquely yours.
          </p>
          <a
            href="#shop"
            className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
