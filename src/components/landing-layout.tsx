import { Main } from "./craft";
import Footer from '@/components/footer'


type ILandingLayout = {
  children: React.ReactNode;
}
export default function LandingLayout({
  children,
}: ILandingLayout) {

  return (
    <Main className="w-full place-items-center items-center">
      <div className='lg:max-w-3xl container'>
      {children}
      </div>
      <Footer />
    </Main>
  )
}
