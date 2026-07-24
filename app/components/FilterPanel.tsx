import { Button } from "@heroui/react";

const FilterPanel = ({
  categories,
  category,
  minPrice,
  maxPrice,
  updateFilters,
  clearFilters,
  hasFilters,
  organic,
}) => {
  const categoriesWithAll = [
    { slug: "", name: "All Categories" },
    ...categories,
  ];
  console.log(category);
  return (
    <div className="space-y-6">
      {/* categories */}
      <div>
        <h3 className="text-sm font-semibold text-app-green mb-3">
          Categories
        </h3>
        <div className="space-y-1.5">
          {categoriesWithAll.map((cat) => (
            <Button
              onClick={() => updateFilters("category", cat.slug)}
              key={cat.slug}
              className={`block w-full text-left px-3 py-2 text-sm transition-all rounded-md ${category === cat.slug ? "bg-app-green text-white" : "text-app-text-light hover:bg-app-cream bg-inherit "}`}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>
      {/* price range */}
      <div>
        <h3 className="text-sm font-semibold text-app-green mb-3">
          Price range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border not-focus:border-app-border"
            onChange={(e) => updateFilters("minPrice", e.target.value)}
          />
          <span className="text-app-text-light">-</span>
          <input
            type="number"
            placeholder="Max"
            value={minPrice}
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border not-focus:border-app-border"
            onChange={(e) => updateFilters("maxPrice", e.target.value)}
          />
        </div>
      </div>
      {hasFilters && (
        <Button
          onClick={clearFilters}
          className="w-full bg-inherit p-2 text-sm text-app-error hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          Clear all filters
        </Button>
      )}
    </div>
  );
};

export default FilterPanel;
