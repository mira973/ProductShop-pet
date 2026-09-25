import type { TextStyle } from 'react-native';

/**
 * The one visual system for shopProduct.
 *
 * Three layers, so components never carry raw values:
 *   primitive -> semantic -> component
 *
 * Rules the palette follows:
 * - the page is almost white, content surfaces are pure white;
 * - grey is the interactive surface (search field, category tiles, counters);
 * - green is an accent only: active state, primary CTA, discount and stock;
 * - green used on a surface with white text is `accent` (#15803D, 5.0:1);
 *   the lighter `accentTint` is only ever a background, never a text colour.
 */

/* ------------------------------------------------------------------ *
 * 1. Primitive tokens
 * ------------------------------------------------------------------ */

const primitive = {
  white: '#FFFFFF',

  ink900: '#14161A',
  ink600: '#5A6068',
  ink400: '#9AA0A8',

  grayBg: '#FAFAFB',
  gray100: '#F1F2F4',
  gray150: '#E9EAEE',
  gray200: '#DFE1E6',

  green50: '#E7F5EC',
  green100: '#CBE7D6',
  green600: '#1B8A4B',
  green700: '#15803D',
  green900: '#14532D',

  red700: '#B91C1C',
  red50: '#FCEBEA',

  amber700: '#B45309',
  amber50: '#FDF3E3',
} as const;

/* ------------------------------------------------------------------ *
 * 2. Semantic tokens
 * ------------------------------------------------------------------ */

export const color = {
  /** Page background: almost white, keeps white cards readable. */
  background: primitive.grayBg,
  /** Cards, panels, the bottom purchase block. */
  surface: primitive.white,
  /** Interactive grey: search field, tiles, counters. */
  surfaceSunken: primitive.gray100,

  textPrimary: primitive.ink900,
  textSecondary: primitive.ink600,
  textMuted: primitive.ink400,

  border: primitive.gray150,
  borderStrong: primitive.gray200,

  /** Solid green for CTA and active text (white text on it passes AA). */
  accent: primitive.green700,
  onAccent: primitive.white,
  /** Soft green as a background only. */
  accentTint: primitive.green50,
  accentTintBorder: primitive.green100,
  onAccentTint: primitive.green900,
  /** Muted green for decorative accents that are not text. */
  accentSoft: primitive.green600,

  positive: primitive.green700,
  danger: primitive.red700,
  dangerTint: primitive.red50,
  warning: primitive.amber700,
  warningTint: primitive.amber50,
} as const;

/* ------------------------------------------------------------------ *
 * 3. Scale tokens
 * ------------------------------------------------------------------ */

/** 4pt spacing scale. Nothing outside it should appear in a screen. */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  pill: 999,
} as const;

/** Tabular figures keep prices and counters from shifting as digits change. */
export const tabularNums: Pick<TextStyle, 'fontVariant'> = {
  fontVariant: ['tabular-nums'],
};

/* ------------------------------------------------------------------ *
 * 4. Component tokens
 * ------------------------------------------------------------------ */

export const text = {
  /** Kept for screens outside this pass that still use it. */
  screenTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    color: color.textPrimary,
  },
  sectionTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: color.textPrimary,
  },
  /** Small muted label above a control, e.g. "Поиск". */
  fieldLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    color: color.textSecondary,
  },
  input: {
    fontSize: 16,
    lineHeight: 20,
    color: color.textPrimary,
  },
  tileTitle: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '600',
    color: color.textPrimary,
  },
  tileTitleActive: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '700',
    color: color.onAccentTint,
  },
  tileCount: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: color.textMuted,
  },
  tileCountActive: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: color.accent,
  },
  productName: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: color.textPrimary,
  },
  productPrice: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
    color: color.textPrimary,
  },
  productOldPrice: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    color: color.textMuted,
    textDecorationLine: 'line-through',
  },
  meta: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    color: color.textSecondary,
  },
  micro: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: color.textMuted,
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  quantity: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: color.textPrimary,
  },
} satisfies Record<string, TextStyle>;

/**
 * Shared metrics. The tab bar numbers also drive how much room scrolling
 * content leaves at the bottom, so the bar never sits on top of a card.
 */
export const layout = {
  screenPadding: space.xl,
  cardGap: space.md,
  /** Category grid: three tiles per row with an 12px gutter. */
  categoryColumns: 3,
  categoryGap: space.md,
  categoryTileMinHeight: 64,
  /** Product cards per row, as specified. */
  productColumns: 2,
  maxContentWidth: 720,
  tabBarHeight: 66,
  tabBarMinBottomGap: space.lg,
  contentBottomGap: space.xxl,
} as const;

export function tabBarBottomGap(safeAreaBottom: number) {
  return Math.max(safeAreaBottom, layout.tabBarMinBottomGap);
}

export function tabBarTopOffset(safeAreaBottom: number) {
  return tabBarBottomGap(safeAreaBottom) + layout.tabBarHeight;
}

/** What a scrollable tab content area must leave free at the bottom. */
export function scrollBottomInset(safeAreaBottom: number) {
  return tabBarTopOffset(safeAreaBottom) + layout.contentBottomGap;
}

/** Touch targets: 44pt on iOS, 48dp on Android. */
export const minTouchTarget = {
  ios: 44,
  android: 48,
  web: 44,
} as const;

/** Russian plural picker: 1 товар / 2 товара / 5 товаров. */
export function plural(count: number, one: string, few: string, many: string) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

/** "1 товар" / "3 товара" / "12 товаров". */
export function productCountLabel(count: number) {
  return `${count} ${plural(count, 'товар', 'товара', 'товаров')}`;
}
