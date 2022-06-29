import Skeleton from "react-loading-skeleton";

export function VideoSectionSkeleton() {
  return (
    <div>
      <div className="w-full aspect-video mb-4">
        <Skeleton height="100%" />
      </div>
      <div className="flex">
        <div className="flex flex-col w-full gap-4">
          <Skeleton width="70%" />
          <Skeleton count={4} />
        </div>
        <div className="w-full flex flex-col justify-center items-end">
          <Skeleton height={50} width={200} count={2} />
        </div>
      </div>
      <div className="flex items-center mt-3">
        <div className="w-16 h-16 mr-4">
          <Skeleton height="100%" circle />
        </div>
        <div className="w-60">
          <Skeleton width="80%" />
          <Skeleton />
        </div>
      </div>
    </div>
  );
}
