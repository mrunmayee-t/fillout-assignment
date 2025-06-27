import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import NavTab from './NavTab'
import { LucideIcon } from 'lucide-react'

type SortableNavTabProps = {
  id: string
  label: string
  icon?: LucideIcon
  active: boolean
  onClick: () => void
  onMenuClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function SortableNavTab({
  id,
  label,
  icon,
  active,
  onClick,
  onMenuClick,
}: SortableNavTabProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <NavTab
        id={id}
        label={label}
        icon={icon}
        active={active}
        onClick={onClick}
        onMenuClick={onMenuClick}
      />
    </div>
  )
}
