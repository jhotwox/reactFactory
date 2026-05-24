"use client"

import { BadgeConfig, ButtonConfig, WizardInput } from "@/components/wizard-input";
import { useTheme } from "@/components/theme-provider";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"
import { LogoutIcon, PlusSignIcon, BadgeCheck, BookmarkAddIcon } from "@hugeicons/core-free-icons"
import { ComponentExample } from "@/components/component-example";
// import { PlusSignIcon, BluetoothIcon, MoreVerticalCircle01Icon, FileIcon, FolderIcon, FolderOpenIcon, CodeIcon, MoreHorizontalCircle01Icon, SearchIcon, FloppyDiskIcon, DownloadIcon, EyeIcon, LayoutIcon, PaintBoardIcon, SunIcon, MoonIcon, ComputerIcon, UserIcon, CreditCardIcon, SettingsIcon, KeyboardIcon, LanguageCircleIcon, NotificationIcon, MailIcon, ShieldIcon, HelpCircleIcon, File01Icon, LogoutIcon } from "@hugeicons/core-free-icons"

export default function Page() {
  
  const { setTheme } = useTheme();
  setTheme("dark");

  function test() {
    alert("Alert");
  }
  function testMal() {
    alert("Ocurrio error");
  }
  function testParams(msg: string) {
    alert(msg);
  }

  const badgeConfig = {
    type: "badge",
    title: "Verified",
    // variant: "default",
    // props: { 
    // },
    Icon: BadgeCheck,
    // iconColor: "#0FF",
    iconPosition: "left",
    // iconProps: {
    // },
  } satisfies BadgeConfig;

  const buttonConfig = {
    type: "button",
    title: "Test",
    iconPosition: "right",
    Icon: PlusSignIcon,
    onClick: test,
    size: "lg",
    variant: "outline",
    strokeWidth: 2,
    iconColor: "#FF0",
    // disabled: true,
    // loading: true,
    // loadingIcon: BookmarkAddIcon,
    props: {
      // children: <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />,
      // className: "p-4"
      // children: <a href="https://www.google.com">Link</a>
    },
    iconProps: {}
  } satisfies ButtonConfig;

  // return <ComponentExample />;
  // return (
  //   <div className="flex items-center gap-1">
  //     <WizardInput config={{...buttonConfig, iconPosition: "left"}} />
  //     <WizardInput config={buttonConfig} />
  //     <WizardInput config={{...buttonConfig, onClick: testMal, Icon: LogoutIcon, iconPosition: "left", title: "Salir"}} />
  //     <WizardInput config={{...buttonConfig, title: "", size: "icon-lg", onClick: () => testParams("Hello, world!")}} />
  //   </div>
  // )

  // return <WizardInput config={buttonConfig} />;
  // return <WizardInput config={badgeConfig} />;
  // return (
  //   <div className="mt-2 ml-2 flex items-center gap-1">
  //     <WizardInput config={badgeConfig} />
  //     <WizardInput config={{...badgeConfig, Icon: BookmarkAddIcon}} />
  //     <WizardInput config={{...badgeConfig, Icon: PlusSignIcon}} />
  //   </div>
  // )

};