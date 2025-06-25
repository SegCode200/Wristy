import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import WatchCard from "./WatchCard";
import toast from "react-hot-toast";

interface WatchItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: "Men" | "Women" | "Others";
  quantity?: number; // optional for cart support
}

const ProductList = () => {
  const [watches, setWatches] = useState<WatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<"All" | "Men" | "Women" | "Others">("All");

  const [page, setPage] = useState(1);
  const [limit] = useState(6); // Items per page
  const [total, setTotal] = useState(0);

  const fetchWatches = async () => {
    setLoading(true);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("watches")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (category !== "All") {
      query = query.eq("category", category);
    }

    const { data, error, count } = await query;

    if (error) {
      toast.error("❌ Failed to load watches");
      console.error(error.message);
    } else {
      setWatches(data || []);
      setTotal(count || 0);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchWatches();
    document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" });
  }, [page,category]);

  const totalPages = Math.ceil(total / limit);
  const categories = ["All", "Men", "Women", "Others"] as const;

  return (
    <section id="shop" className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">🛍️ All Watches</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setPage(1); // reset to first page on filter change
            }}
            className={`px-4 py-2 rounded-full text-sm ${
              category === cat
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading watches...</p>
      ) : watches.length === 0 ? (
        <p className="text-center text-gray-400">No watches in this category.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {watches.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 text-sm rounded border ${
                page === p
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
