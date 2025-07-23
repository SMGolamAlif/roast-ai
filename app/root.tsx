
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStylesheetUrl from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
];

export const meta: MetaFunction = () => [
  { title: "Roast AI" },
  { name: "description", content: "Get roasted by AI!" },
];

export default function App() {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-black text-white min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
