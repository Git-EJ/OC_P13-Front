import PropTypes from 'prop-types'
import Pencil from '../assets/svg/Pencil'
import { useEffect, useState } from 'react'
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
    

    useEffect(() => {
      console.log('isEditingCategory:', isEditingCategory)
      console.log('temporaryCategoryValue:', temporaryCategoryValue)
      console.log('inputCategoryValue:', inputCategoryValue)
    }, [isEditingCategory, temporaryCategoryValue, inputCategoryValue])
    
    
    
    // TODO : Regex and max length
    const clickPencil = (arg) => {
      if (arg === 'category') {
        setIsEditingCategory(!isEditingCategory)
        setInputCategoryValue(temporaryCategoryValue)
        setTemporaryCategoryValue('')

      } else if (arg === 'notes') {
        setIsEditingNotes(!isEditingNotes)
        setInputNotesValue(temporaryNotesValue)
        setTemporaryNotesValue('')
      }
    }

    
    // TOTO : clickPencil and clickCancel are very similar, dont't need setInputs? clickPencil is enought with maybe another name?
    const clickCancel = (arg) => {
      if (arg === 'category') {
        setIsEditingCategory(!isEditingCategory)
        setTemporaryCategoryValue('')
      }
      if (arg === 'notes') {
        setIsEditingNotes(!isEditingNotes)
        setTemporaryNotesValue('')
      }
    }

  return (
    <>
      {isOpenIndex[index] ? (
        <div className="account_transaction_additional_details_container">
          <div className='account_transaction_additional_details_transaction-type'>
            Transaction Type: {transaction.additionalDetails.transactionType}          
          </div>

          <div className='account_transaction_additional_details_category'>
            
            <div className='account_transaction_additional_details_category_text'>
              Category: {inputCategoryValue}
            </div>

            <div className='account_transaction_additional_details_category_edit'>

              {isEditingCategory &&
                <input type="text" className="account_transaction_additional_details_category_edit_input" onChange={(e) => setTemporaryCategoryValue(e.target.value)} />
              }
           
              <div className='account_transaction_additional_details_category_edit_icon' onClick={() => clickPencil('category')}>
                <Pencil color={isEditingCategory ? '#008000' : '#2c3e50' } />
              </div>

              {isEditingCategory &&
                <div className='account_transaction_additional_details_category_edit_cancel' onClick={() => clickCancel('category')}>
                  <Xmark />
                </div>

              }
            </div>
          </div>
          
          
          <div className='account_transaction_additional_details_notes'>

            <div className='account_transaction_additional_details_notes_text'>
              Notes: {inputNotesValue}
            </div>

            <div className='account_transaction_additional_details_notes_edit'>

              {isEditingNotes && 
                <input type="text" className="account_transaction_additional_details_notes_edit_input" onChange={(e) => setTemporaryNotesValue(e.target.value)}/>
              }

              <div className='account_transaction_additional_details_notes_edit_icon' onClick={ () => clickPencil('notes')}>
                <Pencil color={isEditingNotes ? '#008000' : '#2c3e50' } />
              </div>
          
              {isEditingNotes &&
                <div className='account_transaction_additional_details_notes_edit_cancel' onClick={() => clickCancel('notes')}>
                  <Xmark />
                </div>
              }

            </div>
          </div>

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