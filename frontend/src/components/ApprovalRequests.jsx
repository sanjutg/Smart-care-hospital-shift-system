import './ApprovalRequests.css'

const ApprovalRequests = ({ requests }) => {
  const formatDate = (date) => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleApprove = (requestId) => {
    // Here you would make an API call to approve the request
    console.log('Approving request:', requestId)
    alert('Request approved! (This is a demo)')
  }

  const handleReject = (requestId) => {
    // Here you would make an API call to reject the request
    console.log('Rejecting request:', requestId)
    alert('Request rejected! (This is a demo)')
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="no-data">
        <p>No pending approval requests at this time.</p>
      </div>
    )
  }

  const pendingRequests = requests.filter(req => req.status === 'pending')

  if (pendingRequests.length === 0) {
    return (
      <div className="no-data">
        <p>No pending approval requests at this time.</p>
      </div>
    )
  }

  return (
    <div className="approval-requests">
      <h2>Pending Shift Requests</h2>
      <div className="requests-list">
        {pendingRequests.map((request) => (
          <div key={request._id} className="approval-card">
            <div className="approval-header">
              <div>
                <h3>
                  {request.requestedBy?.name} - {request.requestType.charAt(0).toUpperCase() + request.requestType.slice(1)} Request
                </h3>
                <p className="requester-info">
                  {request.requestedBy?.role} | {request.requestedBy?.department}
                </p>
              </div>
              <span className="status-badge status-pending">Pending</span>
            </div>

            <div className="approval-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Current Shift:</span>
                  <span>{formatDate(request.shift?.date)} - {request.shift?.startTime} to {request.shift?.endTime}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Requested Date:</span>
                  <span>{formatDate(request.requestedDate)}</span>
                </div>
              </div>
              {request.reason && (
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Reason:</span>
                    <span>{request.reason}</span>
                  </div>
                </div>
              )}
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Submitted:</span>
                  <span>{formatDate(request.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="approval-actions">
              <button 
                className="approve-button"
                onClick={() => handleApprove(request._id)}
              >
                Approve
              </button>
              <button 
                className="reject-button"
                onClick={() => handleReject(request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApprovalRequests


