import React from 'react'

export const AdminReimbursementList = props => (
  <div>
    <table cellSpacing="0" className="reimburse-table">
      <tbody>
        <tr className="reimburse-headers">
          <th>Username</th>
          <th>Total</th>
          <th>Status</th>
          <th>Time Submitted</th>
        </tr>
        {props.everyReimbursement.map((reim, i) => {
          const dayOf = new Date(parseInt(reim.timeSubmitted))
          return (
            <tr
              key={reim.timeSubmitted}
              data-key={reim.timeSubmitted}
              onClick={props.updateClicks}
              className={
                props.state && props.state.length > 0 && props.state[i].clicked
                  ? 'reimburse-row selected-row'
                  : 'reimburse-row'
              }
              // className="reimburse-row"
            >
              <td>{reim.username}</td>
              <td>
                {reim.items
                  .map(item => parseInt(item.amount))
                  .reduce((total, item) => total + item)}
              </td>
              <td>{reim.status}</td>
              <td>
                {dayOf.getMonth() +
                  1 +
                  '/' +
                  dayOf.getDate() +
                  '/' +
                  dayOf.getFullYear()}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default AdminReimbursementList
