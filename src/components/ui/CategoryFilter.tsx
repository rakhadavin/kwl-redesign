import React from "react";

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  className = "",
}: CategoryFilterProps) {
  return (
    <section className={`py-8 bg-white border-b ${className}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <category.icon className="w-5 h-5 mr-2" />
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}