import React, { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import DefaultTemplate from '../Default';
import {
  SectionDivider,
  BannerSlider,
  PageHeader,
  HotDealSection,
  ProductSection,
  CategoryProductSection,
  CategoryIconGrid,
  CartBadge,
  BindPullEvent,
} from '../../components';
import useProducts, { toggleProductIsLikedDispatcher, FILTER_TYPE } from '../../hooks/useProducts';
import {
  MAIN_BANNERS,
  MID_BANNERS,
  SORT_BY,
  VIEW_TYPE_GRID,
  VIEW_TYPE_LISTVIEW,
  ERROR_STATUS,
} from '../../commons/constants';
import { getCategories, getProducts } from '../../apis';
import { Category, CategoryProducts } from '../../types/data';
import { storage } from '../../utils/storage';
import { useAuthContext } from '../../contexts/user';
import { getTomorrowDatetime } from '../../utils/functions';

function MainPage({ history, location }: RouteComponentProps): React.ReactElement {
  const userContext = useAuthContext();
  const expiredHotDealDate = getTomorrowDatetime();
  const [categories, setCategories] = useState<Category[]>([]);
  const [{ products: hotDealProducts, status: hotDealStatus }] = useProducts({
    limit: 4,
    sortBy: SORT_BY.DISCOUNTEDRATE,
  });

  const [{ products: eatNowProducts, status: eatNowStatus }, eatNowProductsDispatch] = useProducts({
    categoryId: 7,
    limit: 6,
  });
  const [{ products: forYouProducts, status: forYouStatus }, forYouProductsDispatch] = useProducts({
    type: FILTER_TYPE.RECOMMEND,
  });

  const [
    { products: bestSellerProducts, status: bestSellerStatus },
    bestSellerProductsDispatch,
  ] = useProducts({ type: FILTER_TYPE.BESTSELLER });

  const [cartCount] = useState(storage.getProductTotalCount()); // 장바구니에 렌더할 Product Count 개수
  const [categoryProducts, setCategoryProducts] = useState<CategoryProducts[]>([]);
  const isMounted = useRef(true);

  useEffect(() => {
    setCategoryProducts(categories.map((category) => ({ category, products: [] })));

    categories.forEach((category: Category) => {
      getProducts({ limit: 8, categoryId: category.id }).then(({ data: products }) => {
        if (!isMounted.current) return;
        setCategoryProducts((categoryProducts) => {
          const updatedCategoryProducts = [...categoryProducts];
          const index = updatedCategoryProducts.findIndex(
            (item) => item.category.id === category.id,
          );
          updatedCategoryProducts[index].products = products;
          return updatedCategoryProducts;
        });
      });
    });
  }, [categories]);

  useEffect(() => {
    getCategories().then(({ data: categories }) => {
      if (!isMounted.current) return;
      setCategories(categories);
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (
      forYouStatus === ERROR_STATUS.UNAUTHORIZED ||
      hotDealStatus === ERROR_STATUS.UNAUTHORIZED ||
      eatNowStatus === ERROR_STATUS.UNAUTHORIZED ||
      bestSellerStatus === ERROR_STATUS.UNAUTHORIZED
    ) {
      history.push('/user/login', { from: location });
    }
  }, [forYouStatus, hotDealStatus, eatNowStatus, bestSellerStatus]);

  return (
    <DefaultTemplate>
      <PageHeader isHome={true} />
      <BindPullEvent>
        <BannerSlider banners={MAIN_BANNERS} />
        <CategoryIconGrid categories={categories} />
        <SectionDivider />
        <ProductSection
          {...{
            products: eatNowProducts ?? [],
            viewType: VIEW_TYPE_GRID,
            columns: 3,
            header: {
              title: '지금 뭐먹지?',
              description: '#간식시간',
            },
            onLikeIconClick: toggleProductIsLikedDispatcher(eatNowProductsDispatch),
          }}
        />
        <SectionDivider />
        <HotDealSection
          {...{
            products: hotDealProducts ?? [],
            expiredDate: expiredHotDealDate,
          }}
        />
        <SectionDivider />
        {userContext?.state.isAuthorized && (
          <ProductSection
            {...{
              products: forYouProducts ?? [],
              viewType: VIEW_TYPE_LISTVIEW,
              columns: 2.5,
              header: {
                title: `${userContext?.state.nickname}님을 위해 준비한 상품`,
              },
              onLikeIconClick: toggleProductIsLikedDispatcher(forYouProductsDispatch),
            }}
          />
        )}
        <SectionDivider />
        <ProductSection
          {...{
            products: bestSellerProducts ?? [],
            viewType: VIEW_TYPE_LISTVIEW,
            columns: 2.5,
            header: {
              title: '요즘 잘 팔려요',
            },
            onLikeIconClick: toggleProductIsLikedDispatcher(bestSellerProductsDispatch),
          }}
        />
        <SectionDivider />
        <BannerSlider banners={MID_BANNERS} />
      </BindPullEvent>
      <CategoryProductSection categoryProducts={categoryProducts} />
      <CartBadge count={cartCount} />
    </DefaultTemplate>
  );
}

export default MainPage;
