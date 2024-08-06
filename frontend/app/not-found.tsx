import React, { Suspense } from "react";
import NotFound from "./components/NotFound/NotFound";

export default function notFound() {
  return (
    <Suspense>
      <NotFound />
    </Suspense>
  );
}
