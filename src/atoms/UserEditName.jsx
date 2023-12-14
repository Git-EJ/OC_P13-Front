import {useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { useSelector } from "react-redux"
import {setUserFirstName, setUserLastName} from "../rtk/slices/authSlice"
import { useDispatch } from "react-redux"
import useUserProfile from "../api/Profile"


//TODO REGEX for names
const UserEditName = ({ setIsEditing }) => {
  const dispatch = useDispatch()
  const firstName = useSelector(state => state.auth.userFirstName) || localStorage.getItem('userFirstName')
  const lastName = useSelector(state => state.auth.userLastName) || localStorage.getItem('userLastName')
  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const { putProfile } = useUserProfile()


  
  const onBlurFirstName = (e) => {
    setEditFirstName(e.target.value)
  }
  
  const onBlurLastName = (e) => {
    setEditLastName(e.target.value)
  }
  
  const handleEditName = () => {
    dispatch(setUserFirstName(editFirstName))
    dispatch(setUserLastName(editLastName)) 
    localStorage.setItem('userFirstName', editFirstName)
    localStorage.setItem('userLastName', editLastName)
    setIsEditing(false)
    putProfile()
  }
  
  // useEffect(() => {
  //   dispatch(setUserFirstName(editFirstName))
  //   dispatch(setUserLastName(editLastName))
  //   putProfile()
  // },[editFirstName, editLastName, dispatch, putProfile])

  const handleCancelEditName = () => {
    setEditFirstName(firstName)
    setEditLastName(lastName)
    setIsEditing(false)
  }
  
  // avoid putProfile error when the user modify only one of the two fields(fistName, lastName)
  useEffect(() => {
    editFirstName === '' && setEditFirstName(firstName)
    editLastName === '' && setEditLastName(lastName)
    console.log('%c editFirstName: ', 'color:purple', editFirstName)
    console.log('%c editLastName: ', 'color:purple', editLastName)
  }, [editFirstName, editLastName, firstName, lastName])

  
  return (
    <div className="edit_name_wrapper">
      <div className="edit_name_input_container">
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


