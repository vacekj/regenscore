export async function fetchRequest(url: string) {
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
}
