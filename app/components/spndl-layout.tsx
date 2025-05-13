import { Main } from "./craft";
import Header from "@/components/header";


type ILandingLayout = {
  children: React.ReactNode;
}
export default function SpndlLayout({
  children,
}: ILandingLayout) {

  return (
    <Main className="w-full place-items-center items-center">
      <Header />
      <div className='lg:max-w-[75vw] min-h-screen container'>
        {children}
      </div>
    </Main>
  )
}
