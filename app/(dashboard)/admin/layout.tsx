import HeaderAdmin from '@/components/layout/admin/header-admin'

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <HeaderAdmin />
      {children}
    </main>
  )
}
