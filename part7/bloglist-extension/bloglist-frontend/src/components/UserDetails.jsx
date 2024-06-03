import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
     const fetchUser = async ()=> {
        const userDetails = await userService.getUser(id);
        setUser(userDetails);
     }
     fetchUser();
  }, [id])

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Addded blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
