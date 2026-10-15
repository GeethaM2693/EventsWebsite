// Illustrative map drawings (no real map yet). Swap for a real map component at integration.
const text = { fontFamily: 'Manrope, sans-serif', fontSize: 13, fill: '#62685F' }
const pinNum = { fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 800, fill: '#fff' }

const maps = {
  nearby: {
    box: '0 0 640 420',
    label: 'Map preview of Madhapur with four nearby sample events marked',
    lake: 'M380 250c40-30 110-20 130 20s-20 90-70 90-100-70-60-110z',
    roads: [['M-10 120 C 160 140, 300 90, 650 140', 14], ['M120 -10 C 140 140, 180 300, 150 430', 12], ['M-10 320 C 200 300, 420 360, 650 330', 10], ['M420 -10 C 400 120, 340 220, 330 430', 8]],
    names: [[404, 312, 'Durgam Cheruvu'], [22, 104, 'Hitech City Rd']],
    you: [250, 200],
    pins: [[200, 150], [350, 110], [470, 80], [450, 260]],
  },
  city: {
    box: '0 0 640 520',
    label: 'Map of Hyderabad with sample events marked',
    lake: 'M300 230c40-30 110-20 130 20s-20 90-70 90-100-70-60-110z',
    roads: [['M-10 140 C 160 160, 300 110, 650 160', 14], ['M120 -10 C 140 160, 180 340, 150 530', 12], ['M-10 380 C 200 360, 420 420, 650 390', 10], ['M480 -10 C 460 140, 400 260, 390 530', 8]],
    names: [[330, 292, 'Hussain Sagar']],
    pins: [[200, 200], [90, 110], [250, 80], [300, 300], [520, 330], [440, 450]],
  },
  venue: {
    box: '0 0 560 300',
    label: 'Map preview of the venue on Necklace Road beside Hussain Sagar',
    lake: 'M180 70c80-40 230-30 270 40s-30 150-140 150-210-120-130-190z',
    roads: [['M130 300 C 120 200, 140 90, 230 40 S 470 20, 560 60', 12], ['M0 230 C 120 220, 240 280, 560 250', 8]],
    names: [[270, 160, 'Hussain Sagar', 14]],
    venuePin: [150, 150],
  },
}

export default function MapSketch({ variant = 'nearby', className = '' }) {
  const m = maps[variant]
  const [w, h] = m.box.split(' ').slice(2)
  return (
    <svg viewBox={m.box} width="100%" className={`block ${className}`} role="img" aria-label={m.label}>
      <rect width={w} height={h} fill="#E8EDE5" />
      <path d={m.lake} fill="#F7F5EF" stroke="#E5E3DA" strokeWidth="2" />
      {m.roads.map(([d, sw]) => <path key={d} d={d} stroke="#fff" strokeWidth={sw} fill="none" />)}
      {m.names.map(([x, y, t, size]) => <text key={t} x={x} y={y} style={{ ...text, fontSize: size ?? 13 }}>{t}</text>)}
      {m.you && (
        <>
          <circle cx={m.you[0]} cy={m.you[1]} r="9" fill="#36563B" stroke="#fff" strokeWidth="3" />
          <text x={m.you[0] + 16} y={m.you[1] + 5} style={{ ...text, fontWeight: 700, fill: '#263D2A' }}>You</text>
        </>
      )}
      {m.pins?.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="16" fill={i === 0 ? '#C95335' : '#36563B'} />
          <text x={x} y={y + 6} textAnchor="middle" style={pinNum}>{i + 1}</text>
        </g>
      ))}
      {m.venuePin && (
        <>
          <circle cx={m.venuePin[0]} cy={m.venuePin[1]} r="18" fill="#C95335" stroke="#fff" strokeWidth="3" />
          <circle cx={m.venuePin[0]} cy={m.venuePin[1]} r="6" fill="#fff" />
        </>
      )}
    </svg>
  )
}
