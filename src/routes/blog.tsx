import { Container, Section } from "@/components/craft"
import { createFileRoute, useRouter } from "@tanstack/react-router"
// import { useEffect } from "react";
// import { Button } from "@/components/ui/button";
import * as React from "react";


export const Route = createFileRoute('/blog')({
  component: Blog,
  errorComponent: () => (
    <h1>An error occured</h1>
  )
})


function Blog() {
  // const router = useRouter();

  return (
    <Section>
      <Container>
        <h1>This is the blog page</h1>
      </Container>
    </Section>
  )
}





