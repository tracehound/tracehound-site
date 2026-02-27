export function MobileNav() {
  return (
    <button className="size-10 flex items-center justify-center bg-(--accent-primary) xl:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="var(--foreground)"
        className="size-6 pointer-events-none select-none"
        viewBox="0 0 256 256">
        <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
      </svg>
    </button>
  )
}
