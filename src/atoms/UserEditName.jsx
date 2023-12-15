import {useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { useSelector } from "react-redux"
import {setUserFirstName, setUserLastName} from "../rtk/slices/authSlice"
import { useDispatch } from "react-redux"
import useUserProfile from "../api/Profile"


//TODO REGEX for names
const UserEditName = ({ setIsEditing }) => {
  const dispatch = useDispatch()
  const { putProfile } = useUserProfile()
  const remember = useSelector(state => state.auth.remember)
  const firstName = useSelector(state => state.auth.userFirstName) || localStorage.getItem('userFirstName')
  const lastName = useSelector(state => state.auth.userLastName) || localStorage.getItem('userLastName')
  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [storeIsUpToDate, setstoreIsUpToDate] = useState(false)

  
  const onBlurFirstName = (e) => {
    setEditFirstName(e.target.value)
  }
  
  const onBlurLastName = (e) => {
    setEditLastName(e.target.value)
  }
  

  //TODO refactor conditions
  const handleEditName = () => {
    editFirstName === '' ? setEditFirstName(firstName) : dispatch(setUserFirstName(editFirstName))
    editLastName === '' ? setEditLastName(lastName) : dispatch(setUserLastName(editLastName))
    if (remember) {
      if (editFirstName !== '') localStorage.setItem('userFirstName', editFirstName)
      if (editLastName !== '') localStorage.setItem('userLastName', editLastName)
    }
    setstoreIsUpToDate(true)
  }
  
  useEffect(() => {
    if (storeIsUpToDate && editFirstName === firstName && editLastName === lastName) {
      putProfile()
      setstoreIsUpToDate(false)
      setIsEditing(false)
    }
  },[editFirstName, editLastName, firstName, lastName, storeIsUpToDate, putProfile, setstoreIsUpToDate, setIsEditing])


  const handleCancelEditName = () => {
    setEditFirstName(firstName)
    setEditLastName(lastName)
    setIsEditing(false)
  }
  

  return (
    <div className="edit_name_wrapper">
      <div className="edit_name_input_container">
        {/* TODO placeHolder or defaultValue?? */}
        <input type="text" className="edit_name_input" onBlur={onBlurFirstName} placeholder={firstName} />
        <input type="text" className="edit_name_input" onBlur={onBlurLastName} placeholder={lastName} />
      </div>
      <div className="edit_name_button_container">
        <button className="edit_name_button" onClick={handleEditName}>Save</button>
        <button className="edit_name_button" onClick={handleCancelEditName}>Cancel</button>
      </div>
  </div>
  )
}

UserEditName.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
}

export default UserEditName


