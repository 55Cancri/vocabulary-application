import React, { SFC } from 'react'

export const ReimbursementList: SFC<{
  reimbursements: any
}> = props => {
  const { reimbursements } = props
  if (reimbursements.length === 0)
    return (
      <div className="nothing-to-show">
        You have not created any reimbursements yet.
      </div>
    )

  return (
    <table cellSpacing="0" className="reimburse-table">
      <tbody>
        <tr className="reimburse-headers">
          <th>Username</th>
          <th>Total</th>

          <th>Status</th>
          <th>Time Submitted</th>
        </tr>
        {reimbursements
          .slice(0)
          .reverse()
          .map(record => {
            const dayOf = new Date(parseInt(record.timeSubmitted))

            return (
              <tr key={record.timeSubmitted} className="reimburse-row">
                <td>{record.username}</td>
                <td>
                  {record.items
                    .map(item => parseInt(item.amount))
                    .reduce((total, item) => total + item)}
                </td>
                <td>{record.status}</td>
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
  )
}

export default ReimbursementList
