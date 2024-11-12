import { Main, Section, Container } from "@/components/craft";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { LinkBreak2Icon } from "@radix-ui/react-icons";


export function NotFound() {
  return (
    <Main className="relative bg-primary h-screen grid items-center justify-center">
      <Section>
        <Container className="md:max-w-2xl border grid gap-4 rounded-lg">
          <LinkBreak2Icon className="size-12 text-white" />
          <h1 className="w-full text-white font-sans !my-0">Page not found!</h1>
          <Link to="/" preload="intent">
            <Button size={"lg"}>Let's get back home</Button>
          </Link>
        </Container>
      </Section>
    </Main>
  )
}
