import { Scale } from "lucide-react";

const topics = [
  "Constitution of India",
  "Motor Vehicle Act",
  "Consumer Protection",
  "Cyber Crime & IT Act",
  "Indian Penal Code",
  "Family Law",
  "Labour Law",
  "Property Law",
];

type TopicChipsProps = {
  onSelectTopic?: (topic: string) => void;
};

function TopicChips({
  onSelectTopic,
}: TopicChipsProps) {
  return (
    <section className="mt-8 w-full max-w-5xl">

      <div className="mb-4 text-center">

        <h2 className="text-2xl font-semibold text-gray-900">

          Explore Legal Topics

        </h2>

        <p className="mt-2 text-gray-500">

          Start with a popular legal topic or ask your own question.

        </p>

      </div>

      <div className="flex flex-wrap justify-center gap-4">

        {topics.map((topic) => (

          <button
            key={topic}
            onClick={() => onSelectTopic?.(topic)}
            className="group flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white hover:shadow-lg"
          >

            <Scale
              size={16}
              className="transition-colors duration-300"
            />

            <span className="text-sm font-medium">

              {topic}

            </span>

          </button>

        ))}

      </div>

    </section>
  );
}

export default TopicChips;