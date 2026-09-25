import type { Product } from '../types/product';

/** "-19%" when the catalog has a real old price, otherwise null. */
export function discountPercent(price: number, oldPrice?: number) {
  if (oldPrice === undefined || oldPrice <= price) return null;

  const percent = Math.round((1 - price / oldPrice) * 100);
  return percent > 0 ? percent : null;
}

const baseUnitLabel: Record<Product['unit'], string> = {
  г: 'кг',
  мл: 'л',
  шт: 'шт',
};

/**
 * Grocery prices are compared per kilo/litre/piece, so the grid shows the
 * comparable figure next to the shelf price. Derived from existing fields only.
 */
export function unitPriceLabel(product: Product) {
  const { price, value, unit } = product;
  if (value <= 0) return null;

  const baseAmount = unit === 'шт' ? value : value / 1000;
  if (baseAmount <= 0) return null;

  return `${Math.round(price / baseAmount)} ₽/${baseUnitLabel[unit]}`;
}

export type StockNote = {
  tone: 'danger' | 'warning';
  label: string;
};

/**
 * Warehouse counts are noise in a grid. Show only what changes the decision:
 * "нет в наличии" or a low-stock warning.
 *
 * The count is measured in packages, not in the product's own unit — "осталось
 * 3 шт.", never "осталось 3 г" for a 600 g pack.
 */
export function stockNote(product: Product, lowStockThreshold = 5): StockNote | null {
  if (!product.isAvailable || product.stock <= 0) {
    return { tone: 'danger', label: 'Нет в наличии' };
  }

  if (product.stock <= lowStockThreshold) {
    return { tone: 'warning', label: `Осталось ${product.stock} шт.` };
  }

  return null;
}
