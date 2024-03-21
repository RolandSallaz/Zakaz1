export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const INFOCHAPTER: { name: string; link: string }[] = [
  {
    name: 'Гарантии',
    link: 'guarantees'
  },
  {
    name: 'Соглашение',
    link: 'agreement'
  },
  {
    name: 'Оплата и доставка',
    link: 'payment_and_delivery'
  },
  {
    name: 'Возврат',
    link: 'refund'
  },
  {
    name: 'Контакты',
    link: 'contacts'
  }
];
