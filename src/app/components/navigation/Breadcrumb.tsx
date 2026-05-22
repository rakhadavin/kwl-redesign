import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  variant?: "dark" | "light";
};

const Breadcrumb = ({ items, variant = "dark" }: BreadcrumbProps) => {
  const textColor = variant === "dark" ? "text-gray-300" : "text-gray-500";
  const hoverColor = variant === "dark" ? "hover:text-white" : "hover:text-gray-800";
  const sepColor = variant === "dark" ? "text-gray-400" : "text-gray-400";

  return (
    <nav className={`inline-flex items-center flex-wrap gap-1 text-xs ${textColor} px-4 py-2 mt-2`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="inline-flex items-center gap-1">
            {isLast || !item.href ? (
              <span className={textColor}>{item.label}</span>
            ) : (
              <Link href={item.href} className={`${textColor} ${hoverColor} transition-colors`}>
                {item.label}
              </Link>
            )}
            {!isLast && <span className={sepColor}>{">"}</span>}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
