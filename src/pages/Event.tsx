import { useParams } from "react-router-dom";
import { Header } from "../../src/components/Header";
import { Sidebar } from "../../src/components/Sidebar";
import { Video } from "../../src/components/Video";

export function Event() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {slug ? <Video lessonSlug={slug} /> : <div className="flex-1" />}
        <Sidebar />
      </main>
    </div>
  );
}
