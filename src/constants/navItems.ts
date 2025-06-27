

import {Info, FileText, CircleCheck } from "lucide-react";

export const initialNavItems = [
    {
      id: "1",
      label: "Info",
      href: "/info",
      icon: Info,
      active: true,
      disabled: false,
    },
    {
      id: "2",
      label: "Details",
      href: "/about",
      icon: FileText,
      active: false,
      disabled: false,
    },
    {
      id: "3",
      label: "Other",
      href: "/contact",
      icon: FileText,
      active: false,
      disabled: false,
    },
    {
      id: "4",
      label: "Ending",
      href: "/ending",
      icon: CircleCheck,
      active: false,
      disabled: false,
    },
  ];