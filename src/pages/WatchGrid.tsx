
import WatchCard from "./WatchCard";


interface WatchItem {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
  category: "Men" | "Women" | "Others" | "All";
  quantity?: number; // used when added to cart
}

interface Props {
  watches: WatchItem[];
}

const WatchGrid: React.FC<Props> = ({ watches }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 pb-10">
      {watches.map((watch) => (
        <WatchCard key={watch.id} watch={watch} />
      ))}
    </div>
  );
};

export default WatchGrid;
