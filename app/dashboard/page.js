"use client";
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Profile from '../components/Profile';

const page = () => {
  // const { data: session } = useSession();
  //   const router = useRouter();
  //   if(!session){
  //     router.push("/login");
  //   }
  return (
    <Profile/>
  )
}

export default page