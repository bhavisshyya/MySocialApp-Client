import React from "react";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorageManager";
import {Outlet, Navigate} from 'react-router-dom'


function RequireUser() {
  const user = getItem(KEY_ACCESS_TOKEN); // user ma user ka acess token store hoga

  return (user ? <Outlet /> : <Navigate to='/login' />);
}

export default RequireUser;
