import React, { Component, SFC } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

export const ReimburseItem = props => {
  const {
    handleAddItem,
    handleItemChange,
    handleRemoveItem,
    index,
    itemData: { uid, title, type, amount, description, receipts }
  } = props

  return (
    <div
      id={uid}
      onFocus={handleAddItem}
      data-position={index}
      className="reimbursement-item"
    >
      <input
        type="text"
        name="title"
        value={title}
        placeholder="title"
        onChange={handleItemChange}
      />
      <input
        type="text"
        name="amount"
        value={amount}
        placeholder="amount"
        onChange={handleItemChange}
      />
      <textarea
        name="description"
        value={description}
        placeholder="more details"
        onChange={handleItemChange}
      />

      <input
        style={{ display: 'none' }}
        name="file"
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        // onChange={this.onUploadImage}
        ref={fileInput => (this.fileInput = fileInput)}
      />
      <button
        type="submit"
        className="receipts button upload"
        onClick={e => {
          e.preventDefault()
          this.fileInput.click()
        }}
      >
        <FontAwesomeIcon icon="upload" size="xs" className="fa-upload" />Upload
      </button>

      <FontAwesomeIcon
        icon="times"
        className="fa-times"
        onClick={el => handleRemoveItem(uid)}
      />
    </div>
  )
}

export default ReimburseItem
