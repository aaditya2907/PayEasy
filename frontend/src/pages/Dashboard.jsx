import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import Users from "../components/Users";

import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);

  const [name, setName] = useState("");

  useEffect(() => {
    async function getName() {
      const res = await axios.get("http://localhost:3000/api/v1/user/name", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setName(res.data.name);
    }
    getName();
  }, []);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setBalance(res.data.balance);
    };

    fetchdata();
  }, []);
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <div>Hello, {name}</div>
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
}
