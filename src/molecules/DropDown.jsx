import PropTypes from 'prop-types'
import Pencil from '../assets/svg/Pencil'
import { useState } from 'react'
import Xmark from '../assets/svg/Xmark'


const DropDown = ({ index, transaction, isOpenIndex }) => {
  
  const firstLetterUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [isEditingCategory, setIsEditingCategory] = useState(false)
  const [temporaryNotesValue, setTemporaryNotesValue] = useState('')
  const [temporaryCategoryValue, setTemporaryCategoryValue] = useState('')
  const [inputNotesValue, setInputNotesValue] = useState(firstLetterUpperCase(transaction.additionalDetails.notes))
  const [inputCategoryValue, setInputCategoryValue] = useState(firstLetterUpperCase(transaction.additionalDetails.category))
  

  const clickPencil = (arg) => {
    if (arg === 'category') {
      setIsEditingCategory(!isEditingCategory)
    } else if (arg === 'notes') {
      setIsEditingNotes(!isEditingNotes)
    }
  }
  
  // TODO : Regex and max length
  const clickChangeValue = (arg) => {
    if (arg === 'category') {
      setInputCategoryValue(temporaryCategoryValue)
      setIsEditingCategory(!isEditingCategory)
      setTemporaryCategoryValue('')
    } else if (arg === 'notes') {
      setInputNotesValue(temporaryNotesValue)
      setIsEditingNotes(!isEditingNotes)
      setTemporaryNotesValue('')
    }
  }

  const clickCancel = (arg) => {
    if (arg === 'category') {
      setInputCategoryValue(inputCategoryValue)
      setIsEditingCategory(!isEditingCategory)
    }
    if (arg === 'notes') {
      setInputNotesValue(inputNotesValue)
      setIsEditingNotes(!isEditingNotes)
    }
  }

  const details = [
    {
      label: 'Category',
      value: inputCategoryValue,
      isEditing: isEditingCategory,
      setTemporaryValue: setTemporaryCategoryValue,
      clickPencil: () => clickPencil('category'),
      clickChangeValue: () => clickChangeValue('category'),
      clickCancel: () => clickCancel('category'),
    },
    {
      label: 'Notes',
      value: inputNotesValue,
      isEditing: isEditingNotes,
      setTemporaryValue: setTemporaryNotesValue,
      clickPencil: () => clickPencil('notes'),
      clickChangeValue: () => clickChangeValue('notes'),
      clickCancel: () => clickCancel('notes'),
    }
  ]

  return (
    <>
      {isOpenIndex[index] ? (
        <div className="account_transaction_additional_details_container">

          <div className='account_transaction_additional_details_transaction-type'>
            Transaction Type: {transaction.additionalDetails.transactionType}          
          </div>

          {details.map((detail, index) => (
            <div className={`account_transaction_additional_details_${detail.label.toLowerCase()}`} key={index}>
              <div className={`account_transaction_additional_details_${detail.label.toLowerCase()}_text`}>
                {detail.label}: {detail.value}
              </div>

              <div className={`account_transaction_additional_details_${detail.label.toLowerCase()}_edit`}>
                {detail.isEditing && (
                  <input  type="text" 
                          className={`account_transaction_additional_details_${detail.label.toLowerCase()}_edit_input`} 
                          onChange={(e) => detail.setTemporaryValue(e.target.value)}
                  />
                )}

                <div  className={`account_transaction_additional_details_${detail.label.toLowerCase()}_edit_icon`}  
                      onClick={detail.isEditing ? detail.clickChangeValue : detail.clickPencil}
                >
                  <Pencil color={detail.isEditing ? '#008000' : '#2c3e50'} />
                </div>

                {detail.isEditing && (
                  <div className={`account_transaction_additional_details_${detail.label.toLowerCase()}_edit_cancel`} onClick={detail.clickCancel} >
                    <Xmark />
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>
      ) : null}
    </>
  )
}

DropDown.propTypes = {
  index: PropTypes.number.isRequired,
  transaction: PropTypes.shape({
    additionalDetails: PropTypes.shape({
      transactionType: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      notes: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isOpenIndex: PropTypes.array.isRequired,
}

export default DropDown