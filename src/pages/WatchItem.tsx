import { FiEdit2, FiTrash2 } from "react-icons/fi";

type Props = {
  watch: {
    id: string;
    name: string;
    price: number;
    category: string;
    image_url: string;
  };
  onDelete: () => void;
  onEdit: (watch: any) => void;
};

const WatchItem = ({ watch, onDelete, onEdit }: Props) => {
  return (
    <li className="flex items-center justify-between p-4 rounded-lg bg-white shadow hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img
          src={watch.image_url}
          alt={watch.name}
          loading="lazy"
          className="w-16 h-16 rounded object-cover border"
        />
        <div>
          <h3 className="text-base font-semibold text-gray-800">{watch.name}</h3>
          <p className="text-sm text-gray-600">₦{watch.price.toLocaleString()}</p>
          <span className="text-xs text-gray-400">{watch.category}</span>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={() => onEdit(watch)}
          className="text-blue-600 hover:text-blue-800 transition"
          title="Edit"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 transition"
          title="Delete"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default WatchItem;
