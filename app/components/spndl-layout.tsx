import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "@/components/animate-ui/radix/tabs";
import { Main, Section } from "./craft";
import Header from "@/components/header";
import { useNavigate, useRouter } from "@tanstack/react-router";


type ILandingLayout = {
  children: React.ReactNode;
}
export default function SpndlLayout({
  children,
}: ILandingLayout) {
  const router = useRouter()
  const params = router.routesByPath["/~/$id/$tab"].useParams()

  return (
    <Main className="w-full place-items-center items-center">
      <Header />
      <Section className='lg:max-w-3xl min-h-full container'>
        <MainTabs children={children} spnId={params.id} currentTab={params.tab} />
      </Section>
    </Main>
  )
}


interface CoreParams {id: string; tab: string};
function MainTabs({ children, spnId, currentTab }: ILandingLayout & {spnId: string; currentTab: string}) {
  const navigate = useNavigate();

  const updateParams = (newParams: CoreParams) => {
    navigate({
      to: '/~/$id/$tab', // route to navigate to
      params: newParams,
      search: (prevSearch) => ({...prevSearch}), // Preserves existing query parameters
      replace: false, // Updates the current history entry
    });
  };

  const handleTabChange = (value: string) => {
    updateParams({ tab: value, id: spnId });
  };

  return (
    <Tabs defaultValue={currentTab ?? 'chat'} value={currentTab} onValueChange={(value: string) => handleTabChange(value)}>
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
