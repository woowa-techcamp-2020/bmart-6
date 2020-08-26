import React, { useMemo } from 'react';
import { FORM_ERROR } from 'final-form';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'querystring';
import { UserLogin } from '../../types/data';
import { useAuthContext } from '../../contexts/user';
import * as userActions from '../../contexts/user/actions';
import * as userApis from '../../apis/user';
import { LoginSection, UserHeader } from '../../components';
import { ERROR_STATUS, ERROR_MESSAGE, STORAGE_KEY } from '../../commons/constants';
import { storage } from '../../utils/storage';

function getUrlByPrevPage(prevPage: string | null) {
  switch (prevPage) {
    case 'cart':
      return '/cart';
    default:
      return '/';
  }
}

function LoginPage({ history, location }: RouteComponentProps) {
  const userContext = useAuthContext();
  const { search } = location;

  const prevPage = useMemo(() => {
    const query = queryString.parse(search)['?prevPage'] as string;
    if (query) return query;
    return null;
  }, [search]); // 현재는 CartPage만

  const onSubmitLogin = async (values: UserLogin) => {
    if (userContext === null) {
      return;
    }
    try {
      const { data } = await userApis.loginUser(values);
      storage.set(STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
      userContext.setAction(userActions.setLoginSuccess());
      history.push(getUrlByPrevPage(prevPage));
    } catch (e) {
      if (e.response.status === ERROR_STATUS.UNAUTHORIZED) {
        // 비밀번호 틀림
        return { [FORM_ERROR]: ERROR_MESSAGE.LOGIN_FAILED };
      }
    }
  };

  return (
    <>
      <UserHeader />
      <LoginSection onSubmit={onSubmitLogin} />
    </>
  );
}

export default LoginPage;