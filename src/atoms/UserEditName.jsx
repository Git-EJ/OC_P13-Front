import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserFirstName, setUserLastName } from "../rtk/slices/authSlice";
import useUserProfile from "../api/Profile";
import { setIsEditingUserName } from "../rtk/slices/authSlice";


const UserEditName = () => {

  const dispatch = useDispatch();
  const { putProfile } = useUserProfile();
  const firstName = useSelector((state) => (state.auth.userFirstName));
  const lastName = useSelector((state) => (state.auth.userLastName));
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [storeIsUpToDate, setStoreIsUpToDate] = useState(false);
  const [regexError, setRegexError] = useState('');


  const isValidInput = (e) => {

    const editNamePattern = /^[a-zA-Z éèçùï-]*$/;

    if (!editNamePattern.test(e.target.value)) {
      setRegexError("Caractère(s) non autorisé(s), autorisé(s): a-z A-Z é è ç ù ï");

    } else if(e.target.value.length > 30) {
      setRegexError("Nombre de caractères maximum: 30");

    } else {
      setRegexError(false);

      if(e.target.id === "editFirstName"){
        setEditFirstName(e.target.value);
      } else if(e.target.id === "editLastName"){
        setEditLastName(e.target.value);
      }
    }
  }
  

  const handleEditName = () => {

    if (!regexError) {
      
      editFirstName === "" ? setEditFirstName(firstName) : dispatch(setUserFirstName(editFirstName));
      console.log("editFirstName 1: ", editFirstName);
      
      editLastName === "" ? setEditLastName(lastName) : dispatch(setUserLastName(editLastName));
      console.log("editLastName 1: ", editLastName);
      
      if(editFirstName === firstName && editLastName === lastName) {
        dispatch(setIsEditingUserName(false));
      }
      
      setStoreIsUpToDate(true);
    }
  }
  

  const handleCancelEditName = () => {
    setEditFirstName(firstName);
    setEditLastName(lastName);
    dispatch(setIsEditingUserName(false));
    setRegexError("");
  }
  

  useEffect(() => {

    if (storeIsUpToDate) {
      
      putProfile();
      setStoreIsUpToDate(false);
      dispatch(setIsEditingUserName(false));
    }
  }, [
    editFirstName,
    editLastName,
    firstName,
    lastName,
    storeIsUpToDate,
    putProfile,
    setStoreIsUpToDate,
    dispatch,
  ]);


  return (
    <div className="edit_name_wrapper">
      <div className="edit_name_input_container">
        <input
          id="editFirstName"
          type="text"
          className="edit_name_input"
          onChange={isValidInput}
          placeholder={firstName}
        />
        <input
          id="editLastName"
          type="text"
          className="edit_name_input"
          onChange={isValidInput}
          placeholder={lastName}
        />
      </div>

      {regexError ? (
        <div className="edit_name_regexerror">{regexError}</div>
      ) : (
        null
      )}

      <div className="edit_name_button_container">
        <button className="edit_name_button" onClick={handleEditName}>
          Save
        </button>
        <button className="edit_name_button" onClick={handleCancelEditName}>
          Cancel
        </button>
      </div>
    </div>
  );
};


export default UserEditName;
