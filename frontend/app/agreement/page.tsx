import React from "react";
import { getChapterInfo } from "../lib/services/api";
import { INFOCHAPTER } from "../lib/utils/config";
import InfoChapter from "../components/InfoChapter/InfoChapter";
async function fetchData() {
  try {
    return await getChapterInfo(INFOCHAPTER.agreement.link);
  } catch (error) {
    console.error("Error fetching item:", error);
    const err = error as Error;
    return err.message;
  }
}

export default async function Page() {
  const content = await fetchData();
  if (typeof content === "string") {
    return (
      <div className="error">
        Ошибка загрузки данных. {INFOCHAPTER.agreement.link} {content}
      </div>
    );
  }

  return <InfoChapter heading={content.heading} text={content.text} />;
}
