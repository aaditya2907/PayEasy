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
    <div className="min-h bg-gray-100 mt-16">
      <Appbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Greeting Card */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {name ? name[0].toUpperCase() : "U"}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome back,
              </h2>
              <p className="text-xl text-gray-600">{name}</p>
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Current Balance
            </h3>
            <div className="text-3xl font-bold text-gray-800">
              ₹ {balance.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Users Section */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800">
              People you can pay
            </h3>
          </div>
          <div className="p-6">
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
}
