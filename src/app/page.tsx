import Buttons from "@/components/buttons-home-page";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center text-center mt-[-100px] justify-center bg-white dark:bg-black text-foreground font-sans">
      <div className="text-center sans-serif">
        <h2 className="text-4xl bold mb-4">
          Learn Languages with Super Tutor
        </h2>
        <img
          src="/Wyqhh8CwGO.svg"
          alt=""
          width={300}
          height={300}
          className="w-64 h-auto rounded-xl shadow-1g"
        />
        <p className="text-black text-2xl dark:text-gray-300">
          Practice anytime,anywhere!
        </p>
      </div>
      <Buttons />
    </div>
  );
}
