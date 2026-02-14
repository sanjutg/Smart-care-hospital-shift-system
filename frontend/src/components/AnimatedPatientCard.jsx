import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import './AnimatedCard.css'

const AnimatedPatientCard = ({ patient }) => {
  const cardRef = useRef(null)
  const marqueeRef = useRef(null)
  const marqueeInnerRef = useRef(null)
  const animationRef = useRef(null)

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom'
  }

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return
      const content = marqueeInnerRef.current.querySelector('.marquee-content')
      if (!content) return
      const contentWidth = content.offsetWidth
      if (contentWidth === 0) return

      if (animationRef.current) {
        animationRef.current.kill()
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: 15,
        ease: 'none',
        repeat: -1
      })
    }

    const timer = setTimeout(setupMarquee, 100)
    return () => {
      clearTimeout(timer)
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [patient])

  const handleMouseEnter = (ev) => {
    if (!cardRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    )

    gsap
      .timeline({ defaults: { duration: 0.6, ease: 'expo.out' } })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
  }

  const handleMouseLeave = (ev) => {
    if (!cardRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    )

    gsap
      .timeline({ defaults: { duration: 0.6, ease: 'expo.out' } })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
  }

  const marqueeText = `${patient.name} • ${patient.patientId} • ${patient.department} •`

  return (
    <div
      ref={cardRef}
      className="animated-card patient-card-animated"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-content">
        <div className="patient-header">
          <h3 className="patient-name">{patient.name}</h3>
          <span className="patient-id">ID: {patient.patientId}</span>
        </div>

        <div className="patient-details">
          <div className="detail-item">
            <span className="detail-label">Department:</span>
            <span className="detail-value">{patient.department}</span>
          </div>

          {patient.assignedStaff && patient.assignedStaff.length > 0 ? (
            <div className="assigned-staff">
              <span className="detail-label">Assigned Staff:</span>
              <div className="staff-list">
                {patient.assignedStaff.map((staff, index) => (
                  <span key={staff._id || index} className="staff-badge">
                    {staff.name} ({staff.role})
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-assignment">
              <span className="detail-label">Assigned Staff:</span>
              <span className="detail-value no-staff">Not assigned</span>
            </div>
          )}
        </div>
      </div>

      <div
        className="card-marquee"
        ref={marqueeRef}
        style={{ backgroundColor: '#667eea', color: '#fff' }}
      >
        <div className="marquee-inner" ref={marqueeInnerRef}>
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="marquee-content">
              <span className="marquee-text">{marqueeText}</span>
              <div
                className="marquee-image"
                style={{
                  backgroundImage: `url(https://picsum.photos/150/100?random=${patient._id})`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnimatedPatientCard

