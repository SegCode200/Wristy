// components/WatchItem.tsx
type Props = {
  watch: {
    id: string;
    name: string;
    price: number;
    category: string;
    image_url: string;
  };
  onDelete: () => void;
  onEdit: (watch: any) => void; // 👈 add this
};

const WatchItem = ({ watch, onDelete, onEdit }: Props) => {
  
  return (
    <li className="flex items-center justify-between border p-3 rounded">
      <div className="flex gap-3 items-center">
        <img
          src={watch.image_url}
          alt={watch.name}
          className="w-14 h-14 object-cover rounded"
        />
        <div>
          <p className="font-semibold">{watch.name}</p>
          <p className="text-sm text-gray-600">₦{watch.price.toLocaleString()}</p>
          <p className="text-xs text-gray-400">{watch.category}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2 text-right">
        <button
          onClick={() => onEdit(watch)}
          className="text-blue-600 text-sm underline"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 text-sm underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default WatchItem;
