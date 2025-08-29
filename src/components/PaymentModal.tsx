import { Check, Copy, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import type { PaymentForm } from "@/types";
import { copyToClipboard, currency } from "@/utils/helpers";

interface PaymentModalProps {
  isOpen: boolean;
  pixKey: string;
  onClose: () => void;
  onSubmit: (form: PaymentForm) => void;
}

export default function PaymentModal({
  isOpen,
  pixKey,
  onClose,
  onSubmit,
}: PaymentModalProps) {
  const [form, setForm] = useState<PaymentForm>({
    value: 20,
    name: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.name || !form.value) return;

    setIsSubmitting(true);
    try {
      onSubmit(form);
      setForm({ value: 20, name: "", note: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyPixKey = async () => {
    await copyToClipboard(pixKey);
    alert("Chave copiada!");
  };

  const quickValues = [20, 50, 100];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-semibold">Quanto você vai pagar?</div>
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          {quickValues.map((value) => (
            <Button
              key={value}
              variant={form.value === value ? "primary" : "outline"}
              onClick={() => setForm({ ...form, value })}
            >
              {currency(value)}
            </Button>
          ))}
          <Input
            className="w-28"
            type="number"
            min={1}
            placeholder="Outro"
            value={form.value}
            onChange={(e) =>
              setForm({ ...form, value: Number(e.target.value) })
            }
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="paymentName">Seu nome/apelido</Label>
          <Input
            id="paymentName"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ex: Lucas"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="paymentNote">Comentário</Label>
          <Input
            id="paymentNote"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Ex: Participei só da entrada 🍟"
          />
        </div>

        <div className="text-xs text-gray-500 mb-3">
          ⚠️ Transfira para a chave PIX:{" "}
          <span className="font-semibold">{pixKey || "SUA-CHAVE-PIX"}</span>{" "}
          antes de confirmar.
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1"
            variant="success"
            onClick={handleSubmit}
            disabled={isSubmitting || !form.name || !form.value}
          >
            <Check className="inline-block mr-2" />
            {isSubmitting ? "Confirmando..." : "Confirmar pagamento"}
          </Button>

          <Button
            className="flex-1"
            variant="outline"
            onClick={handleCopyPixKey}
          >
            <Copy className="inline-block mr-2" />
            Copiar chave PIX
          </Button>
        </div>
      </div>
    </div>
  );
}
