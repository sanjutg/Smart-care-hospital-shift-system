import { useState } from 'react'
import './ShiftRequests.css'

const ShiftRequests = ({ requests, user }) => {
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestDate, setRequestDate] = useState('')
  const [requestType, setRequestType] = useState('change')
  const [reason, setReason] = useState('')

  const formatDate = (date) => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'status-pending', text: 'Pending' },
      approved: { class: 'status-approved', text: 'Approved' },
      rejected: { class: 'status-rejected', text: 'Rejected' }
    }
    const badge = badges[status] || badges.pending
    return <span className={`status-badge ${badge.class}`}>{badge.text}</span>
  }

  const handleSubmitRequest = (e) => {
    e.preventDefault()
    // Here you would make an API call to create the request
    console.log('Request submitted:', { requestDate, requestType, reason })
    alert('Shift request submitted! (This is a demo)')
    setShowRequestForm(false)
    setRequestDate('')
    setReason('')
  }

  return (
    <div className="shift-requests">
      <div className="requests-header">
        <h2>My Shift Requests</h2>
        <button 
          className="request-button"
          onClick={() => setShowRequestForm(!showRequestForm)}
        >
          {showRequestForm ? 'Cancel' : '+ New Request'}
        </button>
      </div>

      {showRequestForm && (
        <div className="request-form-card">
          <h3>Request Shift Change</h3>
          <form onSubmit={handleSubmitRequest}>
            <div className="form-group">
              <label>Request Type</label>
              <select 
                value={requestType} 
                onChange={(e) => setRequestType(e.target.value)}
                required
              >
                <option value="change">Change Shift</option>
                <option value="swap">Swap Shift</option>
                <option value="assign">Assign Shift</option>
              </select>
            </div>
            <div className="form-group">
              <label>Requested Date</label>
              <input
                type="date"
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a reason for this request..."
                rows="3"
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit Request</button>
          </form>
        </div>
      )}

      <div className="requests-list">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id} className="request-card">
              <div className="request-header">
                <div>
                  <h4>{request.requestType.charAt(0).toUpperCase() + request.requestType.slice(1)} Request</h4>
                  <p className="request-date">Requested for: {formatDate(request.requestedDate)}</p>
                </div>
                {getStatusBadge(request.status)}
              </div>
              <div className="request-details">
                <div className="detail-item">
                  <span className="detail-label">Original Shift:</span>
                  <span>{formatDate(request.shift?.date)} - {request.shift?.startTime} to {request.shift?.endTime}</span>
                </div>
                {request.reason && (
                  <div className="detail-item">
                    <span className="detail-label">Reason:</span>
                    <span>{request.reason}</span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">Submitted:</span>
                  <span>{formatDate(request.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">
            <p>No shift requests submitted yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShiftRequests



