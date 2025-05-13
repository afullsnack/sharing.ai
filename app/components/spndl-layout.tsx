import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "@/components/animate-ui/radix/tabs";
import { Main, Section } from "./craft";
import Header from "@/components/header";
import { useNavigate, useRouter, useRouterState } from "@tanstack/react-router";
import { useState } from "react";


type ILandingLayout = {
  children: React.ReactNode;
}
export default function SpndlLayout({
  children,
}: ILandingLayout) {
  const routerState = useRouterState()
  const router = useRouter()

  const params = router.routesByPath["/~/$id/$tab"].useParams()
  console.log('Location', routerState.location)
  console.log('Router', params)

  return (
    <Main className="w-full place-items-center items-center">
      <Header />
      <Section className='lg:max-w-[75vw] min-h-screen container'>
        <MainTabs children={children} spnId={params.id} />
      </Section>
    </Main>
  )
}


interface CoreParams {id: string; tab: string};
function MainTabs({ children, spnId }: ILandingLayout & {spnId: string}) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<string>('chat')

  const updateParams = (newParams: CoreParams) => {
    navigate({
      to: '/~/$id/$tab', // Current route
      params: newParams,
      search: (prevSearch) => ({...prevSearch}), // Preserves existing query parameters
      replace: false, // Updates the current history entry
    });
  };

  const handleTabChange = (value: string) => {
    setTab(value)
    updateParams({ tab: value, id: spnId });
  };

  return (
    <Tabs defaultValue={tab} value={tab} onValueChange={(value: string) => {
      console.log('Tab value', value)
      handleTabChange(value)
    }}>
      <TabsList>
        <TabsTrigger value="chat">Chat</TabsTrigger>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContents>
        <TabsContent value="chat">{children}</TabsContent>
        <TabsContent value="metrics">{children}</TabsContent>
        <TabsContent value="settings">{children}</TabsContent>
      </TabsContents>
    </Tabs>
  )
}
