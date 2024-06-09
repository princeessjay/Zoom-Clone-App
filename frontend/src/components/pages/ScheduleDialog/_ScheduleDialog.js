import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";

import { emailRegex } from "../../shared";

import styles from '../Home/Button.module.css';

export default function ScheduleDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [valid, setValid] = useState(false);
  const [topicValue, setTopicValue] = React.useState("");
  const [name, setName] = React.useState("");
  const [dateTimeValue, setDateTimeValue] = React.useState("");
  const prevDateTimeValue = React.useRef("");

  const navigate = useNavigate();

  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 3);
  const [date, setDate] = React.useState(defaultDate);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    const POST_OPTIONS = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: topicValue,
        first_name: name,
        email: email,
        start_time: prevDateTimeValue.current,
      }),
    };

    fetch("/api/zoom/create", POST_OPTIONS)
      .then((data) => data.json())
      .then(({ id, password }) => {
        navigate(`/msdk/?mn=${id}&pw=${password}`);
      });

    console.log("After: ");

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setValid(email && emailRegex.test(email));

    prevDateTimeValue.current = dateTimeValue;
  }, [dateTimeValue, email]);

  return (
    <>
      <button  className={`${styles.buttonBlue} ${styles.bn37}`}  onClick={handleClickOpen}>
        <i class="material-icons large icon-blue">calendar_month</i>
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Schedule Meeting</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Topic"
            type="topic"
            required={true}
            onChange={(e) => setTopicValue(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            required={true}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <Stack component="form" noValidate spacing={4}>
            <TextField
              autoFocus
              margin="dense"
              required={true}
              id="datetime-local"
              label="Date and Time"
              type="datetime-local"
              defaultValue={date.toLocaleDateString("en-CA")}
              sx={{ width: 250 }}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setDateTimeValue(e.target.value)}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={handleSubmit} color="primary">
            {" "}
            Submit
          </Button>

        </DialogActions>
      </Dialog>
    </>
  );
}
