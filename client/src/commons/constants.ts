export const POPULAR = 'mostpopular';
export const PRICEUP = 'priceup';
export const PRICEDOWN = 'pricedown';
export const NEW = 'new';
export const DISCOUNTEDRATE = 'discountedRate';

export const SORTOPTIONS: {
  [key: string]: string | undefined;
} = {
  '기본 정렬순': undefined,
  '인기 상품순': POPULAR,
  '높은 가격순': PRICEUP,
  '낮은 가격순': PRICEDOWN,
  '신규 상품순': NEW,
  '할인율 순': DISCOUNTEDRATE,
};