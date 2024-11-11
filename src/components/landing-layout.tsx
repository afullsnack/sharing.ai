import { Main, Section, Container } from "./craft";
import Footer from '@/components/footer'


type ILandingLayout = {
  children: React.ReactNode;
}
export default function LandingLayout({
  children,
}: ILandingLayout) {

  return (
    <Main>
      <Main className='lg:max-w-3xl grid place-items-center items-center mx-auto !my-0'>
        {children}
      </Main>
      <Footer />
    </Main>
  )
}
