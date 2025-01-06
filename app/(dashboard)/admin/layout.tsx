import HeaderAdmin from '@/components/layout/admin/header-admin'

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='md:w-primary md:m-auto'>
      <HeaderAdmin />
      {children}
    </main>
  )
}
