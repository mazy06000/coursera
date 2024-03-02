import { useGetUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";

export const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;
  if (isLoading) {
    content = <div className="loader">Loading...</div>;
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Users List</h1>
        <ul>
          {users.map((user, i) => {
            return <li key={i}>{user.username}</li>;
          })}
        </ul>
        <Link to="/welcome">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default UsersList;
