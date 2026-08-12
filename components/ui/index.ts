// =============================================================================
// FitCalc Hub Design System — UI Component Barrel
// =============================================================================

// Primitives
export { Button, buttonVariants, type ButtonProps } from "./button";
export { Input, inputVariants, type InputProps } from "./input";
export { Textarea, textareaVariants, type TextareaProps } from "./textarea";
export { Label } from "./label";

// Form controls
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "./select";
export { Checkbox } from "./checkbox";
export { RadioGroup, RadioGroupItem } from "./radio-group";
export { Switch } from "./switch";

// Display
export { Badge, badgeVariants, type BadgeProps } from "./badge";
export { Avatar, AvatarImage, AvatarFallback } from "./avatar";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
  type CardProps,
} from "./card";

// Overlays
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog";
export { Modal } from "./modal";
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./drawer";
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "./popover";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./dropdown-menu";

// Navigation
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb";
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationControls,
} from "./pagination";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

// Data display
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table";
export { DataGrid, type DataGridColumn } from "./data-grid";

// Feedback
export { Skeleton, SkeletonLoader } from "./skeleton";
export { Spinner, LoadingSpinner, type SpinnerProps } from "./spinner";

// Theme & motion
export { ThemeToggle } from "./theme-toggle";
export { MotionFade, MotionScale } from "./motion";

// Typography
export {
  Heading,
  Text,
  Lead,
  Muted,
  Blockquote,
  Code,
  type HeadingProps,
  type TextProps,
} from "./typography";
