"use client";
import { useEffect, useState } from "react";
import { TableSort } from "./TableSort";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal } from "@mantine/core";
import Link from "next/link";
// import { useDisclosure } from '@mantine/hooks';
// import { Modal, Button } from '@mantine/core';

const FetchingData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const headers = [
    { key: "id", value: "ID" },
    { key: "name", value: "Name" },
    { key: "username", value: "Username" },
    { key: "email", value: "Email" },
    {
      key: "address",
      value: "Address",
      component: (addList) => {
        return (
          addList.street +
          " " +
          addList.suite +
          " " +
          addList.city +
          " " +
          addList.zipcode +
          " " +
          addList.geo.lng +
          " " +
          addList.geo.lat
        );
      },
    },
    {
      key: "id",
      value: "Action",
      component: (addList) => {
        // setModalData(addList.geo.lat + "-----" + addList.geo.lng);

        return (
          <>
            <Link href={"/posts/"+addList}>
              <Button variant="default">Show</Button>
            </Link>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        {modalData}
      </Modal>
      <TableSort data={data} headers={headers} />
    </>
  );
};

export default FetchingData;
