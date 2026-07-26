function Features() {
  const features = [
    {
      icon: "⚖️",
      title: "AI Legal Assistant",
      description:
        "Ask legal questions in everyday language and receive clear, easy-to-understand answers.",
    },
    {
      icon: "📄",
      title: "Document Analysis",
      description:
        "Upload legal documents and get AI-generated summaries with important points highlighted.",
    },
    {
      icon: "🌐",
      title: "Multilingual Support",
      description:
        "Understand legal information in English, Telugu, and additional Indian languages in the future.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Everything You Need
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            NyayaMitra AI combines artificial intelligence with legal knowledge
            to make the law easier to understand for everyone.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-5xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;