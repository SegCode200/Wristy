import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import img1 from "../assets/men best moves.jpeg"
import img2 from "../assets/fashion clothes.jpeg"
import img3 from "../assets/arrival.jpeg"

// import { Link } from "react-router-dom";

interface Watch {
  id: string;
  name: string;
  image_url: string;
  category: string;
}

const categories = [
  { label: "Men’s Collection", value: "Men", emoji: "🧑",image:img1 },
  { label: "Women’s Collection", value: "Women", emoji: "👩",image:img2 },
  { label: "New Arrivals", value: "Others", emoji: "🎁",image:img3 },
];

const CategorySection = () => {
  const [latestByCategory, setLatestByCategory] = useState<Record<string, Watch | null>>({});

  useEffect(() => {
    const fetchLatest = async () => {
      const result: Record<string, Watch | null> = {};

      for (const cat of categories) {
        const { data, error } = await supabase
          .from("watches")
          .select("*")
          .eq("category", cat.value)
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error(`Error fetching ${cat.value} category`, error.message);
          result[cat.value] = null;
        } else {
          result[cat.value] = data[0] || null;
        }
      }

      setLatestByCategory(result);
    };

    fetchLatest();
  }, []);

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Shop by Collection</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const watch = latestByCategory[cat.value];

          return (
            <a
              key={cat.value}
              href={`#shop`}
              className="relative group rounded-lg overflow-hidden shadow-md"
            >
              {watch ? (
                <>
                  <img
                    src={cat?.image}
                    alt={watch.name}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center">
                    <h3 className="text-white text-lg font-semibold text-center">
                      {cat.emoji} {cat.label}
                    </h3>
                  </div>
                </>
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-600 text-sm">No items yet</p>
                </div>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
