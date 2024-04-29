import { useFetchData } from "6pp";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { server } from "../../components/constants/config";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hook";
import { fileFormat, transformImage } from "../../lib/features";
import AdminLayout from "./../../components/layout/AdminLayout";
import RenderAttachment from "./../../components/shared/RenderAttachment";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0
        ? attachments.map((i) => {
            const url = i.url;
            const file = fileFormat(url);
            return (
              <Box
                key={i}
                alignItems={"center"}
                direction={"row"}
                alignSelf={"center"}
                spacing={"1rem"}
              >
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No attachment";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Stack
        position={"absolute"}
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
      >
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "GroupChat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];
const MessageManagement = () => {
  const [rows, setRows] = useState([]);
  const { loading, data, error, refetch } = useFetchData(
    `${server}/api/v1/admin/messages`,
    "dashboard-message"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);
  useEffect(() => {
    if (data) {
      setRows(
        data.messages.map((i) => ({
          ...i,
          id: i._id,
          sender: {
            name: i.sender.name,
            avatar: transformImage(i.sender.avatar, 50),
          },
          createdAt: moment(i.createdAt).format("MMMM Do YYYY,h:mm:ss a"),
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton />
      ) : (
        <Table
          heading={"All Messages"}
          columns={columns}
          rows={rows}
          roHeight={200}
        />
      )}
    </AdminLayout>
  );
};

export default MessageManagement;
