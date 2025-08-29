import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { ThanksInfo } from "@/types";
import { currency, shareContent } from "@/utils/helpers";

interface ThanksStepProps {
  thanksInfo: ThanksInfo;
  link: string;
  title: string;
  onBackToPublic: () => void;
}

export default function ThanksStep({
  thanksInfo,
  link,
  title,
  onBackToPublic,
}: ThanksStepProps) {
  const handleShare = async () => {
    await shareContent(
      "Acabei de contribuir nessa Rachadinha PIX!",
      link,
      title
    );
  };

  return (
    <Card className="text-center p-8">
      <div className="text-5xl mb-4">✅</div>
      <h2 className="text-2xl font-bold mb-2">
        Valeu, {thanksInfo.name || "amigo"}! 🎉
      </h2>
      <p className="text-gray-600 mb-6">
        Você contribuiu com{" "}
        <span className="font-semibold">{currency(thanksInfo.value)}</span>. Sua
        frase já entrou no mural!
      </p>
      <div className="flex gap-2 justify-center">
        <Button variant="success" onClick={onBackToPublic}>
          Ver mural
        </Button>
        <Button variant="primary" onClick={handleShare}>
          Compartilhar
        </Button>
      </div>
    </Card>
  );
}
