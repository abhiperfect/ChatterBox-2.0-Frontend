/*


NOT IN USE

*/
import React, { useState } from "react";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
export default function Search() {
  const [users, setUsers] = useState(sampleUsers);
  const isLoadingSendFriendRequest = true;
  const sendFriendRequest = true;

  const addFriendHandler = async (id) => {};
  return (
    <div style={{
    }} >
      {users.map((i) => (
        <UserItem
          user={i}
          key={i._id}
          handler={addFriendHandler}
          handlerIsLoading={isLoadingSendFriendRequest}
        />
      ))}
    </div>
  );
}
