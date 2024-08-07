import axios from "axios";
import React, { useEffect, useState } from "react";

function UserApi(token, setCart) {
  const [isLogged, setIsLogged] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);
  const [user, setUser] = useState({});
      useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(
            "https://loot-bazar-api.onrender.com/user/information",
            {
              headers: { Authorization: token },
            }
          );
          setIsLogged(true);
          setUser(res.data.user);
          setCart(res.data.user.cart);
          console.log(res.data, " from user")
        } catch (error) {
          console.error(error);
        }
      };
      getUser();
    }
  }, [token, setCart]);

  return {
    isLogged: [isLogged, setIsLogged],
    adminLogged: [adminLogged, setAdminLogged],
    user: [user, setUser],
  };
}

export default UserApi;
