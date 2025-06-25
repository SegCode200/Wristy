interface Props {
  selected: "All" | "Men" | "Women" | "Others";
  onSelect: (category: "All" | "Men" | "Women" | "Others") => void;
}

const categories: Props["selected"][] = ["All", "Men", "Women", "Others"];

const CategoryTabs: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="flex justify-center gap-3 py-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full text-sm border ${
            selected === cat ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
