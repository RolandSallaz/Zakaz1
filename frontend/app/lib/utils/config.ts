export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const INFOCHAPTER = {
  guarantees: {
    name: "Гарантии",
    link: "guarantees",
  },
  agreement: {
    name: "Соглашение",
    link: "agreement",
  },
  payment_and_delivery: {
    name: "Оплата и доставка",
    link: "payment_and_delivery",
  },
  refund: {
    name: "Возврат",
    link: "refund",
  },
  contacts: {
    name: "Контакты",
    link: "contacts",
  },
};
