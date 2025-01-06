import BackpageUser from '@/components/layout/backpage-user'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='md:w-primary md:m-auto'>
      <BackpageUser />
      <main className='mt-12'>{children}</main>
    </div>
  )
}
