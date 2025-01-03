import React from "react";
import { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ANON_SERVER_URL } from "@/app/constants";
import SaveUserToState from "./components/saveUserToState";

type Params = { username: string };

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

  console.log({ jsonResponse });

  if (!jsonResponse.data) {
    throw new Error("User not available");
  }

  return jsonResponse.data as User;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { username } = await params;
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
          url:
            user.profileUrl ??
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fventurebeat.com%2Fmarketing%2Fthe-anonymous-user-5-steps-to-engage-them-convert-them-and-grow-revenue%2F&psig=AOvVaw0ocIbkpotBpS56ySzRRG58&ust=1735953028781000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjlqo6v2IoDFQAAAAAdAAAAABAI",
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
      images: [
        user.profileUrl ??
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fventurebeat.com%2Fmarketing%2Fthe-anonymous-user-5-steps-to-engage-them-convert-them-and-grow-revenue%2F&psig=AOvVaw0ocIbkpotBpS56ySzRRG58&ust=1735953028781000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjlqo6v2IoDFQAAAAAdAAAAABAI",
      ],
    },
  };
}

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { username } = await params;
  const user = await getUserByUsername(username);
  return (
    <>
      <SaveUserToState user={user} />
      {children}
    </>
  );
}
