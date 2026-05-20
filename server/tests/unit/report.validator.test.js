import test from "node:test";
import assert from "node:assert/strict";
import { reportSchema } from "../../src/validators/report.validator.js";

test("Report Schema Validator Tests", async (t) => {
  await t.test("should successfully validate a correct post report", () => {
    const validReport = {
      targetType: "post",
      targetId: "60c72b2f9b1d8b2bad000001",
      reason: "spam",
      details: "This is spam content.",
    };

    const result = reportSchema.safeParse(validReport);
    assert.equal(result.success, true);
    assert.deepEqual(result.data, {
      ...validReport,
    });
  });

  await t.test("should successfully validate a correct comment report without details", () => {
    const validReport = {
      targetType: "comment",
      targetId: "60c72b2f9b1d8b2bad000002",
      reason: "harassment",
    };

    const result = reportSchema.safeParse(validReport);
    assert.equal(result.success, true);
    assert.equal(result.data.targetType, "comment");
    assert.equal(result.data.targetId, "60c72b2f9b1d8b2bad000002");
    assert.equal(result.data.reason, "harassment");
    assert.equal(result.data.details, ""); // default value from schema
  });

  await t.test("should fail validation if targetType is invalid", () => {
    const invalidReport = {
      targetType: "user",
      targetId: "60c72b2f9b1d8b2bad000001",
      reason: "spam",
    };

    const result = reportSchema.safeParse(invalidReport);
    assert.equal(result.success, false);
    assert.match(result.error.issues[0].message, /expected one of/i);
  });

  await t.test("should fail validation if targetId is not a valid ObjectId hex", () => {
    const invalidReport = {
      targetType: "post",
      targetId: "invalid-id",
      reason: "spam",
    };

    const result = reportSchema.safeParse(invalidReport);
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].message, "Invalid target ID format!");
  });

  await t.test("should fail validation if reason is invalid", () => {
    const invalidReport = {
      targetType: "post",
      targetId: "60c72b2f9b1d8b2bad000001",
      reason: "invalid_reason",
    };

    const result = reportSchema.safeParse(invalidReport);
    assert.equal(result.success, false);
    assert.match(result.error.issues[0].message, /expected one of/i);
  });

  await t.test("should fail validation if details are too long", () => {
    const invalidReport = {
      targetType: "post",
      targetId: "60c72b2f9b1d8b2bad000001",
      reason: "spam",
      details: "a".repeat(1001),
    };

    const result = reportSchema.safeParse(invalidReport);
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].message, "Details must be at most 1000 characters!");
  });
});
