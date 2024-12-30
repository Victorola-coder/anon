export function formatExpirationTime(hours: number): string {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + hours * 60 * 60 * 1000);

  // get user's timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone,
  }).format(expirationDate);
}

export function getTimeZoneAbbr(): string {
  return (
    new Intl.DateTimeFormat("en-US", {
      timeZoneName: "short",
    })
      .formatToParts(new Date())
      .find((part) => part.type === "timeZoneName")?.value || ""
  );
}
