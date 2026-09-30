// Regression tests for Tiptap editor integration during dependency upgrades.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

describe("React and Tiptap APIs", () => {
  it("renders React server markup", () => {
    const markup = renderToStaticMarkup(createElement("h1", null, "WorldMix"));

    assert.equal(markup, "<h1>WorldMix</h1>");
  });

  it("exposes the editor extensions", () => {
    assert.equal(StarterKit.name, "starterKit");
    assert.equal(Underline.name, "underline");
    assert.equal(Link.name, "link");
  });
});
