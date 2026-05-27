import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxChips,
  ComboboxValue,
  ComboboxChip,
  ComboboxChipsInput,
  useComboboxAnchor,
  ComboboxCollection,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
} from "@/components/ui/combobox";
// import { DropdownMenu } from "@/components/ui/dropdown-menu";
// import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// import { InputGroup } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
// import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import React, { ComponentProps, Fragment, JSX, MouseEvent, SetStateAction } from "react";
import { HugeiconsIcon, IconSvgElement, HugeiconsProps } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { AriaCombobox } from "../node_modules/@base-ui/react/esm/combobox/root/AriaCombobox.js";

// type InputType = "badge" | "button" | "input" | "label" | "select" | "separator" | "textarea" |"description";

type IconPosition = "left" | "right";

type IconConfig = {
  // Custom
  Icon?: IconSvgElement;
  iconPosition?: IconPosition;
  
  // Props
  iconColor?: string;
  strokeWidth?: number;
  iconProps?: Omit<HugeiconsProps, "color" | "strokeWidth">;
}

type LoadingIconProps = {
  loading: boolean;
  loadingIcon?: IconSvgElement;
  icon: IconSvgElement;
  color?: string;
  strokeWidth?: number;
  iconProps?: Omit<HugeiconsProps, "color" | "strokeWidth">;
};

type IGenericConfig = IconConfig & {
  title: string;
  disabled?: boolean;
};

type INotSoGenericConfig = IconConfig & {
  title: string;
}

// type ClickButtonProps = {
//   onClick: () => void;
// };
type OnClick = () => unknown | null;
// type OnClick = () => void;
// type onClickEvt = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

export type BadgeConfig = INotSoGenericConfig & {
    type: "badge";
    variant?: ComponentProps<typeof Badge>["variant"];
    loading?: boolean;
    props?: Omit<ComponentProps<typeof Badge>, "variant">;
}

export type ButtonConfig = IGenericConfig & {
    type: "button";
    variant?: ComponentProps<typeof Button>["variant"];
    size?: ComponentProps<typeof Button>["size"];
    onClick?: OnClick;
    loading?: boolean;
    loadingIcon?: IconSvgElement;
    // Don't allow onClick, variant, size, etc. in props
    // I'm not sure about children, maybe we can allow it if Icon is not provided
    props?: Omit<ComponentProps<typeof Button>, "onClick" | "variant" | "size" | "disabled" | "children">;
}

type customItem = {
  code: string;
  label: string;
  description?: string;
}

type multiCustomItemChip = {
  chipValue: string,
  key: string
}

type ComboboxValueType = unknown;
type ComboboxEventDetails = AriaCombobox.ChangeEventDetails;
// type ComboboxEventDetails = ComponentProps<typeof Combobox>["onValueChange"]

type ComboboxOnValueChange =
  | ((value: ComboboxValueType, eventDetails?: ComboboxEventDetails) => void)
  | React.Dispatch<SetStateAction<ComboboxValueType>>
  | React.Dispatch<SetStateAction<ComboboxValueType[]>>

export type ComboboxConfig = {
  type: "combobox";
  value: ComponentProps<typeof Combobox>["value"];
  onValueChange: ComboboxOnValueChange;
  // onValueChange: ComponentProps<typeof Combobox>["onValueChange"] | ((value: SetStateAction<null>) => void);
  disabled?: boolean;
  placeholder?: string;
  items: string[] | customItem[];
  emptyText?: string;
  defaultValue?: string;
  showClear?: boolean;
  multiple?: boolean;
  customItem?: (props: { item: unknown }) => React.ReactNode;
  multiCustomItem?: multiCustomItemChip;
  ariaInvalid?: boolean;
  props?: Omit<ComponentProps<typeof Combobox>, "items" | "defaultValue" | "multiple" | "disabled">;
  // variant ?: ComponentProps<typeof Combobox>[""]
}

type groupedItems = {
  value: string;
  items: string[];
}

export type ComboboxGroupConfig = {
  type: "comboboxgroup";
  value: ComponentProps<typeof Combobox>["value"];
  onValueChange: ComboboxOnValueChange;
  disabled?: boolean;
  placeholder?: string;
  items: groupedItems[];
  emptyText?: string;
  defaultValue?: string;
  showClear?: boolean;
  multiple?: boolean;
  customItem?: (props: { item: unknown }) => React.ReactNode;
  multiCustomItem?: multiCustomItemChip;
  groups?: boolean;
  ariaInvalid?: boolean;
  props?: Omit<ComponentProps<typeof Combobox>, "items" | "defaultValue" | "multiple" | "disabled">;
  // variant ?: ComponentProps<typeof Combobox>[""]
}

export type InputConfig = IGenericConfig & {
    type: "input";
    props?: ComponentProps<typeof Input>;
}

export type LabelConfig = IGenericConfig & {
    type: "label";
    props?: ComponentProps<typeof Label>;
}

export type SeparatorConfig = {
    type: "separator";
    props?: ComponentProps<typeof Separator>;
}

export type TextareaConfig = IGenericConfig & {
    type: "textarea";
    props?: ComponentProps<typeof Textarea>;
}

type WizardInputConfig = BadgeConfig | ButtonConfig | ComboboxConfig | ComboboxGroupConfig | InputConfig | LabelConfig | SeparatorConfig | TextareaConfig;

type WizardInputProps = {
  config: WizardInputConfig
}

const LoadingIcon = ({loading, icon, loadingIcon, color, strokeWidth, iconProps}: LoadingIconProps) => (
  loading ? (
    <HugeiconsIcon
      icon={loadingIcon || Loading03Icon}
      color={color}
      strokeWidth={strokeWidth}
      className="animate-spin"
      // {...iconProps}
    />
  ) : (
    <HugeiconsIcon
      icon={icon}
      color={color}
      strokeWidth={strokeWidth}
      {...iconProps}
    />
  )
)

export function WizardInput({ config }: WizardInputProps) {
  // For Combobox, to position the content
  const anchor = useComboboxAnchor();

  // MARK: Button
  if (config.type === "button") {
    // Generic props
    const disabled = (config as ButtonConfig)?.disabled ?? false;
    
    const variant = (config as ButtonConfig)?.variant ?? "default";
    const loading = (config as ButtonConfig)?.loading ?? false;
    const onClick = (config as ButtonConfig)?.onClick;
    let size: ComponentProps<typeof Button>["size"] = null;
    if (config.title === "" && config.Icon)
      size = (config as ButtonConfig)?.size ?? "icon";
    else
      size = (config as ButtonConfig)?.size ?? "default";
    
    // Icon
    const iconPosition = (config as ButtonConfig)?.iconPosition ?? "right";
    const iconColor = (config as ButtonConfig)?.iconColor ?? undefined;
    const strokeWidth = (config as ButtonConfig)?.strokeWidth ?? 2;

    return (
      <Button
        onClick={onClick}
        variant={variant}
        size={size}
        disabled={disabled}
        {...config.props}
      >
        { (config?.Icon && iconPosition === "left") && (
          <LoadingIcon
            loading={loading}
            icon={config?.Icon}
            loadingIcon={config?.loadingIcon}
            color={iconColor}
            strokeWidth={strokeWidth}
            iconProps={config?.iconProps}
          />
          )}
        {config.title}
        { (config?.Icon && iconPosition === "right") && (
          <LoadingIcon
            loading={loading}
            icon={config?.Icon}
            loadingIcon={config?.loadingIcon}
            color={iconColor}
            strokeWidth={strokeWidth}
            iconProps={config?.iconProps}
          />
        )}
      </Button>
    )
  }

  // MARK: Badge
  if (config.type === "badge") {
    const variant = (config as BadgeConfig)?.variant ?? "default";

    // Icon
    const iconPosition = (config as BadgeConfig)?.iconPosition ?? "right";
    const iconColor = (config as BadgeConfig)?.iconColor ?? undefined;
    const strokeWidth = (config as BadgeConfig)?.strokeWidth ?? 2;
    
    return (
      <Badge variant={variant} {...config.props}>
        { (config?.Icon && iconPosition === "left") && (
          <HugeiconsIcon
            icon={config?.Icon}
            color={iconColor}
            strokeWidth={strokeWidth}
            {...config?.iconProps}
          />
        )}
        {config.title}
        { (config?.Icon && iconPosition === "right") && (
          <HugeiconsIcon
            icon={config?.Icon}
            color={iconColor}
            strokeWidth={strokeWidth}
            {...config?.iconProps}
          />
        )}
      </Badge>
    )
  }

  // MARK: Combobox
  if (config.type === "combobox") {
    const placeholder = (config as ComboboxConfig)?.placeholder ?? "Select";
    const emptyText = (config as ComboboxConfig)?.emptyText ?? "Not found";
    const defaultValue = (config as ComboboxConfig)?.defaultValue ?? null;
    const showClear = (config as ComboboxConfig)?.showClear ?? false;
    const disabled = (config as ComboboxConfig)?.disabled ?? false;
    const CustomItem = (config as ComboboxConfig)?.customItem ?? false;
    const ariaInvalid = (config as ComboboxConfig)?.ariaInvalid ?? false;
    
    const multiple = (config as ComboboxConfig)?.multiple ?? false;
    const multiCustomItem = (config as ComboboxConfig)?.multiCustomItem ?? null;
    const chipValue = multiCustomItem?.chipValue ?? null;
    const key = multiCustomItem?.key ?? null;

    console.log("chipValue - key: ", {chipValue, key })
    
    // If onValueChange is setStateAction, wrap it in a function that calls setValue1 with the new value, otherwise use it directly
    const handleValueChange = (value: ComboboxValueType, eventDetails: ComboboxEventDetails) => {
      if (typeof config.onValueChange === "function") {
        if (config.onValueChange.length >= 2) {
          (config.onValueChange as (v: ComboboxValueType, e?: ComboboxEventDetails) => void)(value, eventDetails);
        } else {
          (config.onValueChange as React.Dispatch<SetStateAction<ComboboxValueType>>)(value);
        }
      }
    }
    
    return (
      <Combobox
        items={config.items}
        defaultValue={multiple ? undefined : defaultValue}
        disabled={disabled}
        multiple={multiple}
        value={config.value}
        onValueChange={handleValueChange}
        {...config.props}
      >
        {!multiple ? (
          <ComboboxInput placeholder={placeholder} showClear={showClear} aria-invalid={ariaInvalid} className="w-full max-w-xs" />
        ) : (
        <ComboboxChips ref={anchor} className="w-full max-w-xs">
          <ComboboxValue>
            {(values) => (
              <Fragment>
                {values.map((value: string | object) => {
                  if (CustomItem && typeof value === "object" && value !== null) {
                    const v = value as Record<string, unknown>;
                    const objectKey = typeof key === "string" ? key : "";
                    const objectChipValue = typeof chipValue === "string" ? chipValue : "";
                    console.log("Value key: ", value[objectKey])
                    console.log("Value label: ", value[objectChipValue])
                    return <ComboboxChip key={v[objectKey] as React.Key} aria-invalid={ariaInvalid} >
                      {v[objectChipValue] as React.ReactNode}
                    </ComboboxChip>
                  }
                  
                  return <ComboboxChip key={String(value)}>{String(value)}</ComboboxChip>
                }
                )}
                <ComboboxChipsInput aria-invalid={ariaInvalid} placeholder={(config.value as unknown[]).length > 0 ? "" : placeholder} />
              </Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        )}
        
        <ComboboxContent anchor={multiple ? anchor : undefined}>
          <ComboboxEmpty>{emptyText}</ComboboxEmpty>
          <ComboboxList>
            {(item, index) => (
              CustomItem ? (
                <CustomItem item={item} key={index} />
              )
              : (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              ) 
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  }
  
  // MARK: ComboboxGroup
  if (config.type === "comboboxgroup") {
    const placeholder = (config as ComboboxGroupConfig)?.placeholder ?? "Select";
    const emptyText = (config as ComboboxGroupConfig)?.emptyText ?? "Not found";
    const defaultValue = (config as ComboboxGroupConfig)?.defaultValue ?? null;
    const showClear = (config as ComboboxGroupConfig)?.showClear ?? false;
    const disabled = (config as ComboboxGroupConfig)?.disabled ?? false;
    const CustomItem = (config as ComboboxGroupConfig)?.customItem ?? false;
    const ariaInvalid = (config as ComboboxGroupConfig)?.ariaInvalid ?? false;
    
    const multiple = (config as ComboboxGroupConfig)?.multiple ?? false;
    const multiCustomItem = (config as ComboboxGroupConfig)?.multiCustomItem ?? null;
    const chipValue = multiCustomItem?.chipValue;
    const key = multiCustomItem?.key;

    const handleValueChange = (value: ComboboxValueType, eventDetails: ComboboxEventDetails) => {
      if (typeof config.onValueChange === "function") {
        if (config.onValueChange.length >= 2) {
          (config.onValueChange as (v: ComboboxValueType, e?: ComboboxEventDetails) => void)(value, eventDetails);
        } else {
          (config.onValueChange as React.Dispatch<SetStateAction<ComboboxValueType>>)(value);
        }
      }
    }

    return (
      <Combobox
        items={config.items}
        defaultValue={multiple ? undefined : defaultValue}
        disabled={disabled}
        multiple={multiple}
        value={config.value}
        onValueChange={handleValueChange}
        {...config.props}
      >
        {!multiple ? (
          <ComboboxInput placeholder={placeholder} showClear={showClear} className="w-full max-w-xs" aria-invalid={ariaInvalid} />
        ) : (
          <ComboboxChips ref={anchor} className="w-full max-w-xs">
            <ComboboxValue>
              {(values) => (
              <Fragment>
                {values.map((value: string | object) => {
                  if (CustomItem && typeof value === "object" && value !== null) {
                    const v = value as Record<string, unknown>;
                    const objectKey = typeof key === "string" ? key : "";
                    const objectChipValue = typeof chipValue === "string" ? chipValue : "";
                    return <ComboboxChip key={v[objectKey] as React.Key} aria-invalid={ariaInvalid}>
                      {v[objectChipValue] as React.ReactNode}
                    </ComboboxChip>
                  }
                  
                  return <ComboboxChip key={String(value)}>{String(value)}</ComboboxChip>
                }
                )}
                <ComboboxChipsInput aria-invalid={ariaInvalid} placeholder={(config.value as unknown[]).length > 0 ? "" : placeholder}/>
              </Fragment>
            )}
            </ComboboxValue>
          </ComboboxChips>
        )}
        
        <ComboboxContent anchor={multiple ? anchor : undefined}>
          <ComboboxEmpty>{emptyText}</ComboboxEmpty>
          <ComboboxList>
            {(group, index)=> (
              <ComboboxGroup key={group.value} items={group.items}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item, index) => (
                    CustomItem ? (
                      <CustomItem item={item} key={index} />
                    )
                    : (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )
                  )}
                </ComboboxCollection>
                {index < config.items.length -1 && <ComboboxSeparator />}
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  }
  
  // MARK: Default
  return (
    <div>
      <span>Something wen´t wrong</span>
    </div>
  )
}

