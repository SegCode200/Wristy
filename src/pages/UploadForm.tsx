import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import WatchList from "./WatchList ";
import { FiLogOut, FiUploadCloud } from "react-icons/fi";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        setUser(null);
        navigate("/auth/admin");
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !category || !imageFile) {
      toast.error("❌ Please fill all fields and select an image.");
      return;
    }

    try {
      setUploading(true);

      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("watches")
        .upload(filePath, imageFile);

      if (uploadError) {
        toast.error("❌ Upload failed at storage.");
        console.error("Storage error:", uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("watches")
        .getPublicUrl(filePath);

      const imageUrl = urlData?.publicUrl;

      const { error: insertError } = await supabase.from("watches").insert([
        {
          name,
          price: Number(price),
          category,
          image_url: imageUrl,
        },
      ]);

      if (insertError) {
        toast.error("❌ Upload failed at database.");
        console.error("DB error:", insertError.message);
        return;
      }

      toast.success("✅ Watch uploaded!");
      setName("");
      setPrice("");
      setCategory("Men");
      setImageFile(null);
      setImagePreview(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err: any) {
      console.error("❌ Unexpected error:", err.message);
      toast.error("Something went wrong. Try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FiUploadCloud className="text-black" /> Upload New Watch
        </h2>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate("/auth/admin");
          }}
          className="text-red-600 text-sm hover:underline flex items-center gap-1"
        >
          <FiLogOut size={16} /> Sign Out
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleUpload} className="space-y-4 mb-10">
        <div>
          <label className="block text-sm font-medium mb-1">Watch Name</label>
          <input
            type="text"
            placeholder="e.g. Rolex Submariner"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price (₦)</label>
          <input
            type="number"
            placeholder="e.g. 250000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Watch Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded bg-gray-50"
          />
        </div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-56 object-cover rounded border mt-2"
          />
        )}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition"
        >
          {uploading ? "Uploading..." : "Upload Watch"}
        </button>
      </form>

      {/* Watch List */}
      <hr className="mb-6" />
      <WatchList key={refreshKey} />
    </div>
  );
};

export default UploadForm;
