import React, { useState } from 'react';
import Modal from 'react-modal';
import * as S from './style';
import { Product } from '../../../types/data';
import { makeComma } from '../../../utils/functions';
import { COUNTER_KEY } from '../../../commons/constants';
import { SectionDivider, QuantityCoutner } from '../../../components';

const customStyle = {
  overlay: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'rgba(0,0,0,0.16)',
    zIndex: 100,
    opacity: 1,
  },

  content: {
    width: '100%',
    height: '64vw',
    top: 'auto',
    right: 'auto',
    left: 'auto',
    bottom: 0,
    background: 'var(--white)',
    padding: 0,
    borderRadius: '4vw 4vw 0vw 0vw',
  },
};

interface Props {
  product: Product;
  isOpen: boolean;
  onCartModalVisible: () => void;
  onAddCart: (product: Product, count: number) => void;
}
function AddCartModal(props: Props) {
  const { product, isOpen, onCartModalVisible, onAddCart } = props;
  const { id, title, imageUrl, quantity, price } = product;
  const [count, setCount] = useState(1);

  const handleCount = (type: 'plus' | 'minus') => {
    if (type === COUNTER_KEY.PLUS) {
      return count !== quantity && setCount(count + 1);
    }
    return count !== 1 && setCount(count - 1);
  };

  const calculateTotalPrice = (count: number) => makeComma(count * price) + '원';

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={500}
      style={customStyle}
      onRequestClose={onCartModalVisible}
    >
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        <S.CloseButton onClick={onCartModalVisible}>닫기</S.CloseButton>
      </S.TitleContainer>
      <SectionDivider />
      <S.MainContainer>
        <S.Image src={imageUrl} />
        <S.DescriptionContainer>
          <S.DesciptionTitle>{title}</S.DesciptionTitle>
          <S.DesciptionQuantity>최대 구매수량 {quantity} 개</S.DesciptionQuantity>
          <S.DescriptionPrice>{makeComma(price)} 원</S.DescriptionPrice>
        </S.DescriptionContainer>
        <QuantityCoutner count={count} setCount={handleCount} />
      </S.MainContainer>
      <S.CardAddButton onClick={() => onAddCart(product, count)}>
        장바구니 담기 <S.TotalPrice>{calculateTotalPrice(count)}</S.TotalPrice>
      </S.CardAddButton>
    </Modal>
  );
}

export default AddCartModal;
