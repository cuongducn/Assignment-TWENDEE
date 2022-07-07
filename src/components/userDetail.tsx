const UserDetail = ({
  title,
  firstName,
  lastName,
  userName,
  thumbnail,
}: any) => {
  return (
    <tr className="table-content">
      <td>
        {title} {firstName} {lastName}
      </td>
      <td>{userName}</td>
      <td>{thumbnail}</td>
    </tr>
  );
};

export default UserDetail;