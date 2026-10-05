export function getContrastTextColor(backgroundColor: string): string {
  const normalizedColor = backgroundColor.replace("#", "");

  if (!/^[0-9A-Fa-f]{6}$/.test(normalizedColor)) {
    return "#111827";
  }

  const channels = [0, 2, 4].map((offset) => {
    const channel =
      Number.parseInt(normalizedColor.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  const luminance =
    channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;

  return luminance > 0.179 ? "#111827" : "#ffffff";
}
