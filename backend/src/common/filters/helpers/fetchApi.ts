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

export async function fetchDigisellerItem(productId: number) {
  return await fetch(
    `https://api.digiseller.ru/api/products/${productId}/data?currency=RUB&transp=cors&format=json`,
  ).then((res) => res.json());
}
