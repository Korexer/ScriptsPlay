import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
interface SEOProps {
  title: string;
  description: string;
  article?: boolean;
  noindex?: boolean;
}
export default function SEO({
  title,
  description,
  article = false,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    document
      .querySelectorAll("[data-sp-fallback]")
      .forEach((tag) => tag.remove());
  }, []);
  const { pathname } = useLocation();
  const url =
    "https://www.scriptsplay.com" +
    (pathname === "/" ? "/" : pathname.replace(/\/$/, ""));
  return (
    <Helmet>
      <title>{title + " | ScriptsPlay"}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title + " | ScriptsPlay"} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="ScriptsPlay" />
      <meta
        property="og:image"
        content="https://www.scriptsplay.com/images/social-whiteboard.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="robots"
        content={noindex ? "noindex,follow" : "index,follow"}
      />
    </Helmet>
  );
}
