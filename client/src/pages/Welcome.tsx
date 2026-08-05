import Hero from "../components/welcome/Hero";
import UploadCard from "../components/welcome/UploadCard";

function Welcome() {

  return (

    <div className="min-h-screen bg-white">

      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20">

        <Hero />

        <UploadCard />

      </div>

    </div>

  );

}

export default Welcome;