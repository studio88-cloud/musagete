import Logo from './Logo'
import InstrumentMenu from './InstrumentMenu'

export default function TopBar({ instrument, onInstrumentChange }) {
  return (
    <header className="topbar">
      <Logo className="logo-top" />
      <InstrumentMenu value={instrument} onChange={onInstrumentChange} />
    </header>
  )
}
