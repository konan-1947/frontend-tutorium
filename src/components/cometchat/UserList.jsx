// components/UserList.js
import { ListGroup } from "react-bootstrap";

const UserList = ({ users, onSelectUser, selectedUser }) => {
  return (
    <>
      <h4 className="mb-3">Danh sách người dùng</h4>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item
            key={user.uid}
            action
            active={selectedUser?.uid === user.uid}
            onClick={() => onSelectUser(user)}
            className="d-flex align-items-center"
          >
            <span>{user.name}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default UserList;