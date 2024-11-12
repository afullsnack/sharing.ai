import { Link } from "@tanstack/react-router";
import { Container, Section } from "./craft";

function Footer() {
  return (
    <Section className="w-full !p-0 border">
      <Container className="!p-3 md:max-w-md lg:max-w-lg ">
        <p className="text-muted-foreground">@<a href="https://afullsnack.dev" target="_blank">afullsnack</a>{" "}All rights reserved. 2024-present</p>
      </Container>
    </Section>
  );
}

export default Footer;
