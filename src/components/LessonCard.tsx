import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CheckCircle, Lock } from "phosphor-react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function LessonCard({ title, availableAt, slug, type }: LessonProps) {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const isActiveLesson = routeSlug === slug;
  const isLessonAvailable = isPast(availableAt);
  const availableDateFormated = format(
    availableAt,
    "EEEE' · 'd' de 'MMMM' · 'k'h'mm",
    {
      locale: ptBR,
    }
  );

  return (
    <Link
      to={`/event/lesson/${slug}`}
      className={classNames("group", {
        "pointer-events-none": !isLessonAvailable,
      })}
    >
      <span className="text-gray-300">{availableDateFormated}</span>
      <div
        className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 relative",
          {
            "bg-green-500 triangle-before": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames(
                "flex items-center gap-2 text-sm text-blue-500 font-medium",
                {
                  "text-white": isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={classNames(
              "text-xs rounded py-[0.125rem] px-2 border border-green-300  font-bold ",
              {
                "border-white text-white": isActiveLesson,
                "text-green-300": !isActiveLesson,
              }
            )}
          >
            {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong
          className={classNames("mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}
