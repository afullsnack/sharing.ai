import { Link } from "@tanstack/react-router";
import { Container, Section } from "./craft";
import {
  Rotate3D,
  Asterisk,
  Sparkle,
} from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { CustomEvents, publish } from "@/lib/events";
import { Memo } from "@legendapp/state/react";
import { op } from "@/lib/openpanel";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/tanstack-start"

function Header() {
  // TODO: toggle certains things based on login state
  return (
    <Section className="w-full !p-0 border">
      <Container className="flex !p-3 md:max-w-md lg:max-w-2xl container justify-between items-center">
        <Link to="/" className="no-underline">
          <div className="flex items-center gap-2">
            <Button variant={"secondary"} size={"icon"}>
              <Memo>
                {() => getLogo()}
              </Memo>
            </Button>
            <span className="font-sans font-bold text-sm no-underline">spndl_</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <UserAuthButton />
          <Button onClick={() => {
            publish(CustomEvents.ShowWaitlistDialog);
            op.track('join_waitlist_btn_clicked');
          }}>Join waitlist</Button>
          <ThemeToggle />
        </div>
      </Container>
    </Section>
  );
}

function UserAuthButton() {
  return (
    <div>
      <SignedIn>
        {/*<SignOutButton />*/}
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>

  )
}

const getLogo = (): React.ReactNode => {
  const randNum = Math.random() * 100;
  console.log(randNum, ":::random number");
  if (randNum < 45) {
    return <Rotate3D className="text-black dark:text-white" />
  } else if (randNum < 75) {
    return <Asterisk className="text-black dark:text-white" />
  } else {
    return <Sparkle className="text-black dark:text-white" />
  }
}

export default Header;
