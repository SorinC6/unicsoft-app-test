import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../redux/action/user";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  phone: "",
  email: "",
  city: "",
};

const CreateClient = ({ open, setOpen, scroll }) => {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [clientData, setClientData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, phone } = clientData;
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!username) newErrors.username = "Username is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    dispatch(createClient(clientData, setOpen));
    setClientData(initialState);
    setErrors({});
  };

  const handleClose = () => {
    setOpen(false);
    setClientData(initialState);
    setErrors({});
  };

  return (
    <Dialog
      scroll={scroll}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Add New Client</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex justify-start items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>Client Details</span>
          </div>
          <Divider />
          <table className="mt-4">
            <tr>
              <td className="pb-4 text-lg">First Name</td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  value={clientData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Last Name</td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  value={clientData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Username</td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  value={clientData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Phone</td>
              <td className="pb-4">
                <TextField
                  type="number"
                  size="small"
                  fullWidth
                  value={clientData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Email</td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Optional"
                  value={clientData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">City</td>
              <td className="pb-4">
                <CFormSelect
                  value={clientData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="border p-2 rounded w-full text-gray-500">
                  <option value="">Select city</option>
                  {pakistanCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </CFormSelect>
              </td>
            </tr>
          </table>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          onClick={handleClose}
          type="reset"
          className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
          {isFetching ? "Submitting..." : "Submit"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClient;
