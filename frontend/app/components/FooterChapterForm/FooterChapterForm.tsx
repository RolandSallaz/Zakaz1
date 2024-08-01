"use client";
import JoditEditor from "jodit-react";
import { FormEvent, useEffect, useMemo } from "react";
import "./FooterChapterForm.scss";
import useFormValidator from "@/app/lib/hooks/useFormValidator";
import { useParams } from "next/navigation";
import useErrorHandler from "@/app/lib/hooks/useErrorHandler";
import { useAppDispatch } from "@/app/lib/hooks/redux";
import { INFOCHAPTER } from "@/app/lib/utils/config";
import { getChapterInfo, updateChapterInfo } from "@/app/lib/services/api";
import { openSnackBar } from "@/app/lib/services/slices/appSlice";
interface formValues {
  text: string;
}

export default function FooterChapterForm() {
  const { values, mutateValue } = useFormValidator<formValues>({
    text: "",
  });
  const { handleError } = useErrorHandler();
  const { link } = useParams();
  const dispatch = useAppDispatch();

  const chapterName = useMemo(() => {
    return Object.values(INFOCHAPTER).find((item) => item.link === link)?.name;
  }, [link]);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (link && chapterName && values.text) {
      return updateChapterInfo({
        text: values.text,
        link: `${link}`,
        heading: chapterName,
      })
        .then(() => {
          dispatch(openSnackBar({ message: `Раздел ${chapterName} обновлен` }));
        })
        .catch(handleError);
    }
  }

  useEffect(() => {
    if (link) {
      getChapterInfo(`${link}`)
        .then((res) => {
          mutateValue({ valueName: "text", value: res.text });
        })
        .catch(console.log);
    }
  }, []);

  return (
    <form className="footerChapterForm" onSubmit={handleFormSubmit}>
      <h2 className="footerChapterForm__heading">{chapterName}</h2>
      <div className="footerChapterForm__input">
        <JoditEditor
          value={values.text}
          onChange={(newContent) => {
            mutateValue({ valueName: "text", value: newContent });
          }}
        />
      </div>

      <button className="footerChapterForm__button" type="submit">
        Сохранить
      </button>
    </form>
  );
}
