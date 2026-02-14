import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import './AnimatedCard.css'

const AnimatedStaffCard = ({ staff }) => {
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
  }, [staff])

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

  const marqueeText = `${staff.name} • ${staff.department} • ${staff.role} •`
  const bgColor = staff.role === 'doctor' ? '#007bff' : '#28a745'

  return (
    <div
      ref={cardRef}
      className="animated-card staff-card-animated"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-content">
        <div className="staff-header">
          <span className="staff-name">{staff.name}</span>
          <span className="availability-dot available"></span>
        </div>
        <div className="staff-details">
          <div className="staff-detail-item">
            <span className="detail-label">Department:</span>
            <span>{staff.department}</span>
          </div>
          {staff.specialization && (
            <div className="staff-detail-item">
              <span className="detail-label">Specialization:</span>
              <span>{staff.specialization}</span>
            </div>
          )}
          {staff.isEmergencyAvailable && (
            <span className="emergency-badge">Emergency Available</span>
          )}
        </div>
      </div>

      <div
        className="card-marquee"
        ref={marqueeRef}
        style={{ backgroundColor: bgColor, color: '#fff' }}
      >
        <div className="marquee-inner" ref={marqueeInnerRef}>
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="marquee-content">
              <span className="marquee-text">{marqueeText}</span>
              <div
                className="marquee-image"
                style={{
                  backgroundImage: `url(https://picsum.photos/150/100?random=${staff._id})`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnimatedStaffCard

