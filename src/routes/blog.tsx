import { Container, Section } from "@/components/craft"
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router"
import { getCount } from "."
import { useEffect } from "react";
import { Button } from "@/components/ui/button";


export const Route = createFileRoute('/blog')({
  component: Blog,
  loader: () => getCount(),
  errorComponent: () => (
    <h1>An error occured</h1>
  )
})


function Blog() {
  const router = useRouter();
  const count = Route.useLoaderData();

  return (
    <Section>
      <Container>
        <h1>This is the blog page</h1>
        <span>{count}</span>
      </Container>
      <Container>
        <Button onClick={() => {
          router.invalidate();
          console.log("state invalidation clicked", count);
        }}>Invalidate state</Button>
      </Container>
      <Outlet />
    </Section>
  )
}





