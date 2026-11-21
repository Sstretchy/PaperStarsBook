// Все цены сайта в одном месте. Меняйте числа здесь — тексты и калькулятор подтянут их сами.

export type TierId = 'economy' | 'standard' | 'premium';

// «Обложка и сюжет» — одинаково для всех тарифов. Это же сумма предоплаты.
export const BASE_PRICE = 15000;
export const DEPOSIT = BASE_PRICE;

export const TIERS: { id: TierId; base: number; perSheet: number }[] = [
  { id: 'economy', base: BASE_PRICE, perSheet: 3000 },
  { id: 'standard', base: BASE_PRICE, perSheet: 4500 },
  { id: 'premium', base: BASE_PRICE, perSheet: 6500 },
];

export const MIN_SHEETS = 8;
export const MAX_SHEETS = 30;
export const PRINT_PER_SHEET = 1000;

export function workPrice(tierId: TierId, sheets: number) {
  const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[0];
  return tier.base + Math.max(sheets, MIN_SHEETS) * tier.perSheet;
}

export function printPrice(sheets: number) {
  return Math.max(sheets, MIN_SHEETS) * PRINT_PER_SHEET;
}

export function formatAmount(value: number) {
  return value.toLocaleString('ru-RU');
}

// Подставляет сумму предоплаты вместо {deposit} в текстах.
export function withDeposit(text: string, currency: string) {
  return text.replace('{deposit}', `${formatAmount(DEPOSIT)} ${currency}`);
}
