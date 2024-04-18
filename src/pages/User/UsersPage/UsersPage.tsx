import {Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import {UserRole} from "../../../models/User/UserRole";
import {userRoleGroupsDisplayNames} from "../../../constants/userRoleGroupsDisplayNames";
import {routes} from "../../../constants/routes";
import {ButtonStyled} from "../../../components/common/Button/ButtonStyled";
import {ButtonVariant} from "../../../utils/enums/button/ButtonVariant";
import {UserFilter} from "../../../models/Filters/UserFilter";
import {User} from "../../../models/User/User";
import {deleteUserByIdAsync, getUsersAsync} from "../../../services/user.service";
import {DataTable} from "../../../components/common/DataTable/DataTable";
import {GridColDef} from "@mui/x-data-grid";
import {Delete, Edit} from "@mui/icons-material";
import {MoreDropDownMenu} from "../../../components/common/DropDown/MoreDropDownMenu";
import {MenuOption} from "../../../models/MenuOption";

export const UsersPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedRoleIndex = queryParams.get('role');
    const [roleIndex, setRoleIndex] = useState<UserRole>();
    const [roleDisplayName, setRoleDisplayName] = useState('');
    const [users, setUsers] = useState<User[]>();

    const navigate = useNavigate();

    useEffect(() => {
        if(selectedRoleIndex) {
            const selectedRoleIndexInt = parseInt(selectedRoleIndex);
            const displayName = userRoleGroupsDisplayNames[selectedRoleIndexInt];
            if(selectedRoleIndexInt && displayName) {
                setRoleIndex(selectedRoleIndexInt);
                setRoleDisplayName(displayName);
            } else {
                navigate(routes.users.all);
            }
        } else {
            setRoleDisplayName('Усі користувачі');
            setRoleIndex(undefined);
        }
    }, [selectedRoleIndex]);

    useEffect(() => {
         const fetchUsers = async (filter: UserFilter) => {
            const usersData = await getUsersAsync(filter);

            if(!usersData) {
                navigate(routes.home);
                return;
            }

            setUsers(usersData);
        };

        let filter: UserFilter = {};
        if(roleIndex) {
            filter.userRole = roleIndex;
        }

        fetchUsers(filter);
    }, [roleIndex]);

    const handleDeleteClick = async (id: string) => {
        const isSuccess = await deleteUserByIdAsync(id);
        if (isSuccess && users) {
            setUsers(users.filter(user => user.id !== id));
        }
    }

    const getMoreOptions = (id: string): MenuOption[] => {
        return [
            {
                name: 'Редагувати',
                link: routes.users.edit.url(id),
                icon: <Edit/>
            },
            {
                name: 'Видалити',
                icon: <Delete/>,
                onClick: () => handleDeleteClick(id),
            }
        ];
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: '№',
            width: 64,
            /*renderCell: params => params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,*/
        },
        {
            field: 'email',
            headerName: 'Логін',
            flex: 1,
        },
        {
            field: 'firstName',
            headerName: 'Ім\'я',
            width: 152,
            renderCell: params => params.row.firstName ? params.row.firstName : '-',
        },
        {
            field: 'lastName',
            headerName: 'Прізвище',
            width: 152,
            renderCell: params => params.row.lastName ? params.row.lastName : '-',
        },
        {
            field: 'level',
            headerName: 'Рівень',
            width: 104,
            renderCell: params => params.row.level ? params.row.level.code : '-',
        },
        {
            field: 'roles',
            headerName: 'Роль',
            width: 112,
            sortComparator: (rolesA, rolesB) => {
                const rolesAStr = rolesA.join(', ');
                const rolesBStr = rolesB.join(', ');
                return rolesAStr.localeCompare(rolesBStr);
            },
            renderCell: params => params.row.roles.join(', '),
        },
        {
            field: 'actions',
            headerName: '',
            width: 48,
            sortable: false,
            align: 'center',
            renderCell: params => (
                <MoreDropDownMenu options={getMoreOptions(params.row.id)} />
            ),
        },
    ];

    return (
        users ? (
            <Grid item container direction='column' rowSpacing={4} xs>
                <Grid item container justifyContent='space-between' alignItems='start'>
                    <Grid item>
                        <Typography variant='h1'>{roleDisplayName}</Typography>
                    </Grid>
                    <Grid item>
                        <RouterLink to={routes.users.new}>
                            <ButtonStyled variant={ButtonVariant.Contained}>Додати користувача</ButtonStyled>
                        </RouterLink>
                    </Grid>
                </Grid>
                <Grid item width='100%'>
                    {
                        users.length === 0 ? (
                            <Typography variant='body1'>Користувачів цієї ролі немає.</Typography>
                        ) : (
                            <Grid item>
                                <DataTable rows={users} columns={columns}/>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
        ): null
    );
}