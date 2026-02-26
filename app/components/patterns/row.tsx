export function Row() {
  return (
    <div className="relative flex items-center -ml-2.75 -my-2.5 w-[calc(100%+21px)] -z-1 pointer-events-none">
      <span className="relative size-5">
        <i className="w-5 h-px bg-(--border-accent) absolute top-2.5 left-0" />
        <i className="w-px h-5 bg-(--border-accent) absolute top-0 left-2.5" />
      </span>
      <span className="flex-1 border-t border-(--border-accent) border-dashed h-px" />
      <span className="relative size-5">
        <i className="w-5 h-px bg-(--border-accent) absolute top-2.5 left-0" />
        <i className="w-px h-5 bg-(--border-accent) absolute top-0 left-2.5" />
      </span>
    </div>
  )
}
