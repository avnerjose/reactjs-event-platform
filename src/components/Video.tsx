import {
  DefaultUi,
  Player,
  Youtube,
  Skeleton as VimeSkeleton,
} from "@vime/react";
import { DiscordLogo, FileArrowDown, Image, Lightning } from "phosphor-react";
import { ComplementCard } from "./ComplementCard";
import { useGetLessonBySlugQuery } from "../generated";

import "@vime/core/themes/default.css";
import Skeleton from "react-loading-skeleton";
import { VideoSectionSkeleton } from "./skeleton/VideoSectionSkeleton";

interface VideoProps {
  lessonSlug: string;
}

export function Video({ lessonSlug }: VideoProps) {
  const { data, loading } = useGetLessonBySlugQuery({
    variables: {
      slug: lessonSlug,
    },
    fetchPolicy: "no-cache",
  });

  return (
    <div className="flex-1">
      {!loading && (
        <div className="bg-black flex justify-center px-8">
          <div className="w-full max-w-[1100px] max-h-[50vh] aspect-video z-10">
            <Player>
              {data?.lesson?.videoId && (
                <Youtube videoId={data.lesson.videoId} />
              )}
              <DefaultUi />
              <VimeSkeleton />
            </Player>
          </div>
        </div>
      )}
      <div className="p-8 max-w-[1100px] mx-auto">
        {loading ? (
          <VideoSectionSkeleton />
        ) : (
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{data?.lesson?.title}</h1>
              <p className="mt-4 text-gray-200 leading-relaxed">
                {data?.lesson?.description}
              </p>
              {data?.lesson?.teacher && (
                <div className="flex items-center gap-4 mt-6">
                  <img
                    className="h-16 w-16 rounded-full border-2 border-blue-500"
                    src={data.lesson.teacher.avatarURL}
                    alt="AvnerJose"
                  />
                  <div className="leading-relaxed">
                    <strong className="font-bold text-2xl block">
                      {data.lesson.teacher.name}
                    </strong>
                    <span className="text-gray-200 text-sm block">
                      {data.lesson.teacher.bio}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full lg:w-auto">
              <a className="p-4 text-sm  bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:brightness-75 cursor-pointer transition-all">
                <DiscordLogo size={24} />
                comunidade no discord
              </a>
              <a className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center cursor-pointer hover:bg-blue-500 hover:text-gray-900 transition-all">
                <Lightning size={24} />
                Acesse o desafio
              </a>
            </div>
          </div>
        )}
        <div className="gap-8 mt-20 grid grid-cols-1 lg:grid-cols-2">
          {loading ? (
            [...new Array(2)].map((_, i) => <Skeleton key={i} height={155} />)
          ) : (
            <>
              <ComplementCard
                title="Material complementar"
                description="Acesse o material complementar para acelerar seu desenvolvimento"
                icon={FileArrowDown}
              />
              <ComplementCard
                title="Wallpapers exclusivos"
                description="Baixe wallpapesrs exclusivos do Ignite Lab e personalize sua máquina"
                icon={Image}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
