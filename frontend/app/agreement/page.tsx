import React from "react";
import { getChapterInfo } from "../lib/services/api";
import { INFOCHAPTER } from "../lib/utils/config";
import InfoChapter from "../components/InfoChapter/InfoChapter";

export default async function Page() {
  async function fetchData() {
    try {
      return await getChapterInfo(INFOCHAPTER.agreement.link);
    } catch (error) {
      console.error("Error fetching item:", error);
      return null;
    }
  }
  const content = await fetchData();
  if (!content) {
    return <div className="error">Ошибка загрузки данных.</div>;
  }

  return <InfoChapter heading={content.heading} text={content.text} />;
}
