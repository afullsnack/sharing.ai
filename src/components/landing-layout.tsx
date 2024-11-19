import { Main } from "./craft";
import Footer from '@/components/footer'
import Header from "@/components/header";


type ILandingLayout = {
  children: React.ReactNode;
}
export default function LandingLayout({
  children,
}: ILandingLayout) {

  return (
    <Main className="w-full place-items-center items-center">
      <Header />
      <div className='lg:max-w-3xl container'>
        {children}
      </div>
      <Footer />
    </Main>
  )
}
