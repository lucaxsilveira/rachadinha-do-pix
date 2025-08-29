export interface Payment {
  name: string;
  value: number;
  note: string;
  at: Date;
  emoji: string;
}

export type Step = "create" | "public" | "thanks";

export interface AppState {
  step: Step;
  title: string;
  total: number;
  pixKey: string;
  link: string;
  payments: Payment[];
}

export interface PaymentForm {
  value: number;
  name: string;
  note: string;
}

export interface ThanksInfo {
  name: string;
  value: number;
}

export interface PixPayload {
  name?: string;
  city?: string;
  key: string;
  amount?: string;
  msg?: string;
}
