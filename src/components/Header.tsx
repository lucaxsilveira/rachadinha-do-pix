import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { shareContent } from "@/utils/helpers";

interface HeaderProps {
  title: string;
  link?: string;
}

export default function Header({ title, link }: HeaderProps) {
  const handleShare = async () => {
    if (link) {
      await shareContent("Bora contribuir!", link, title);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 p-3 flex justify-between items-center">
      <div className="flex items-center gap-2 font-extrabold text-xl text-[#FF6B6B]">
        Rachadinha PIX 🎈
      </div>
      {link && (
        <Button variant="primary" onClick={handleShare}>
          <Share2 className="inline-block mr-2" />
          Compartilhar 🎉
        </Button>
      )}
    </header>
  );
}
