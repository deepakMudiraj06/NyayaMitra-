import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";

type Props = {
  onRename: () => void;
  onDelete: () => void;
};

function ConversationMenu({
  onRename,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="rounded-lg p-1 hover:bg-gray-200"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-40 rounded-xl border border-gray-200 bg-white shadow-lg">

          <button
            onClick={() => {
              onRename();
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100"
          >
            ✏ Rename
          </button>

          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-gray-100"
          >
            🗑 Delete
          </button>

        </div>
      )}
    </div>
  );
}

export default ConversationMenu;