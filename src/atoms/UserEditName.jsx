import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setUserFirstName, setUserLastName } from "../rtk/slices/authSlice";
import useUserProfile from "../api/Profile";


const UserEditName = ({ setIsEditing }) => {
 
  const dispatch = useDispatch();
  const { putProfile } = useUserProfile();
  const firstName = useSelector((state) => (state.auth.userFirstName) || localStorage.getItem("userFirstName"));
  const lastName = useSelector((state) => (state.auth.userLastName) || localStorage.getItem("userLastName"));
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [storeIsUpToDate, setstoreIsUpToDate] = useState(false);
  const [regexError, setRegexError] = useState('');


  const isValidInput = useCallback((e) => {

    const editNamePattern = /^[a-zA-Z éèçùï-]+$/;

    if (!editNamePattern.test(e.target.value)) {
      setRegexError("Caractère(s) non autorisé(s), autorisé(s): a-z A-Z é è ç ù ï");

    } else if(e.target.value.length > 30) {
      setRegexError("Nombre de caractères maximum: 30");

    } else {
      setRegexError("");

      if(e.target.id === "editFirstName"){
        setEditFirstName(e.target.value);
      } else if(e.target.id === "editLastName"){
        setEditLastName(e.target.value);
      }
    }
  },[setRegexError, setEditFirstName, setEditLastName]);


  const handleEditName = useCallback (() => {
    
    editFirstName === ""
      ? setEditFirstName(firstName)
      : dispatch(setUserFirstName(editFirstName));

    editLastName === ""
      ? setEditLastName(lastName)
      : dispatch(setUserLastName(editLastName));

    setIsEditing(false);
    setstoreIsUpToDate(true);
  },[editFirstName, editLastName, firstName, lastName, dispatch, setIsEditing, setstoreIsUpToDate])


  useEffect(() => {
    if ( storeIsUpToDate && editFirstName === firstName && editLastName === lastName) {
      putProfile();
      setstoreIsUpToDate(false);
      setIsEditing(false);
    }
  }, [
    editFirstName,
    editLastName,
    firstName,
    lastName,
    storeIsUpToDate,
    putProfile,
    setstoreIsUpToDate,
    setIsEditing,
  ]);


  const handleCancelEditName = useCallback(() => {
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setIsEditing(false);
  },[firstName, lastName, setIsEditing])



  return (
    <div className="edit_name_wrapper">
      <div className="edit_name_input_container">
        <input
          id="editFirstName"
          type="text"
          className="edit_name_input"
          onBlur={isValidInput}
          placeholder={firstName}
        />
        <input
          id="editLastName"
          type="text"
          className="edit_name_input"
          onBlur={isValidInput}
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

UserEditName.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
};

export default UserEditName;
