export function heroImage(url: string) {
  return {
    type: "image",
    url,
    size: "full",
    aspectMode: "cover",
    aspectRatio: "20:13",
  } as const;
}
