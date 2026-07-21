export function primaryButton(label: string, uri: string) {
  return {
    type: "button",
    style: "primary",
    action: {
      type: "uri",
      label,
      uri,
    },
  } as const;
}
