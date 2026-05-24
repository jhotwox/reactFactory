import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Combobox } from "@/components/ui/combobox";
// import { DropdownMenu } from "@/components/ui/dropdown-menu";
// import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// import { InputGroup } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
// import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ComponentProps, MouseEvent } from "react";
import { HugeiconsIcon, IconSvgElement, HugeiconsProps } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";

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

type WizardInputConfig = BadgeConfig | ButtonConfig | InputConfig | LabelConfig | SeparatorConfig | TextareaConfig;

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
  
  // MARK: Default
  return (
    <div>
      <span>Something wen´t wrong</span>
    </div>
  )
}

