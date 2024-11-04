import BackpageUser from '@/components/layout/backpage-user'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <BackpageUser />
      {children}
    </div>
  )
}
