import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../hooks/context/useGlobalContext";

export default function DynamicBreadcrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname
    .split("/")
    .filter((i) => i && !/^\d+$/.test(i));

  const formatBreadcrumb = (text) => {
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const breadcrumbItems =
    pathSnippets.length > 0
      ? pathSnippets.map((snippet, index) => {
          const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSnippets.length - 1;

          return {
            title: isLast ? (
              <span className="text-black font-semibold">
                {formatBreadcrumb(snippet)}
              </span>
            ) : (
              <Link to={url} className="text-gray-500 hover:text-black">
                {formatBreadcrumb(snippet)}
              </Link>
            ),
          };
        })
      : [];

  return (
    <Breadcrumb
      className={`mb-2 `}
      items={[
        {
          title: (
            <Link to="/" className="text-gray-500 hover:text-black">
              Home
            </Link>
          ),
        },
        ...breadcrumbItems,
      ]}
    />
  );
}
