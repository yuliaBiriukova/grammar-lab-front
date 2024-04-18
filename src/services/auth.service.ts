import {USER_ROLE_KEY, USER_TOKEN_KEY} from "../constants/localStorageKeys";
import {
    getItemFromLocalStorage,
    removeItemFromLocalStorage,
    setItemInLocalStorage
} from "../utils/helpers/localStorage.helper";
import {UserRoleString} from "../utils/enums/auth/UserRoleString";

export const checkIsUserAuthenticated = () => {
    return !!getItemFromLocalStorage(USER_TOKEN_KEY);
}

export const getCurrentUserRoles = () => {
    return getItemFromLocalStorage(USER_ROLE_KEY);
}

export const checkUserHasRole = (role: UserRoleString) => {
    const userRoles = getCurrentUserRoles();
    return !!userRoles && userRoles.includes(role);
}

export const getAccessToken = () => {
    return getItemFromLocalStorage(USER_TOKEN_KEY);
}

export const logout = () => {
    removeItemFromLocalStorage(USER_TOKEN_KEY);
    removeItemFromLocalStorage(USER_ROLE_KEY);
}

export const login = (props: { userToken: string, userRole: string }) => {
    setItemInLocalStorage(USER_TOKEN_KEY, props.userToken);
    setItemInLocalStorage(USER_ROLE_KEY, props.userRole);
}