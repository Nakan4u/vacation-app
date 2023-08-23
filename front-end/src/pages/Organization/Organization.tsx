import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import moment from "moment";

import { CustomTimeline } from "components";
import styles from "./Organization.module.scss";

const Organization = () => {
  const from = moment("2023-08-25").format("Do MMMM YYYY");
  const to = moment("2023-09-11").format("Do MMMM YYYY");

  const [email, setEmail] = useState("");

  const handleApprove = (id: string) => {
    console.log("Handle approve row with id", id);
  };

  const handleDelete = (id: string) => {
    console.log("Handle delete row with id", id);
  };

  const handleInvitation = () => {
    console.log("Send invitation");
    setEmail("");
  };

  const requestListColumns: GridColDef[] = [
    { field: "id", headerName: "№", width: 20 },
    { field: "lastName", headerName: "Last name", width: 120 },
    { field: "firstName", headerName: "First name", width: 120 },
    { field: "type", headerName: "Type", width: 80 },
    { field: "from", headerName: "From", width: 160 },
    { field: "to", headerName: "To", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: ({ row }) => {
        return (
          <div className={styles.actionsBlock}>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => handleApprove(row.id)}
            >
              approve
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => handleDelete(row.id)}
            >
              reject
            </Button>
          </div>
        );
      },
    },
  ];

  const requestDataRows = [
    {
      id: "1",
      lastName: "Doe",
      firstName: "John",
      type: "vacation",
      from,
      to,
    },
  ];

  return (
    <div>
      <div className={styles.header}>
        <Link to="/dashboard" className={styles.link}>
          Dashboard
        </Link>
        <Typography variant="body1" className={styles.pageTitle}>
          Manager's Dashboard
        </Typography>
      </div>

      <div className={styles.invitation}>
        <Typography component="span" className={styles.invitation__label}>
          Invite with email:
        </Typography>
        <TextField
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.invitation__input}
        />
        <Button size="small" variant="contained" onClick={handleInvitation}>
          Add to the team
        </Button>
      </div>

      <h3 className={styles.listTitle}>Requested list</h3>
      <DataGrid
        rows={requestDataRows}
        columns={requestListColumns}
        disableRowSelectionOnClick
        disableVirtualization
        hideFooter
        autoHeight
        className={styles.requestTable}
        classes={{
          cellContent: styles.cellContent,
        }}
      />
      <h3 className={styles.listTitle}>Organization overview:</h3>
      <CustomTimeline />
    </div>
  );
};

export default Organization;