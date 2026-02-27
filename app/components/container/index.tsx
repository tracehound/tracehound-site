import { PropsWithChildren } from 'react'

export function Container({ children }: PropsWithChildren) {
  return (
    <div className="w-full mx-auto max-w-[calc(100%-96px)] xl:max-w-[calc(100%-192px)]">
      {children}
    </div>
  )
}
