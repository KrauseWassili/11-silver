import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "FAQ",
    description: "The most frequent questions"
}
// SSR - server side rendering

const Help = () => {
  return (
    <div className="bg-amber-100 min-h-screen">
      <section className="bg-amber-200 mx-28 min-h-screen p-12">
        <h1 className="font-extrabold text-5xl ">FAQ</h1>
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href={"https://help.tabletopia.com/knowledge-base/faq/"}
            className="hover:text-red-400 p-3"
          >
            FAQ for players
          </Link>
          <Link
            href={
              "https://help.tabletopia.com/knowledge-base/tabletopia-mobile-app-help/"
            }
            className="hover:text-red-400 p-3"
          >
            Mobile App Help
          </Link>
        </nav>
      </section>

      <section className="bg-slate-300 mx-8 md:mx-28 min-h-screen p-12">
        <div className="p-8 w-[200px] sm:w-[340px] md:w-[450px] lg:w-[650px] xl:w-[1000px] bg-blue-400">
          <div className="bg-green-200 w-9/12">child</div>
        </div>
      </section>

      <section className="bg-slate-300 mx-8 md:mx-28 min-h-screen p-12 grid grid-cols-4 gap-2">
        <div className="bg-pink-200 col-span-4 rounded-2xl">Nif-nif</div>
        <div className="bg-pink-300 col-span-2 rounded-full flex justify-center items-center gap-6">
          <div className="bg-pink-800 rounded-full w-10 h-10"></div>
          <div className="bg-pink-800 rounded-full w-10 h-10"></div>
        </div>
        <div className="bg-pink-500 col-span-1 col-start-4">Nuf-nuf</div>
        <div className="bg-gray-400 col-span-4 md:col-span-2">Wolf</div>
        <div className="bg-gray-600 col-span-4 md:col-span-2">Wolf</div>
      </section>
    </div>
  );
};

export default Help;
