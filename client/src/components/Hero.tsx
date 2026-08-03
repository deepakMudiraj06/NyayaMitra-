import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-center">
      <span className="inline-block rounded-full border px-4 py-2 text-sm font-medium">
        ⚖ AI-Powered Legal Assistance
      </span>

      <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight">
        Understand the Law
        <br />
        <span className="text-gray-500">
          Without Legal Jargon
        </span>
      </h1>

      <p className="mt-8 max-w-3xl mx-auto text-lg text-gray-600 leading-8">
        Ask legal questions in simple language, upload legal documents,
        and receive AI-powered explanations in English and Telugu.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/chat"
          className="rounded-xl bg-black px-8 py-4 text-white font-medium hover:bg-gray-800 transition"
        >
          Start AI Chat →
        </Link>

        <Link
          to="/login"
          className="rounded-xl border px-8 py-4 font-medium hover:bg-gray-100 transition"
        >
          Upload Document
        </Link>
      </div>

      <div className="mt-12 text-gray-500">
        ⭐⭐⭐⭐⭐ Trusted by Students, Citizens & Professionals
      </div>
    </section>
  );
}

export default Hero;