import classNames from "classnames";
import { useSidebar } from "../contexts/SidebarContext";
import { useGetLessonsQuery } from "../generated";
import { LessonCard } from "./LessonCard";
import { LessonCardSkeleton } from "./skeleton/LessonCardSkeleton";

export function Sidebar() {
  const { data, loading } = useGetLessonsQuery();
  const { isSidebarOpen } = useSidebar();

  return (
    <aside
      className={classNames(
        "w-full sm:w-[348px] overflow-auto bg-gray-700 p-6 border-l border-gray-600 fixed top-[75px] bottom-0 right-0 z-10 lg:block",
        {
          block: isSidebarOpen,
          hidden: !isSidebarOpen,
        }
      )}
    >
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {loading &&
          [...new Array(3)].map((_, i) => <LessonCardSkeleton key={i} />)}
        {data?.lessons.map(
          ({ id, title, slug, availableAt, lessonType: type }) => (
            <LessonCard
              key={id}
              title={title}
              slug={slug}
              availableAt={new Date(availableAt)}
              type={type}
            />
          )
        )}
      </div>
    </aside>
  );
}
