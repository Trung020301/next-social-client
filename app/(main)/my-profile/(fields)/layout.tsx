import HeaderMyProfileLayout from '@/components/layout/header-my-profile'

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='md:w-primary md:m-auto'>
      <HeaderMyProfileLayout />
      <main className='mt-12'>{children}</main>
    </div>
  )
}
