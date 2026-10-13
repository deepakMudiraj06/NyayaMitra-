import Hero from "../components/welcome/Hero";
import QuickActions from "../components/welcome/QuickActions";
import TopicChips from "../components/welcome/TopicChips";


type WelcomeProps = {
  onNewChat?: () => void;
};

function Welcome({
  onNewChat = () => {},
}: WelcomeProps) {
  return (
    <div className="flex flex-1 bg-[#FAFAFA]">

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-6">

        {/* Hero */}
        <Hero />

        {/* Quick Actions */}
        <QuickActions
          onNewChat={onNewChat}
        />

        {/* Explore Topics */}
        <TopicChips />


      </div>

    </div>
  );
}

export default Welcome;
