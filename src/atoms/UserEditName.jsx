import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import PropTypes from 'prop-types'


const UserEditName = ({ setIsEditing }) => {
  const { user, setUser } = useContext(UserContext)
  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')

  
  const onChangeFirstName = (e) => {
    setEditFirstName(e.target.value)
  }
  
  const onChangeLastName = (e) => {
    setEditLastName(e.target.value)
  }
  
  const handleEditName = () => {
    setUser({...user, firstName:editFirstName, lastName:editLastName})
    setIsEditing(false)
  }

  const handleCancelEditName = () => {
    setEditFirstName(user.firstName)
    setEditLastName(user.lastName)
    setIsEditing(false)
  }
  
  useEffect(() => {
    setEditFirstName(user.firstName)
    setEditLastName(user.lastName)
  }, [user])


  return (
    <div className="edit_name_wrapper">
      <div className="edit_name_input_container">
        <input type="text" className="edit_name_input" onChange={onChangeFirstName} placeholder={user.firstName} />
        <input type="text" className="edit_name_input" onChange={onChangeLastName} placeholder={user.lastName} />
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


