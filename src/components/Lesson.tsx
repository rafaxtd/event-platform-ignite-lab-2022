import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableAtFormatted = format(
    props.availableAt,
    "YYYY • MMMM D • h A",
    {
      locale: ptBR,
    }
  );

  console.log(availableAtFormatted, props.availableAt);

  const isActiveLesson = slug === props.slug;

  return (
    <Link
      to={`/event/lesson/${props.slug}`}
      className={isLessonAvailable ? "group" : "group pointer-events-none"}
    >
      <span className="text-gray-300">{availableAtFormatted}</span>
      <div
        className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
          {
            "bg-green-500": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames(
                "text-sm  font-medium flex items-center gap-2",
                {
                  "text-white": isActiveLesson,
                  "text-blue-500": !isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} className="" />
              Released
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} className="" />
              Soon
            </span>
          )}
          <span
            className={classNames(
              "text-xs rounded px-2 py-[0.125rem] text-white border  font-bold ",
              {
                "border-green-300": !isActiveLesson,
                "border-white": isActiveLesson,
              }
            )}
          >
            {props.type === "live" ? "LIVE" : "CLASS"}
          </span>
        </header>
        <strong
          className={classNames(" mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}
