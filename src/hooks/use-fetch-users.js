import React from "react";
import { useEffect } from "react";
import config from "../constant";
import axios from "axios";

const useFetchUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        setLoading(true)
        const response = await axios.get(`${config.API_BASE_URL}/users`);
        console.log(response)
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      }
      finally {
        setLoading(false)
      }
    };

    fetchUsers()

  }, []);


  return [ users,
    loading,
    error,]
   
  
};

export default useFetchUsers;
