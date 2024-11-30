import { type ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import type { User } from "../types/user.type";
import { useThunk } from "../hooks/use-thunk";
import Button from "./Button";
import UsersListItem from "./UsersListItem";

function UsersList() {
  const {
    runThunk: doFetchUsers,
    isLoading: isLoadingUsers,
    error: loadingUsersError,
  } = useThunk<User[]>(fetchUsers);

  const {
    runThunk: doCreateUser,
    isLoading: isCreatingUser,
    error: creatingUserError,
  } = useThunk<User>(addUser);

  const { data } = useSelector(
    (state: { users: { data: []; isLoading: boolean; error: string } }) => {
      return state.users;
    }
  );

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleAddUser = () => {
    doCreateUser();
  };

  let content: ReactNode;

  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fecthing data...</div>;
  } else {
    content = data.map((user: User) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleAddUser}>
          <div>+ Add User</div>
        </Button>
        {creatingUserError && "Error creating user"}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
