import InfoChapter from "../components/InfoChapter/InfoChapter";
import { getChapterInfo } from "../lib/services/api";
import { INFOCHAPTER } from "../lib/utils/config";

async function fetchData() {
  try {
    return await getChapterInfo(INFOCHAPTER.refund.link);
  } catch (error) {
    console.error("Error fetching item:", error);
    return null;
  }
}

export default async function Page() {
  const content = await fetchData();
  if (!content) {
    return <div className="error">Ошибка загрузки данных.</div>;
  }

  return <InfoChapter heading={content.heading} text={content.text} />;
}
