import { useCallback, useEffect, useState } from "react";

// --- CUSTOM ROUTER HOOK FOR SEO & SHAREABILITY ---
export function getRouteFromLocation() {
  const pathRoute = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (pathRoute && pathRoute !== "index.html") {
    return decodeURIComponent(pathRoute);
  }

  const hashRoute = window.location.hash.replace(/^#\/?/, "");
  return hashRoute || "inicio";
}

export function routeToPath(route) {
  return route === "inicio" ? "/" : `/${route}`;
}

export function useRouter() {
  const [route, setRoute] = useState(getRouteFromLocation);

  useEffect(() => {
    const handleRouteChange = (event) => {
      const pathRoute = window.location.pathname.replace(/^\/+|\/+$/g, "");
      const hasPathRoute = Boolean(pathRoute && pathRoute !== "index.html");
      setRoute(getRouteFromLocation());
      if (!(event?.type === "hashchange" && hasPathRoute)) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const navigate = useCallback((newRoute) => {
    window.history.pushState(null, "", routeToPath(newRoute));
    setRoute(newRoute);
    window.scrollTo(0, 0);
  }, []);

  return { route, navigate };
}
