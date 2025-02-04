'use client'
import { useEffect, useState } from "react";
import { TableSort } from "./TableSort";
import { Button } from "@mantine/core";
import Link from "next/link";

const FetchingData = () => {
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

const headers = [
  { key: "id", value: "ID" },
  { key: "name", value: "Name" },
  { key: "username", value: "Username" },
  { key: "email", value: "Email" },
  {
    key: "address",
    value: "Address",
    component: (addList) =>
      `${addList.street}, ${addList.suite}, ${addList.city}, ${addList.zipcode}`,
  },
  {
    key: "id",
    value: "Action",
    component: (user) => (
      <Link href={`/pages/${user}`}>
        <Button variant="default">Show</Button>
      </Link>
    ),
  },
];

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setIsLoading(false);
    })
    .catch(() => {
      setError("Error fetching data");
      setIsLoading(false);
    });
}, []);

if (isLoading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;

return <TableSort data={data} headers={headers} />;
};

export default FetchingData;
