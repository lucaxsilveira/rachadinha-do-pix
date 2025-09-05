"use client";

import { useState } from "react";
import CreateStep from "@/components/CreateStep";
import Header from "@/components/Header";
import PaymentModal from "@/components/PaymentModal";
import PublicStep from "@/components/PublicStep";
import ThanksStep from "@/components/ThanksStep";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import ConfettiEffect from "@/components/ui/ConfettiEffect";
import EmojiFloatingEffect from "@/components/ui/EmojiFloatingEffect";
import { useAppState } from "@/hooks/useAppState";
import type { ThanksInfo } from "@/types";

/**
 * Rachadinha PIX — Refactored App
 *
 * Modern React application following current best practices:
 * - TypeScript with proper typing
 * - Component separation and single responsibility
 * - Custom hooks for state management
 * - Performance optimizations with memoization
 * - Accessibility improvements
 * - Clean architecture with utils separation
 */

export default function RachadinhaPIX() {
  const {
    step,
    title,
    total,
    pixKey,
    link,
    payments,
    totalPaid,
    progress,
    sortedPayments,
    actions,
  } = useAppState();

  // UI state
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [thanksInfo, setThanksInfo] = useState<ThanksInfo>({
    name: "",
    value: 0,
  });
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [emojiEffects, setEmojiEffects] = useState<
    Array<{ id: number; emoji: string }>
  >([]);

  const handlePaymentSubmit = (form: {
    value: number;
    name: string;
    note: string;
  }) => {
    const thanksData = actions.addPayment(form);

    // Trigger visual effects
    setConfettiVisible(true);
    setEmojiEffects((prev) => [...prev, { id: Date.now(), emoji: "🎉" }]);

    // Clean up effects after animation
    setTimeout(() => {
      setConfettiVisible(false);
      setEmojiEffects((prev) => prev.slice(1));
    }, 2500);

    setPayModalOpen(false);
    setThanksInfo(thanksData);
    actions.setStep("thanks");
  };

  const renderStep = () => {
    switch (step) {
      case "create":
        return (
          <CreateStep
            title={title}
            total={total}
            pixKey={pixKey}
            totalPaid={totalPaid}
            onTitleChange={actions.setTitle}
            onTotalChange={actions.setTotal}
            onPixKeyChange={actions.setPixKey}
            onSubmit={actions.createRachadinha}
          />
        );

      case "public":
        return (
          <PublicStep
            title={title}
            total={total}
            pixKey={pixKey}
            link={link}
            payments={payments}
            totalPaid={totalPaid}
            progress={progress}
            sortedPayments={sortedPayments}
            onPaymentClick={() => setPayModalOpen(true)}
          />
        );

      case "thanks":
        return (
          <ThanksStep
            thanksInfo={thanksInfo}
            link={link}
            title={title}
            onBackToPublic={() => actions.setStep("public")}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF1F5] text-[#222]">
      {/* <BackgroundGradientAnimation> */}
      {/* <div className="h-full bg-custom absolute top-0 left-0 w-full"></div>
      <div className="h-full bg-white/30 backdrop-blur-lg absolute top-0 left-0 w-full z-10"></div> */}

      <main className="max-w-4xl mx-auto p-8 space-y-6 relative h-screen relative z-20 ">
        <ConfettiEffect isVisible={confettiVisible} />
        <EmojiFloatingEffect emojis={emojiEffects} />

        {renderStep()}

        <PaymentModal
          isOpen={payModalOpen}
          pixKey={pixKey}
          onClose={() => setPayModalOpen(false)}
          onSubmit={handlePaymentSubmit}
        />
      </main>
    </div>
  );
}
