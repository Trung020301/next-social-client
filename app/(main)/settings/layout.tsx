import Backpage from '@/components/layout/backpage'
import Header from '@/components/layout/header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Backpage />
      {children}
    </div>
  )
}
