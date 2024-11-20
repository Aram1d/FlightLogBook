export const timeFormatter = (n: number | null | undefined) => {
  if (!n && !(n === 0)) return "";
  const minutes = typeof n === "number" ? n : parseFloat(n);
  const hours = Math.abs(~~(minutes / 60));

  return `${minutes < 0 ? "-" : ""}${hours
    .toString()
    .padStart(2, "0")}:${Math.abs(minutes % 60)
    .toString()
    .padStart(2, "0")}`;
};
