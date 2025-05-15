"use client"
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
  export default function Bar() {
    return (
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        {/* <div aria-label="left">downallet</div> */}
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    );
  }