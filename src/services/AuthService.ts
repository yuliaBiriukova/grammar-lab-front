import {USER_ROLE_KEY, USER_TOKEN_KEY} from "../constants/localStorageKeys";
import {LocalStorageHelper} from "../utils/helpers/LocalStorageHelper";
import {UserRole} from "../utils/enums/auth/UserRole";

export class AuthService {
    public static checkIsAuthenticated= () => {
        return !!LocalStorageHelper.get(USER_TOKEN_KEY);
    }

    public static getUserRoles = () => {
        return LocalStorageHelper.get(USER_ROLE_KEY);
    }

    public static checkHasRole = (role: UserRole) => {
        const userRoles = this.getUserRoles();
        return !!userRoles && userRoles.includes(role);
    }

    static getToken = () => {
        return LocalStorageHelper.get(USER_TOKEN_KEY);
    }

    static logout() {
        LocalStorageHelper.remove(USER_TOKEN_KEY);
        LocalStorageHelper.remove(USER_ROLE_KEY);
    }

    static login(props: { userToken: string, userRole: string }) {
        LocalStorageHelper.set(USER_TOKEN_KEY, props.userToken);
        LocalStorageHelper.set(USER_ROLE_KEY, props.userRole);
    }
}