import React, { useState } from 'react';
import * as S from './style';
import { Framework7Icon } from '../..';
import { useLocation } from 'react-router-dom';
import { isEmpty } from '../../../utils/validation';
import { KEYBOARD } from '../../../commons/constants';
interface Props {
  isSearchPage?: boolean;
  presetTitle?: string;
  history: any;
  createSearch: Function;
}

function SearchBar({
  isSearchPage = true,
  presetTitle,
  createSearch,
  history,
}: Props): React.ReactElement {
  const location = useLocation();
  const [title, setTitle] = useState(presetTitle ?? '');
  const isFromSearchPage = history[history.length - 2]?.location === '/search';

  function onSearchIconClick() {
    if (title.length === 0 || !isSearchPage) return;
    createSearch(title);
    history.push(`/search/${title}`, { from: location });
  }

  function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const $target = event.target as HTMLInputElement;
    if (isEmpty($target.value) || event.key !== KEYBOARD.ENTER) {
      return;
    }
    onSearchIconClick();
  }

  return (
    <S.SearchBar
      onClick={() => {
        if (isSearchPage) return;
        isFromSearchPage ? history.goBack() : history.push('/search', { from: location });
      }}
    >
      <S.IconContainer
        onClick={() => (location.state ? history.goBack() : history.push('/', { from: location }))}
      >
        <Framework7Icon iconName="arrow_left" fontSize={'5.333vw'} />
      </S.IconContainer>
      <S.Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyUp={onKeyUp}
        placeholder={'어떤 상품을 찾으시나요?'}
        autoFocus={isSearchPage}
      ></S.Input>
      <S.IconContainer onClick={() => onSearchIconClick()}>
        <Framework7Icon iconName="search" fontSize={'5.333vw'} />
      </S.IconContainer>
    </S.SearchBar>
  );
}

export default SearchBar;
