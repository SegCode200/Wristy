import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import WatchList from "./WatchList ";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0); // used to trigger WatchList refresh

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
      let filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("watches")
        .upload(filePath, imageFile);

      if (uploadError) {
        toast.error("❌ Upload failed at storage.");
        console.error("Storage upload error:", uploadError.message);
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
        toast.error("❌ Upload failed at DB insert.");
        console.error("DB insert error:", insertError.message);
        return;
      }

      setName("");
      setPrice("");
      setCategory("Men");
      setImageFile(null);
      setImagePreview(null);
      toast.success("✅ Watch uploaded successfully!");
      setRefreshKey((prev) => prev + 1); // trigger WatchList reload
    } catch (err: any) {
      console.error("❌ Unexpected error:", err.message);
      toast.error("❌ Upload failed. Please try again.");
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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className=" flex-col mb-6">
        <h2 className="text-2xl font-bold">📤 Upload New Watch</h2>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate("/auth/admin");
          }}
          className="text-red-600 text-sm mt-4"
        >
          🔓 Sign Out
        </button>
      </div>

      <form onSubmit={handleUpload} className="space-y-4 mb-10">
        <div>
          <label className="block text-sm font-medium mb-1">Watch Name</label>
          <input
            type="text"
            placeholder="Watch Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price (₦)</label>
          <input
            type="number"
            placeholder="Price"
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
          <label className="block text-sm font-medium mb-1">Image File</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded border"
          />
        )}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {uploading ? "Uploading..." : "Upload Watch"}
        </button>
      </form>

      <hr className="mb-6" />

      <WatchList key={refreshKey} />
    </div>
  );
};

export default UploadForm;
