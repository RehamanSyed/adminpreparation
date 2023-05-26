import React, { useEffect, useState } from "react";
import { Box, Container, Spinner } from "@chakra-ui/react";
import { Space, Table, Button, Modal } from "antd";
import StackForm from "@/modules/stacks/components/StackForm";
import {
  deleteStack,
  getAllStack,
} from "@/modules/stacks/hooks/useStack";

const TechnologyList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error, refetch } = getAllStack();
  const { deleteMutation } = deleteStack();
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "1",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Technology",
      dataIndex: "technology",
      key: "2",
    },
    {
      title: "Page",
      dataIndex: "page",
      key: "3",
    },

    {
      title: "Action",
      key: "4",
      render: (_, record) => (
        <Space size="middle">
          <Button type="dashed">Edit</Button>
          <Button type="dashed" onClick={() => deleteHandler(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const deleteHandler = (item) => {
    deleteMutation.mutate(item._id);
    };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  if (isLoading) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
    
      <Box>
        <Container maxW={"full"}>
          <Button
            type="primary"
            onClick={showModal}
            style={{
              margin: "16px 0",
            }}
          >
            Add New Technology
          </Button>
          <Table columns={columns} dataSource={data} />
        </Container>

        <Modal
          title="Technology Name"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[]}
        >
          <StackForm setIsModalOpen={setIsModalOpen} />
        </Modal>
      </Box>
    </>
  );
};

export default TechnologyList;
