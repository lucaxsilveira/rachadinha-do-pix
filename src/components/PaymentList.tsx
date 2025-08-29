import { motion } from "framer-motion";
import type { Payment } from "@/types";
import { currency } from "@/utils/helpers";

interface PaymentListProps {
  payments: Payment[];
}

export default function PaymentList({ payments }: PaymentListProps) {
  if (payments.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        Seja o primeiro a pagar e aparecer no mural! 🎉
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {payments.map((payment, index) => (
        <motion.div
          key={`${payment.name}-${payment.at.getTime()}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.08 }}
          className="flex items-start gap-3 p-3 rounded-xl border border-gray-200"
        >
          <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-100 text-lg">
            {payment.emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{payment.name}</div>
              <div className="text-[#00BB84] font-bold">
                {currency(payment.value)}
              </div>
            </div>
            <div className="text-sm text-gray-600">{payment.note}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
