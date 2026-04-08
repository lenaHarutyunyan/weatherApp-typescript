import Header from "./Header";
import type { PageProps } from "../../types";

function Page({ children, title }: PageProps) {
  return (
    <div className="w-full h-screen bg-gray-700">
      <Header />
      <div className="w-full h-screen pt-[8vh]">
        <div className="text-white/60 flex flex-col gap-5 h-full justify-center items-center">
          <h1 className="text-6xl text-white text-center p-5">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  )
};

export default Page;
