import type { ReactNode } from "react";

type QuickActionCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

function QuickActionCard({
  icon,
  title,
  description,
  onClick,
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-5 rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-xl"
    >
      {/* Icon */}

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-black transition-all duration-300 group-hover:bg-black group-hover:text-white">

        {icon}

      </div>

      {/* Content */}

      <div className="flex-1">

        <h3 className="text-lg font-semibold text-gray-900">

          {title}

        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">

          {description}

        </p>

      </div>

    </button>
  );
}

export default QuickActionCard;