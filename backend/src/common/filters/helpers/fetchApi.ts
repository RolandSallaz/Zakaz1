export async function steamGameFetch(steamId: number, lang: 'ru' | 'en') {
  return await fetch(
    `https://store.steampowered.com/api/appdetails?appids=${steamId}&cc=${lang}&lang=ru`,
  )
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        return res[steamId];
      }
    });
}
