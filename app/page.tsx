"use client"

import {
  BadgeConfig,
  ButtonConfig,
  ComboboxConfig,
  ComboboxGroupConfig,
  InputConfig,
  InputOnChangeValues,
  WizardInput
} from "@/components/wizard-input";
import { useTheme } from "@/components/theme-provider";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"
import { LogoutIcon, PlusSignIcon, BadgeCheck, BookmarkAddIcon } from "@hugeicons/core-free-icons"
import { ComponentExample } from "@/components/component-example";
import { ComboboxItem } from "@/components/ui/combobox";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { WizardForm, WizardFormConfig } from "@/components/wizard-form";
// import { PlusSignIcon, BluetoothIcon, MoreVerticalCircle01Icon, FileIcon, FolderIcon, FolderOpenIcon, CodeIcon, MoreHorizontalCircle01Icon, SearchIcon, FloppyDiskIcon, DownloadIcon, EyeIcon, LayoutIcon, PaintBoardIcon, SunIcon, MoonIcon, ComputerIcon, UserIcon, CreditCardIcon, SettingsIcon, KeyboardIcon, LanguageCircleIcon, NotificationIcon, MailIcon, ShieldIcon, HelpCircleIcon, File01Icon, LogoutIcon } from "@hugeicons/core-free-icons"

export default function Page() {

  const [value1, setValue1] = useState<unknown>(null);
  const [value2, setValue2] = useState<unknown[]>([]);
  const [value3, setValue3] = useState<unknown>(null);
  const [value4, setValue4] = useState<unknown[]>([]);
  const [value5, setValue5] = useState<unknown>(null);
  const [value6, setValue6] = useState<unknown[]>([]);
  const [value7, setValue7] = useState<unknown>(null);
  const [value8, setValue8] = useState<unknown[]>([]);
  
  const [inputValue1, setInputValue1] = useState<InputOnChangeValues>("");
  const [inputValue2, setInputValue2] = useState<InputOnChangeValues>("");
  const [inputValue3, setInputValue3] = useState<InputOnChangeValues>("");
  const [inputValue4, setInputValue4] = useState<InputOnChangeValues>("");

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

  const ComboboxConfig = {
    type: "combobox",
    title: "Simple Combobox",
    value: value1,
    onValueChange: setValue1,
    items: ["item 1", "item 2", "item 3"],
    emptyText: "No encontrado",
    placeholder: "Items",
    // multiple: true,
    // showClear: true,
    // defaultValue: "item 2",
  } satisfies ComboboxConfig;
  
  const ComboboxMultiConfig = {
    type: "combobox",
    title: "Simple Combobox Multiple",
    value: value2,
    onValueChange: setValue2,
    items: ["item 1", "item 2", "item 3"],
    emptyText: "No encontrado",
    placeholder: "Items",
    multiple: true,
    // showClear: true,
    // defaultValue: "item 2",
  } satisfies ComboboxConfig;
  
  const CustomItem = ({ item }) => (
    <ComboboxItem key={item} value={item.label} className="flex flex-col px-3 py-2 gap-0.5">
      <span className="font-medium text-base">{item.label}</span>
      {item.description && (
        <span className="text-xs text-muted-foreground">{item.description}</span>
      )}
      {item.code && (
        <span className="text-xs text-muted-foreground">{item.code}</span>
      )}
    </ComboboxItem>
  )
  
  const CustomGroupItem = ({ item }) => (
    <ComboboxItem key={item} value={item} className="flex flex-col px-3 py-2 gap-0.5">
    <span className="font-medium text-base">{item}</span>
    {item && (
      <span className="text-xs text-muted-foreground">{item}</span>
    )}
  </ComboboxItem>
  )

  const ComboboxCustomConfig = {
    type: "combobox",
    title: "Custom Combobox",
    value: value3,
    onValueChange: setValue3,
    items: [
      { code: "", description: "", label: "Select country" },
      { code: "ar", label: "Argentina", description: "South America"},
      { code: "au", label: "Australia", description: "Oceania" },
      { code: "br", label: "Brazil", description: "South America" },
    ],
    emptyText: "No encontrado",
    placeholder: "Selecciona país",
    // multiple: true,
    customItem: CustomItem,
    showClear: true,
    // defaultValue: "item 2",
    // ariaInvalid: true,
  } satisfies ComboboxConfig;
  
  const ComboboxMultiCustomConfig = {
    type: "combobox",
    title: "Custom Combobox Multiple",
    value: value4,
    onValueChange: setValue4,
    items: [
      { code: "ar", label: "Argentina", description: "South America"},
      { code: "au", label: "Australia", description: "Oceania" },
      { code: "br", label: "Brazil", description: "South America" },
    ],
    emptyText: "No encontrado",
    placeholder: "Selecciona paises",
    customItem: CustomItem,
    multiple: true,
    multiCustomItem: { chipValue: "label", key: "code" },
    // ariaInvalid: true,
  } satisfies ComboboxConfig;

  const groupItems = [
    {
      value: "Americas",
      items: [
        "(GMT-5) New York",
        "(GMT-8) Los Angeles",
        "(GMT-6) Chicago",
        "(GMT-5) Toronto",
        "(GMT-8) Vancouver",
        "(GMT-3) São Paulo",
      ],
    },
    {
      value: "Europe",
      items: [
        "(GMT+0) London",
        "(GMT+1) Paris",
        "(GMT+1) Berlin",
        "(GMT+1) Rome",
        "(GMT+1) Madrid",
        "(GMT+1) Amsterdam",
      ],
    },
    {
      value: "Asia/Pacific",
      items: [
        "(GMT+9) Tokyo",
        "(GMT+8) Shanghai",
        "(GMT+8) Singapore",
        "(GMT+4) Dubai",
        "(GMT+11) Sydney",
        "(GMT+9) Seoul",
      ],
    },
  ];
  
  const ComboboxGroupConfig = {
    type: "comboboxgroup",
    title: "Group Combobox",
    value: value5,
    onValueChange: setValue5,
    items: groupItems,
    emptyText: "No encontrado",
    placeholder: "Items",
    multiple: false,
    // ariaInvalid: true,
    showClear: true,
  } satisfies ComboboxGroupConfig;
  
  const ComboboxGroupMultiConfig = {
    type: "comboboxgroup",
    title: "Group Combobox Multiple",
    value: value6,
    onValueChange: setValue6,
    items: groupItems,
    emptyText: "No encontrado",
    placeholder: "Items",
    multiple: true,
    // ariaInvalid: true,
    showClear: true,
  } satisfies ComboboxGroupConfig;
  
  const ComboboxGroupCustomConfig = {
    type: "comboboxgroup",
    title: "Custom Group Combobox",
    value: value7,
    onValueChange: setValue7,
    items: groupItems,
    emptyText: "No encontrado",
    placeholder: "Items",
    multiple: false,
    // ariaInvalid: true,
    showClear: true,
    customItem: CustomGroupItem,
  } satisfies ComboboxGroupConfig;
  
  const ComboboxGroupMultiCustomConfig = {
      type: "comboboxgroup",
      title: "Custom Group Combobox Multiple",
      value: value8,
    onValueChange: setValue8,
      items: groupItems,
      emptyText: "No encontrado",
      placeholder: "Items",
      multiple: true,
      // ariaInvalid: true,
      showClear: true,
      customItem: CustomGroupItem,
      // multiCustomItem: { chipValue: "label", key: "code" },
  } satisfies ComboboxGroupConfig;

  const InputConfig = {
    type: "input",
    title: "username",
    value: inputValue1,
    onChange: setInputValue1,
    inputType: "text",
    placeholder: "",
    fieldLabel: "Username",
    // fieldLabelBadge: { text: "Required", variant: "destructive" },
    fieldLabelBadge: { text: "beta", variant: "outline" },
    fieldDescription: "Please enter your username",
    // disabled: true,
    // ariaInvalid: true,
    // fieldOrientation: "horizontal",
    required: true,
    requiredIndicator: "*",
    // inputGroup: {
    //   text: "http://",
    //   icon: PlusSignIcon,
    //   // iconPosition: "left"
    // },
  } satisfies InputConfig;

  const InputGroupConfig = {
    type: "input",
    title: "username",
    value: inputValue2,
    onChange: setInputValue2,
    inputType: "url",
    placeholder: "www.example.com",
    fieldLabel: "URL",
    // fieldLabelBadge: { text: "Required", variant: "destructive" },
    // fieldLabelBadge: { text: "beta", variant: "outline" },
    // fieldDescription: "Please enter the URL of your website",
    // disabled: true,
    // ariaInvalid: true,
    // fieldOrientation: "horizontal",
    // required: true,
    // requiredIndicator: "*",
    inputGroup: {
      text: "http://",
      icon: PlusSignIcon,
      // iconPosition: "left"
    },
  } satisfies InputConfig;

  const FormConfig = {
    title: "First form",
    description: "This is the first form created",
    fields: [
      {
        type: "input",
        value: inputValue1,
        onChange: setInputValue1,
        title: "name",
        placeholder: "John",
        fieldLabel: "Name"
      } satisfies InputConfig,
      {
        type: "input",
        value: inputValue2,
        onChange: setInputValue2,
        title: "lastname",
        placeholder: "Doe",
        fieldLabel: "Lastname"
      } satisfies InputConfig,
      {
        type: "input",
        value: inputValue3,
        onChange: setInputValue3,
        title: "email",
        placeholder: "john.doe@example.com",
        fieldLabel: "Email"
      } satisfies InputConfig,
      {
        type: "input",
        value: inputValue4,
        onChange: setInputValue4,
        title: "phone",
        placeholder: "+1 123 456 7890",
        fieldLabel: "Phone"
      }
    ],
    agrupation: [
      // ["name", "lastname", "email", "phone"]
      // ["email", "lastname", "name", "phone"]
      {
        title: "Personal Information",
        fields: ["lastname", "name"]
      },
      {
        title: "Contact Information",
        fields: ["phone", "email"],
      }
    ]
  } satisfies WizardFormConfig;

  // return <ComponentExample />;
  
  // BUTTON EXAMPLES
  // return (
  //   <div className="flex items-center gap-1">
  //     <WizardInput config={{...buttonConfig, iconPosition: "left"}} />
  //     <WizardInput config={buttonConfig} />
  //     <WizardInput config={{...buttonConfig, onClick: testMal, Icon: LogoutIcon, iconPosition: "left", title: "Salir"}} />
  //     <WizardInput config={{...buttonConfig, title: "", size: "icon-lg", onClick: () => testParams("Hello, world!")}} />
  //   </div>
  // )
  // return <WizardInput config={buttonConfig} />;

  // BADGE EXAMPLES
  // return <WizardInput config={badgeConfig} />;
  // return (
    //   <div className="mt-2 ml-2 flex items-center gap-1">
    //     <WizardInput config={badgeConfig} />
    //     <WizardInput config={{...badgeConfig, Icon: BookmarkAddIcon}} />
    //     <WizardInput config={{...badgeConfig, Icon: PlusSignIcon}} />
    //   </div>
    // )
    
  // COMBOBOX EXAMPLES
  // return (
  //   <div className="mt-2 ml-2 items-center gap-1">
  //     <h3>Simple combobox</h3>
  //     <div className="flex gap-2 mb-4">
  //       <WizardInput config={ComboboxConfig} />
  //       <WizardInput config={ComboboxMultiConfig} />
  //     </div>

  //     <h3>Custom combobox</h3>
  //     <div className="flex gap-2 mb-4">
  //       <WizardInput config={ComboboxCustomConfig} />
  //       <WizardInput config={ComboboxMultiCustomConfig} />
  //     </div>

  //     <h3>Group combobox</h3>
  //     <div className="flex gap-2 mb-4">
  //       <WizardInput config={ComboboxGroupConfig} />
  //       <WizardInput config={ComboboxGroupMultiConfig} />
  //     </div>

  //     <h3>Custom group combobox</h3>
  //     <div className="flex gap-2 mb-4">
  //       <WizardInput config={ComboboxGroupCustomConfig} />
  //       <WizardInput config={ComboboxGroupMultiCustomConfig} />
  //     </div>
  //   </div>
  // )

    // INPUT EXAMPLES
    // return (
    //   <div>
    //     <WizardInput config={InputConfig} />
    //     <WizardInput config={InputGroupConfig} />
    //   </div>
    // )

    // WizardForm EXAMPLES
    return <WizardForm config={FormConfig} />
};