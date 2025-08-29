import { motion } from "framer-motion";
import { Copy, Share2 } from "lucide-react";
import PaymentList from "@/components/PaymentList";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { Payment } from "@/types";
import { copyToClipboard, currency, shareContent } from "@/utils/helpers";
import { buildPixPayload } from "@/utils/pix";

interface PublicStepProps {
  title: string;
  total: number;
  pixKey: string;
  link: string;
  payments: Payment[];
  totalPaid: number;
  progress: number;
  sortedPayments: Payment[];
  onPaymentClick: () => void;
}

export default function PublicStep({
  title,
  total,
  pixKey,
  link,
  payments,
  totalPaid,
  progress,
  sortedPayments,
  onPaymentClick,
}: PublicStepProps) {
  const handleCopyPixKey = async () => {
    await copyToClipboard(pixKey);
    alert("Chave copiada!");
  };

  const handleCopyPayload = async () => {
    const payload = buildPixPayload({ key: pixKey, name: title });
    await copyToClipboard(payload);
    alert("Payload copiado!");
  };

  const handleShare = async () => {
    await shareContent("Bora completar minha rachadinha!", link, title);
  };

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
      <div className="space-y-4">
        <Card>
          <div className="flex items-center justify-between gap-4 mb-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              🎉 {title}
            </h2>
            <div className="text-sm text-gray-500 truncate">{link}</div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
              Meta: <strong>{currency(total)}</strong>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50 border border-green-200">
              Arrecadado: <strong>{currency(totalPaid)}</strong>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200">
              {progress}% completo
            </span>
          </div>

          <div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#9B5DE5]"
                animate={{ width: `${progress}%` }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Falta {currency(Math.max(0, total - totalPaid))} para bater a
              meta.
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="text-sm text-gray-600">
              Pague para a chave PIX abaixo e depois confirme aqui:
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleCopyPixKey}>
                <Copy className="inline-block mr-2" />
                Copiar chave
              </Button>
              <Button variant="primary" onClick={onPaymentClick}>
                Quero pagar também 💸
              </Button>
            </div>
          </div>

          <PaymentList payments={payments} />
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="space-y-3">
          <div className="text-sm text-gray-500 font-medium">Ranking</div>
          {sortedPayments.slice(0, 3).map((payment, index) => (
            <div
              key={`${payment.name}-${index}`}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <div className="font-medium">{payment.name}</div>
              </div>
              <div className="font-semibold">{currency(payment.value)}</div>
            </div>
          ))}
        </Card>

        <Card className="space-y-3">
          <div className="text-sm text-gray-500 font-medium">QR / PIX</div>
          <div className="p-3 rounded-xl bg-gray-50 border border-dashed border-gray-300 text-xs whitespace-pre-wrap">
            {buildPixPayload({
              key: pixKey || "SUA-CHAVE-PIX-AQUI",
              name: title,
              msg: "RACHADINHA",
            })}
          </div>
          <Button variant="outline" onClick={handleCopyPayload}>
            <Copy className="inline-block mr-2" />
            Copiar payload
          </Button>
        </Card>

        <Card className="space-y-2">
          <div className="text-sm text-gray-500">Compartilhar</div>
          <div className="flex gap-2">
            <Button className="flex-1" variant="outline" onClick={handleShare}>
              <Share2 className="inline-block mr-2" />
              WhatsApp
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
