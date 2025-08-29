export const currency = (value: number | string): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));

export const slugify = (text: string): string =>
  (text || "minha-rachadinha")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const sampleEmojis = [
  "🍕",
  "🍻",
  "🥩",
  "🍟",
  "🍮",
  "🌭",
  "🍹",
  "🥤",
  "🍫",
  "🍰",
  "🎈",
  "🎉",
] as const;

export const getRandomEmoji = (): string =>
  sampleEmojis[Math.floor(Math.random() * sampleEmojis.length)];

export const playNotificationSound = (): void => {
  const audio = new Audio(
    "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg",
  );
  audio.play().catch(() => {
    // Ignore play error - some browsers block autoplay
  });
};

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
};

export const shareContent = async (
  text: string,
  url?: string,
  title?: string,
): Promise<void> => {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch {
      // User cancelled or sharing not supported
    }
  }

  // Fallback to copying
  await copyToClipboard(url || text);
  alert("Link copiado! 🚀");
};
