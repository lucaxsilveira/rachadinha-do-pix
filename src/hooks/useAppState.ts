import { useCallback, useMemo, useReducer } from "react";
import type { AppState, Payment, PaymentForm, Step, ThanksInfo } from "@/types";
import {
  getRandomEmoji,
  playNotificationSound,
  slugify,
} from "@/utils/helpers";

type AppAction =
  | { type: "SET_STEP"; payload: Step }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_TOTAL"; payload: number }
  | { type: "SET_PIX_KEY"; payload: string }
  | { type: "SET_LINK"; payload: string }
  | { type: "ADD_PAYMENT"; payload: Payment }
  | { type: "RESET_FORM" };

const initialState: AppState = {
  step: "create",
  title: "Festa do Piquenique",
  total: 300,
  pixKey: "",
  link: "",
  payments: [
    {
      name: "Biel",
      value: 50,
      note: "Foi só a picanha 🥩",
      at: new Date(),
      emoji: "🥩",
    },
    {
      name: "João",
      value: 20,
      note: "Eu só tomei coca 🥤",
      at: new Date(),
      emoji: "🥤",
    },
  ],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_TOTAL":
      return { ...state, total: action.payload };
    case "SET_PIX_KEY":
      return { ...state, pixKey: action.payload };
    case "SET_LINK":
      return { ...state, link: action.payload };
    case "ADD_PAYMENT":
      return { ...state, payments: [...state.payments, action.payload] };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

export function useAppState() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const totalPaid = useMemo(
    () => state.payments.reduce((sum, payment) => sum + payment.value, 0),
    [state.payments],
  );

  const progress = useMemo(
    () => Math.min(100, Math.round((totalPaid / (state.total || 1)) * 100)),
    [totalPaid, state.total],
  );

  const sortedPayments = useMemo(
    () => [...state.payments].sort((a, b) => b.value - a.value),
    [state.payments],
  );

  const createRachadinha = useCallback(() => {
    if (!state.pixKey) {
      alert("Coloque sua chave PIX antes de criar!");
      return;
    }
    const slug = slugify(state.title);
    const link = `https://rachadinhapix.app/${slug}`;
    dispatch({ type: "SET_LINK", payload: link });
    dispatch({ type: "SET_STEP", payload: "public" });
  }, [state.pixKey, state.title]);

  const addPayment = useCallback((form: PaymentForm): ThanksInfo => {
    const emoji = getRandomEmoji();
    const note = form.note || `Contribuí com alegria ${emoji}`;

    const payment: Payment = {
      name: form.name,
      value: form.value,
      note,
      at: new Date(),
      emoji,
    };

    playNotificationSound();
    dispatch({ type: "ADD_PAYMENT", payload: payment });

    return { name: form.name, value: form.value };
  }, []);

  const actions = {
    setStep: (step: Step) => dispatch({ type: "SET_STEP", payload: step }),
    setTitle: (title: string) =>
      dispatch({ type: "SET_TITLE", payload: title }),
    setTotal: (total: number) =>
      dispatch({ type: "SET_TOTAL", payload: total }),
    setPixKey: (pixKey: string) =>
      dispatch({ type: "SET_PIX_KEY", payload: pixKey }),
    createRachadinha,
    addPayment,
    reset: () => dispatch({ type: "RESET_FORM" }),
  };

  return {
    ...state,
    totalPaid,
    progress,
    sortedPayments,
    actions,
  };
}
