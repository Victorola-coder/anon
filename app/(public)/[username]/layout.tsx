import React from "react";
import { Metadata } from "next";
import { ANON_SERVER_URL } from "@/app/constants";
import SaveUserToState from "./components/saveUserToState";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

const getUserByUsername = async (slug: string) => {
  const response = await fetch(`${ANON_SERVER_URL}/api/user/${slug}`, {
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  const jsonResponse = await response.json();
  if (!jsonResponse.data) {
    throw new Error("User not available");
  }
  return jsonResponse.data as User;
};

export async function generateMetadata(params: {
  username: string;
}): Promise<Metadata> {
  const { username } = params;
  const user = await getUserByUsername(username);
  return {
    title: `${user.username}`,
    description: `Send me a secret anonymous message.`,
    openGraph: {
      title: `${user.username} | Anonymous`,
      description: `Send me a secret anonymous message.`,
      url: `https://anon.xyz/${user.username}`,
      siteName: "Anon",
      images: [
        {
          url: user.profileUrl ?? "https://example.com/default-profile.png",
          width: 1000,
          height: 1000,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.username} | Anonymous`,
      description: `Send me a secret anonymous message.`,
      creator: "Adesokan Emmanuel (devFemzy)",
      images: [user.profileUrl ?? "https://example.com/default-profile.png"],
    },
  };
}

export default async function UserLayout({ children, params }: LayoutProps) {
  const { username } = params;
  const user = await getUserByUsername(username);
  return (
    <>
      <SaveUserToState user={user} />
      {children}
    </>
  );
}
