import { Scale } from "lucide-react";

function Hero() {
  return (
    <section className="flex flex-col items-center">

      {/* Logo */}

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black text-white shadow-lg transition duration-300 hover:scale-105">

        <Scale size={42} />

      </div>

      {/* Title */}

      <h1 className="mt-8 text-5xl font-bold tracking-tight text-black">

        NyayaMitra

      </h1>

      {/* Subtitle */}

      <p className="mt-5 max-w-2xl text-center text-lg leading-8 text-gray-500">

        AI-powered Legal Research Assistant

        for Indian Laws.

        Upload legal documents,

        ask questions,

        and receive accurate answers

        backed by legal citations.

      </p>

      {/* Heading */}

      <h2 className="mt-14 text-3xl font-semibold text-black">

        What can I help you with today?

      </h2>

    </section>
  );
}

export default Hero;