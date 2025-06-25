import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import WatchItem from "./WatchItem";
import EditWatchModal from "./EditWatchModal ";
import ConfirmModal from "../components/static/ConfirmModal";

type Watch = {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
};

const WatchList = () => {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [editing, setEditing] = useState<Watch | null>(null);
  const [confirming, setConfirming] = useState<Watch | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // Customize your limit here
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("watches")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      toast.error("❌ Failed to fetch watches");
    } else {
      setWatches(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  }, [page]);

  const deleteWatch = async () => {
    if (!confirming) return;

    const key = confirming.image_url.split("/").pop();
    if (key) await supabase.storage.from("watches").remove([`${key}`]);

    const { error } = await supabase.from("watches").delete().eq("id", confirming.id);
    if (error) toast.error("❌ delete failed");
    else {
      toast.success("✅ deleted");
      load();
    }
    setConfirming(null);
  };

  const totalPages = Math.ceil(total / limit);
  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">📦 Uploaded Watches</h3>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : watches.length === 0 ? (
        <p className="text-gray-500">No watches yet</p>
      ) : (
        <>
          <ul className="space-y-3">
            {watches.map((w) => (
              <WatchItem
                key={w.id}
                watch={w}
                onEdit={() => setEditing(w)}
                onDelete={() => setConfirming(w)}
              />
            ))}
          </ul>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {visiblePages.map((p) => (
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
        </>
      )}

      {/* Edit Modal */}
      {editing && (
        <EditWatchModal
          watch={editing}
          onClose={() => setEditing(null)}
          onUpdate={load}
        />
      )}

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={!!confirming}
        title="Confirm Delete"
        message={`Delete "${confirming?.name}"?`}
        onConfirm={deleteWatch}
        onCancel={() => setConfirming(null)}
      />
    </div>
  );
};

export default WatchList;
