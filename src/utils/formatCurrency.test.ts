// Regression tests for currency formatting during dependency upgrades.
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  formatCurrencyBRL,
  formatCurrencyInput,
  parseCurrencyBRL,
} from "./formatCurrency";

describe("currency formatting", () => {
  it("formats numeric and empty values as Brazilian reais", () => {
    assert.equal(formatCurrencyBRL(1234.56).replace(/\s/g, ""), "R$1.234,56");
    assert.equal(formatCurrencyBRL(null), "R$ 0,00");
  });

  it("parses formatted Brazilian currency", () => {
    assert.equal(parseCurrencyBRL("R$ 1.234,56"), 1234.56);
  });

  it("formats typed digits as a currency input", () => {
    assert.equal(formatCurrencyInput("123456"), "1.234,56");
  });
});
