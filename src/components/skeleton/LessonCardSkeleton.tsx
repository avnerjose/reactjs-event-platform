import Skeleton from "react-loading-skeleton";
import { LessonCard } from "../LessonCard";
export function LessonCardSkeleton() {
  return (
    <div className="">
      <div className="w-[80%]">
        <Skeleton height={20} />
      </div>
      <Skeleton height={90} />
    </div>
  );
}
