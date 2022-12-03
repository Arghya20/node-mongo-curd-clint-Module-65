import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData();
  const [displayUsers, setDispalyuser] = useState(users);

  const [user, setUser] = useState({});

  const handelSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/users ", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("user added successfully ✅");
          event.target.reset();
        }
      });
  };

  const handelInputBlur = (event) => {
    const value = event.target.value;
    const fileld = event.target.name;
    const newUser = { ...user };
    newUser[fileld] = value;
    setUser(newUser);
  };

  const handelDelete = (user) => {
    const agree = window.confirm(
      `Are Your agree delete this user : ${user._id}`
    );
    if (agree) {
      console.log("deleting user id : ", user._id);
      fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("user deleted successfully ✅");
            const reamingUser = displayUsers.filter(
              (usr) => usr._id !== user._id
            );
            setDispalyuser(reamingUser);
          }
        });
    }
  };

  return (
    <div>
      <h2>This is HOME Page 🏡 </h2>
      <form onSubmit={handelSubmit}>
        <input
          onBlur={handelInputBlur}
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <br />
        <input
          onBlur={handelInputBlur}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <br />
        <input
          onBlur={handelInputBlur}
          type="text"
          name="address"
          placeholder="address"
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {displayUsers.map((user) => (
          <p key={user._id}>
            {user.name} {user.email} {user.address}{" "}
            <Link to={`/update/${user._id}`}>
              <button>update</button>
            </Link>
            <button onClick={() => handelDelete(user)}>x</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Home;
