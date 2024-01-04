import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserFirstName, setUserLastName } from "../rtk/slices/authSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router";

const useUserProfile = () => {

  const HOST = "http://localhost:3001/api/v1/user/";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const putFirstName = useSelector((state) => state.auth.userFirstName);
  const putLastName = useSelector((state) => state.auth.userLastName);

  
  const postProfile = useCallback(async () => {
    try {
      const postProfileResponse = await axios.post( HOST + "profile", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { firstName, lastName } = postProfileResponse.data.body;

      dispatch(setUserFirstName(firstName));
      dispatch(setUserLastName(lastName));

    } catch (err) {

      navigate(`/error/${err.response.status}`, {
        state: {
          errorprops: {
            status: err.response.status,
            statusText: err.response.statusText,
            statusMessage: err.response.data.message,
          },
        },
      });
      console.log("%c Erreur useUserProfile/postProfile: {%s}", "color:red", err);
    }
  }, [dispatch, token, navigate]);


  const putProfile = useCallback(async () => {

    try {
      const requestBody = {
        firstName: putFirstName,
        lastName: putLastName,
      };

      await axios.put(HOST + "profile", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
    } catch (err) {
      
      navigate(`/error/${err.response.status}`, {
        state: {
          errorprops: {
            status: err.response.status,
            statusText: err.response.statusText,
            statusMessage: err.response.data.message,
          },
        },
      });
      console.log("%c Erreur useUserProfile/putProfile: ", "color:red", err);
    }
  }, [token, putFirstName, putLastName, navigate]);

  return { postProfile, putProfile };
};

export default useUserProfile;
