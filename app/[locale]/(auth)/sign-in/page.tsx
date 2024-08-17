import Image from 'next/image'
import SignInForm from './sign-in-form'

export default function Page() {
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='w-[400px] h-full flex flex-col justify-between '>
        <div className='flex-1 flex flex-col items-center justify-center'>
          <Image src='/images/logo.png' alt='logo' width={80} height={80} />
          <p className='font-bold text-xl text-primary pt-2'>Sweet Coffee</p>
        </div>
        <div className='flex-1'>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
