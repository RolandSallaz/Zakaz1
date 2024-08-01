"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks/redux";
import { loadFilteredGames } from "@/app/lib/services/slices/gameSlice";
import { IGame, OptionType } from "@/app/lib/utils/types";
import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Select, { components, StylesConfig } from "react-select";
import "./HeaderSearch.scss";

const selectStyles: StylesConfig = {
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "#55bea5", // Цвет выбранного элемента
  }),
  clearIndicator: (baseStyles) => ({
    ...baseStyles,
    color: "#55bea5",
    cursor: "pointer", // Указатель на крестике
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: "#55bea5", // Задаем цвет placeholder
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#55bea5", // Задаем цвет разделяющей полосы
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: "#55bea5", // Задаем цвет стрелочки
    cursor: "pointer !important",
    transition: "transform 0.2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)", // Переворот стрелочки
    "&:hover": {
      cursor: "pointer",
      color: "#beee11", // Цвет стрелочки при наведении
    },
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: "#55bea5", // Задаем желаемый цвет текста
    cursor: "text",
  }),
  menu: (baseStyles: any) => ({
    ...baseStyles,
    background: "none",
  }),
  menuList: (baseStyles: any) => ({
    ...baseStyles,
    background: "none",
    backgroundColor: "rgba(29, 29, 29, 0.9)",
    cursor: "pointer",
    "&::-webkit-scrollbar": {
      width: "12px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(29, 29, 29, 0.9)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#55bea5",
      borderRadius: "4px",
      cursor: "grab",
    },
    "&::-webkit-scrollbar-thumb:active": {
      cursor: "grabbing",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#beee11",
    },
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    background: "none",
    backgroundColor: "rgba(29, 29, 29, 0.7)",
    cursor: "pointer",
    color: state.isSelected ? "#beee11" : "#55bea5",
    ":hover": {
      color: "#beee11",
    },
    ":active": {
      backgroundColor: "rgba(29, 29, 29, 0.7)",
    },
  }),
  container: (baseStyles: any) => ({
    ...baseStyles,
    height: "100%",
    width: "350px",
    color: "#55bea5",
  }),
  control: (baseStyles: any) => ({
    ...baseStyles,
    color: "#55bea5",
    borderColor: "#55bea5",
    backgroundColor: "rgba(29, 29, 29, 0.7)",
    boxShadow: "none",
    ":hover": {
      borderColor: "#55bea5",
    },
    ":active": {
      borderColor: "#55bea5",
    },
    height: "100%",
  }),
};

const NoOptionsMessage = (props: any) => (
  <components.NoOptionsMessage {...props}>
    <div style={{ color: "#55bea5" }}>Ничего не найдено</div>{" "}
  </components.NoOptionsMessage>
);

export default function HeaderSearch() {
  const [selectedTag, setSelectedTag] = useState<string | null>("");
  const { games } = useAppSelector((state) => state.games);
  const { tags } = useAppSelector((state) => state.tags);
  const [search, setSearch] = useState<string>("");
  const [filteredGames, setFilteredGames] = useState<IGame[]>([]);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    function addEvent() {
      document.addEventListener("click", (e: MouseEvent) => {
        const isTrue: boolean = e.target == searchRef.current;
        setSearchFocused(isTrue);
        if (!isTrue) {
          setSearch("");
        }
      });
    }
    addEvent();
    return () => document.removeEventListener("click", addEvent);
  }, []);

  useEffect(() => {
    setFilteredGames(
      games
        .filter(
          (game) =>
            game.enabled &&
            game.name.toLowerCase().startsWith(search.toLowerCase())
        )
        .slice(0, 5)
    );
  }, [search, searchFocused]);

  const options = useMemo(() => {
    const usedTags = tags.filter((tag) =>
      games.some((game) =>
        game.tags.some((gameTag) => gameTag.name === tag.name)
      )
    );

    return usedTags.map((tag) => ({ value: tag.name, label: tag.name }));
  }, [tags, games]);

  useEffect(() => {
    if (games) {
      const filteredGamesWithTag = games.filter(
        (game) =>
          game.tags.some((tag) => tag.name == selectedTag) && game.enabled
      );
      dispatch(
        loadFilteredGames(
          filteredGamesWithTag.length
            ? filteredGamesWithTag
            : games.filter((game) => game.enabled)
        )
      );
    }
  }, [selectedTag, games]);

  const handleChangeSelect = (newValue: unknown) => {
    const option: OptionType = newValue as OptionType;
    if (option) {
      setSelectedTag(option.value);
    } else {
      setSelectedTag(null);
    }
  };
  return (
    <>
      <Select
        styles={selectStyles}
        components={{ NoOptionsMessage }}
        isClearable
        isSearchable
        placeholder="Жанр"
        onChange={handleChangeSelect}
        noOptionsMessage={() => "Ничего не найдено"}
        options={options}
      />
      <label className="search">
        <>
          <input
            onChange={handleChangeSearch}
            value={search}
            className={"search__input"}
            placeholder={`Найти среди ${games.length} игр`}
            ref={searchRef}
          />
          {filteredGames.length > 0 && searchFocused && (
            <div className="search__container">
              {filteredGames.map((game) => (
                <Link
                  key={game.digiId}
                  className="search__link"
                  href={`/games/${game.digiId}`}
                >
                  {game.name}
                </Link>
              ))}
            </div>
          )}
        </>
      </label>
    </>
  );
}
