import React from 'react';
import * as S from './style';
import { Framework7Icon } from '../../../components';
import { useAuthContext } from '../../../contexts/user/index';
import { useLocation } from 'react-router-dom';
import { setLink } from '../../../utils/functions';

function MenuUserSection(): React.ReactElement {
  const authContext = useAuthContext();
  const location = useLocation();

  return (
    <S.SectionContainer>
      <S.SuggestLink to={setLink('/user/login', location)}>
        {authContext?.state.isAuthorized ? '로그아웃 하기' : '로그인 하기'}
        <Framework7Icon iconName="chevron_right" fontSize={'12px'} />
      </S.SuggestLink>
      <S.UserMenuContainer>
        <S.MenuLink to={setLink('/user/order', location)}>
          <Framework7Icon iconName="list_dash" fontSize={'16px'} />
          <S.UserMenuText>주문내역</S.UserMenuText>
        </S.MenuLink>
        <S.UserMenuBar />
        <S.MenuLink to={setLink('/user/liked', location)}>
          <Framework7Icon iconName="heart_fill" color="var(--red)" fontSize={'16px'} />
          <S.UserMenuText>찜한상품</S.UserMenuText>
        </S.MenuLink>
      </S.UserMenuContainer>
    </S.SectionContainer>
  );
}

export default MenuUserSection;
