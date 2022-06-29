import { FilmStrip } from "phosphor-react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

export function Event() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 lg:max-w-[calc(100vw-348px)] mt-[75px]">
        {slug ? (
          <Video lessonSlug={slug} />
        ) : (
          <div className="flex flex-1 items-center gap-4 flex-col justify-center ">
            <FilmStrip size={72} className="text-green-500" />
            <h1 className="text-2xl text-blue-500 uppercase">
              No video selected
            </h1>
            <p className="text-lg text-gray-200 ">Select one class on the sidebar to have access to the content</p>
          </div>
        )}
        <Sidebar />
      </main>
    </div>
  );
}
