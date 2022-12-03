import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const storedUser = useLoaderData();

  const [user, setUser] = useState(storedUser);

  const handelSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/users/${storedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("user updated ✅");
        }
      });
  };

  const handelInputChange = (event) => {
    const value = event.target.value;
    const fileld = event.target.name;
    const newUser = { ...user };
    newUser[fileld] = value;
    setUser(newUser);
  };

  return (
    <div>
      <h2>This is update page.</h2>
      <p>{storedUser.name}</p>
      <form onSubmit={handelSubmit}>
        <input
          defaultValue={storedUser.name}
          onChange={handelInputChange}
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <br />
        <input
          defaultValue={storedUser.email}
          onChange={handelInputChange}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <br />
        <input
          defaultValue={storedUser.address}
          onChange={handelInputChange}
          type="text"
          name="address"
          placeholder="address"
          required
        />
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default Update;
