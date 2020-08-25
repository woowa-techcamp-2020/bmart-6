import React, { useState, useEffect } from 'react';
import * as S from './style';
import DefaultTemplate from '../Default';
import {
  ProductCardGridHeader,
  SubcategoryCardGrid,
  ProductCardGrid,
  PageHeader,
  BannerSlider,
  SectionDivider,
  ProductSection,
} from '../../components';
import useProducts from '../../hooks/useProducts';
import { getProducts } from '../../hooks/useProducts/actions';
import {
  SORTOPTIONS,
  BANNERS,
  DEFAULT_SORT_OPTION,
  VIEW_TYPE_LISTVIEW,
} from '../../commons/constants';
import { RouteComponentProps } from 'react-router-dom';
import { getSubcategories } from '../../apis/category';

interface Params {
  categoryId: string;
}

function CategoryPage({ match: { params } }: RouteComponentProps<Params>): React.ReactElement {
  const [subcategories, setSubcategories] = useState([]);
  const [{ products }, productDispatch] = useProducts({ categoryId: +params.categoryId });
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_OPTION);

  useEffect(() => {
    getSubcategories(+params.categoryId).then((res) => setSubcategories(res.data));
  }, [params.categoryId]);

  function changeSort(sortBy: string) {
    productDispatch(
      getProducts({
        categoryId: +params.categoryId,
        ...(sortBy && { sortBy: SORTOPTIONS[sortBy] }),
      }),
    );
    setSortBy(sortBy);
  }

  return (
    <DefaultTemplate>
      <PageHeader isHome={false} />
      <BannerSlider banners={BANNERS} />
      <SubcategoryCardGrid subcategories={subcategories} />
      <SectionDivider />
      <ProductSection
        {...{
          header: {
            title: '이 상품 어때요?',
          },
          products: products ?? [],
          viewType: VIEW_TYPE_LISTVIEW,
          columns: 2.5,
        }}
      />
      <SectionDivider />
      <S.ProductCardGridHeaderContainer>
        {<ProductCardGridHeader sortBy={sortBy} changeSort={changeSort} />}
      </S.ProductCardGridHeaderContainer>
      <S.ProductCardGridContainer>
        {products && <ProductCardGrid products={products} columns={2} />}
      </S.ProductCardGridContainer>
    </DefaultTemplate>
  );
}

export default CategoryPage;
