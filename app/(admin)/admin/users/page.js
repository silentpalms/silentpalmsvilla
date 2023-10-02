"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import EditUserModal from "../../components/EditUserModal";
import DataTable from "react-data-table-component";
import localFont from "next/font/local";
import DeleteUserModal from "../../components/DeleteUserModal";

const poppins = localFont({
  src: [
    {
      path: "../../../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/poppins/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
});

const page = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formName, setFormName] = useState("");
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);

  const [roles, setRoles] = useState([]);
  const showUserModal = () => {
    setOpenUserModal(true);
  };

  const showEditUserModal = () => {
    setOpenEditUserModal(true);
  };
  const hideEditUserModal = () => {
    setOpenEditUserModal(false);
  };
  const hideUserModal = () => {
    setOpenUserModal(false);
  };

  const handleDelete = (data) => {
    showUserModal(data._id);
    setUserId(data._id);
  };

  const handleEdit = (data) => {
    showEditUserModal(data._id);
    setUserId(data._id);
    setFormEmail(data.email);
    setFormName(data.username);
    setRoles(data.roles);
  };

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.username,
      maxWidth: "200px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Roles",
      cell: (row) => {
        let roles = [];
        roles = row.roles;
        const rolesToString = roles.toString();
        const rolesArray = rolesToString.split(",");
        const rolesWithSpaces = rolesArray
          .map((role) => role.trim())
          .join(", ");

        return <p>{rolesWithSpaces}</p>;
      },
    },

    {
      name: "Actions",
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <div className="flex items-center space-x-6">
            <span
              className="text-black font-bold underline cursor-pointer"
              onClick={() => handleEdit(row)}
              id={row._id}
            >
              Edit Roles
            </span>
            <span
              className="text-red-500 font-bold underline cursor-pointer"
              onClick={() => handleDelete(row)}
              id={row._id}
            >
              Delete User
            </span>
          </div>
        );
      },
    },
  ];
  const customStyles = {
    text: {
      style: {
        color: "green",
      },
    },
    rows: {
      style: {
        minHeight: "40px", // override the row height

        color: "black",
      },
    },
    headCells: {
      style: {
        paddingLeft: "28px", // override the cell padding for head cells
        paddingRight: "28px",

        borderColor: "rgb(51,65,85)",
        color: "black",
      },
    },
    cells: {
      style: {
        paddingLeft: "28px", // override the cell padding for data cells
        paddingRight: "28px",
      },
    },
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
   

    const details = {
      username: username,
      email: email,
    };

    try {
      await axios.post("/api/admin/users", details);
      
      setEmail("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users");

        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  return (
    <div className={`${poppins.className} pt-12 h-screen bg-gray-50 px-8`}>
    <DataTable
      title="Users"
      columns={columns}
      data={users}
      customStyles={customStyles}
      pagination
    />

    <DeleteUserModal
      openModal={openUserModal}
      showUserModal={showUserModal}
      hideModal={hideUserModal}
      userId={userId}
    />
    <EditUserModal
      openModal={openEditUserModal}
      hideModal={hideEditUserModal}
      userId={userId}
      formName={formName}
      formEmail={formEmail}
      roles={roles}
    />

    <div className="mt-20">
      <h3 className="font-extrabold uppercase text-3xl underline">
        Add User
      </h3>
      <form
        className="w-[400px] flex flex-col space-y-5 mt-8"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col">
          <label className="text-xs">User Name</label>
          <input
            type="text"
            required
            className="px-2 py-2 border border-gray-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs">Email</label>
          <input
            type="text"
            required
            className="px-2 py-2 border border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 px-3 py-2 text-white w-[100px]"
        >
         Submit
        </button>
      </form>
    </div>
  </div>
  );
};

export default page;
