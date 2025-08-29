import type { PixPayload } from "@/types";

export const buildPixPayload = ({
  name,
  city = "BRASIL",
  key,
  amount = "",
  msg = "RACHADINHA",
}: PixPayload): string => {
  return `PIX KEY: ${key}\nNOME: ${name || ""}\nVALOR: ${
    amount
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(amount))
      : "livre"
  }\nMSG: ${msg}\nCIDADE: ${city}`;
};
