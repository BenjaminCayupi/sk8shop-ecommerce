"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: {
  title: string;
  href: string;
  links: { title: string; href: string }[];
}[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    links: [
      { title: "Usage", href: "/docs/primitives/alert-dialog/usage" },
      { title: "Examples", href: "/docs/primitives/alert-dialog/examples" },
      { title: "API", href: "/docs/primitives/alert-dialog/api" },
    ],
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    links: [
      { title: "Usage", href: "/docs/primitives/hover-card/usage" },
      { title: "Examples", href: "/docs/primitives/hover-card/examples" },
      { title: "API", href: "/docs/primitives/hover-card/api" },
    ],
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    links: [
      { title: "Usage", href: "/docs/primitives/progress/usage" },
      { title: "Examples", href: "/docs/primitives/progress/examples" },
      { title: "API", href: "/docs/primitives/progress/api" },
    ],
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    links: [
      { title: "Usage", href: "/docs/primitives/scroll-area/usage" },
      { title: "Examples", href: "/docs/primitives/scroll-area/examples" },
      { title: "API", href: "/docs/primitives/scroll-area/api" },
    ],
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    links: [
      { title: "Usage", href: "/docs/primitives/tabs/usage" },
      { title: "Examples", href: "/docs/primitives/tabs/examples" },
      { title: "API", href: "/docs/primitives/tabs/api" },
    ],
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    links: [
      { title: "Usage", href: "/docs/primitives/tooltip/usage" },
      { title: "Examples", href: "/docs/primitives/tooltip/examples" },
      { title: "API", href: "/docs/primitives/tooltip/api" },
    ],
  },
];

export function NavbarMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                <ul className="mt-2 space-y-2">
                  <SubListItem href="/docs/overview">Overview</SubListItem>
                  <SubListItem href="/docs/quickstart">Quickstart</SubListItem>
                  <SubListItem href="/docs/changelog">Changelog</SubListItem>
                </ul>
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                <ul className="mt-2 space-y-2">
                  <SubListItem href="/docs/installation/cli">CLI</SubListItem>
                  <SubListItem href="/docs/installation/manual">
                    Manual
                  </SubListItem>
                </ul>
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                <ul className="mt-2 space-y-2">
                  <SubListItem href="/docs/primitives/typography/headings">
                    Headings
                  </SubListItem>
                  <SubListItem href="/docs/primitives/typography/paragraph">
                    Paragraph
                  </SubListItem>
                  <SubListItem href="/docs/primitives/typography/blockquote">
                    Blockquote
                  </SubListItem>
                </ul>
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-5 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  <ul className="mt-2 space-y-2">
                    {component.links.map((link) => (
                      <SubListItem key={link.href} href={link.href}>
                        {link.title}
                      </SubListItem>
                    ))}
                  </ul>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { title: string; href: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <div
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">
            <Link
              href={href}
              className="hover:underline font-semibold tracking-tight"
            >
              {title}
            </Link>
          </div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </div>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const SubListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className={cn(
            "block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {children}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
SubListItem.displayName = "SubListItem";