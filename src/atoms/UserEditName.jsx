import {useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { useSelector } from "react-redux"
import {setUserFirstName, setUserLastName} from "../rtk/slices/authSlice"
import { useDispatch } from "react-redux"
import useUserProfile from "../api/Profile"


//TODO REGEX for names
const UserEditName = ({ setIsEditing, isEditing }) => {
  const dispatch = useDispatch()
  const firstName = useSelector(state => state.auth.userFirstName) || localStorage.getItem('userFirstName')
  const lastName = useSelector(state => state.auth.userLastName) || localStorage.getItem('userLastName')
  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const { putProfile } = useUserProfile()


  
  const onChangeFirstName = (e) => {
    setEditFirstName(e.target.value)
  }
  
  const onChangeLastName = (e) => {
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
  //   console.log('%c useAccount/isEditing: ', 'color: pink', isEditing);
  //   if(!isEditing)
  //     putProfile()
  // }, [isEditing, putProfile])

  const handleCancelEditName = () => {
    setEditFirstName(firstName)
    setEditLastName(lastName)
    setIsEditing(false)
  }
  
  useEffect(() => {
    setEditFirstName(firstName)
    setEditLastName(lastName)
  }, [firstName, lastName])

  useEffect(() => {
    console.log('%c editFirstName: ', 'color:purple', editFirstName)
    console.log('%c editLastName: ', 'color:purple', editLastName)
  }, [editFirstName, editLastName])


  
  return (
    <div className="edit_name_wrapper">
      <div className="edit_name_input_container">
        <input type="text" className="edit_name_input" onChange={onChangeFirstName} placeholder={firstName} />
        <input type="text" className="edit_name_input" onChange={onChangeLastName} placeholder={lastName} />
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
  isEditing: PropTypes.bool.isRequired
}

export default UserEditName


