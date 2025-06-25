// components/EditWatchModal.tsx
import {  useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

const EditWatchModal = ({ watch, onClose, onUpdate }: any) => {
  const [name, setName] = useState(watch.name);
  const [price, setPrice] = useState(watch.price);
  const [category, setCategory] = useState(watch.category);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    watch.image_url
  );
  const [loading, setLoading] = useState(false);
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
  setLoading(true);
  let updatedImageUrl = watch.image_url;

  try {
    // Upload new image if selected
    if (imageFile) {
      const fileName = `${Date.now()}_${imageFile.name}`;
      const filePath = `${fileName}`;

      // Delete old image if it exists
      const oldPath = watch.image_url?.split("/").slice(-1)[0];
      if (oldPath) {
        await supabase.storage.from("watches").remove([`${oldPath}`]);
      }

      const { error: uploadError } = await supabase.storage
        .from("watches")
        .upload(filePath, imageFile);

      if (uploadError) {
        toast.error("❌ Image upload failed");
        console.error(uploadError.message);
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("watches")
        .getPublicUrl(filePath);
      updatedImageUrl = urlData.publicUrl;
    }

    // Update the database
    const { error } = await supabase
      .from("watches")
      .update({
        name,
        price,
        category,
        image_url: updatedImageUrl,
      })
      .eq("id", watch.id);

    if (error) {
      toast.error("❌ Failed to update watch");
      console.error(error.message);
    } else {
      toast.success("✅ Watch updated successfully");
      onUpdate(); // refetch
      onClose();  // close modal
    }
  } catch (err: any) {
    toast.error("❌ Unexpected error");
    console.error(err.message);
  }

  setLoading(false);
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-80">
        <h3 className="text-lg font-semibold mb-4">Edit Watch</h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full p-2 border rounded mb-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Others">Others</option>
        </select>

        {/* 📸 Image Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-32 object-cover mb-2 rounded"
          />
        )}

        {/* 📁 Upload New Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mb-4"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-3 py-1 text-sm bg-black text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWatchModal;
