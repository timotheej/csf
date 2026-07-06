interface IconProps {
  size?: number
  color?: string
  className?: string
}

export function ExpandMoreIcon({ size = 20, color = '#00004B', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M13.2292 7.5L9.99583 10.7333L6.7625 7.5C6.4375 7.175 5.9125 7.175 5.5875 7.5C5.2625 7.825 5.2625 8.35 5.5875 8.675L9.4125 12.5C9.7375 12.825 10.2625 12.825 10.5875 12.5L14.4125 8.675C14.7375 8.35 14.7375 7.825 14.4125 7.5C14.0875 7.18333 13.5542 7.175 13.2292 7.5Z"
        fill={color}
      />
    </svg>
  )
}

export function InfoIcon({ size = 16, color = '#181D27', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M7.33333 4.66667H8.66667V6H7.33333V4.66667ZM7.33333 7.33333H8.66667V11.3333H7.33333V7.33333ZM8 1.33333C4.32 1.33333 1.33333 4.32 1.33333 8C1.33333 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8C14.6667 4.32 11.68 1.33333 8 1.33333ZM8 13.3333C5.06 13.3333 2.66667 10.94 2.66667 8C2.66667 5.06 5.06 2.66667 8 2.66667C10.94 2.66667 13.3333 5.06 13.3333 8C13.3333 10.94 10.94 13.3333 8 13.3333Z"
        fill={color}
      />
    </svg>
  )
}

export function RefreshIcon({ size = 16, color = 'white', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M11.7633 4.23333C10.7967 3.26667 9.47 2.66667 7.99667 2.66667C5.05 2.66667 2.67 5.05333 2.67 8C2.67 10.9467 5.05 13.3333 7.99667 13.3333C10.4833 13.3333 12.5567 11.6333 13.15 9.33333H11.7633C11.2167 10.8867 9.73667 12 7.99667 12C5.79 12 3.99667 10.2067 3.99667 8C3.99667 5.79333 5.79 4 7.99667 4C9.10333 4 10.09 4.46 10.81 5.18667L8.66333 7.33333H13.33V2.66667L11.7633 4.23333Z"
        fill={color}
      />
    </svg>
  )
}

export function ShareIcon({ size = 16, color = 'white', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M10.6667 3.33333L9.72 4.28L8.66 3.22V10.6667H7.34V3.22L6.28 4.28L5.33333 3.33333L8 0.666667L10.6667 3.33333ZM13.3333 6.66667V14C13.3333 14.7333 12.7333 15.3333 12 15.3333H4C3.26 15.3333 2.66667 14.7333 2.66667 14V6.66667C2.66667 5.92667 3.26 5.33333 4 5.33333H6V6.66667H4V14H12V6.66667H10V5.33333H12C12.7333 5.33333 13.3333 5.92667 13.3333 6.66667Z"
        fill={color}
      />
    </svg>
  )
}

export function ArrowForwardIcon({ size = 20, color = '#2F313C', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M10 3.33333L8.825 4.50833L13.475 9.16667H3.33333V10.8333H13.475L8.825 15.4917L10 16.6667L16.6667 10L10 3.33333Z"
        fill={color}
      />
    </svg>
  )
}
