"use client"

import { ComponentExample } from "@/components/component-example";
import { Example } from "@/components/example";
import { useTheme } from "@/components/theme-provider";

export default function Page() {
  const { setTheme } = useTheme()
  setTheme("dark")

  return <ComponentExample />;
// return <Example />;
}