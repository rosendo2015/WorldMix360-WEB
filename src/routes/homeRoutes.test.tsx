// Regression tests for React Router behavior during dependency upgrades.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { matchRoutes } from "react-router-dom";

describe("home route", () => {
  it("extracts a dynamic route parameter", () => {
    const matches = matchRoutes(
      [{ path: "produtos/:slug", element: null }],
      "/produtos/cafeteira",
    );

    assert.equal(matches?.length, 1);
    assert.equal(matches?.[0].params.slug, "cafeteira");
  });
});
