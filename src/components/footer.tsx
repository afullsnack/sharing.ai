import { Link } from "@tanstack/react-router";
import { Container, Section } from "./craft";

function Footer() {
  return (
    <Section className="w-full !p-0 border">
      <Container className="!p-0 py-5 px-3 w-full lg:max-w-3xl">
        <p className="text-muted-foreground">@<a href="https://afullsnack.dev" target="_blank">afullsnack</a>{" "}All rights reserved. 2024-present</p>
      </Container>
    </Section>
  );
}

export default Footer;
