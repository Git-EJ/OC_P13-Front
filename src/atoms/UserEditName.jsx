import {useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { useSelector } from "react-redux"
import {setUserFirstName, setUserLastName} from "../rtk/slices/authSlice"
import { useDispatch } from "react-redux"


//TODO REGEX for names
const UserEditName = ({ setIsEditing }) => {
  const dispatch = useDispatch()
  const firstName = useSelector(state => state.auth.userFirstName) || localStorage.getItem('userFirstName')
  const lastName = useSelector(state => state.auth.userLastName) || localStorage.getItem('userLastName')
  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')

  
  const onChangeFirstName = (e) => {
    setEditFirstName(e.target.value)
  }
  
  const onChangeLastName = (e) => {
    setEditLastName(e.target.value)
  }
  
  const handleEditName = () => {
    dispatch(setUserFirstName(editFirstName)) && localStorage.setItem('userFirstName', editFirstName)
    dispatch(setUserLastName(editLastName)) && localStorage.setItem('userLastName', editLastName)
    setIsEditing(false)
  }

  const handleCancelEditName = () => {
    setEditFirstName(firstName)
    setEditLastName(lastName)
    setIsEditing(false)
  }
  
  useEffect(() => {
    setEditFirstName(firstName)
    setEditLastName(lastName)
  }, [firstName, lastName])


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
}

export default UserEditName


