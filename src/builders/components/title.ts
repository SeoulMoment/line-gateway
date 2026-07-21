export function title(text: string) {
  return {
    type: "text",
    text,
    weight: "bold",
    size: "xl",
  } as const;
}
