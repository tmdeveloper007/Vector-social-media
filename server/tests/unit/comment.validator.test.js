import test from "node:test";
import assert from "node:assert/strict";
import { commentSchema } from "../../src/validators/comment.validator.js";

test("Comment Schema Validator Tests", async (t) => {
  await t.test("should successfully validate a correct comment", () => {
    const validComment = {
      post: "60c72b2f9b1d8b2bad000001",
      content: "This is a great post! I really enjoyed reading it.",
    };

    const result = commentSchema.safeParse(validComment);
    assert.equal(result.success, true);
    assert.deepEqual(result.data, {
      post: "60c72b2f9b1d8b2bad000001",
      content: "This is a great post! I really enjoyed reading it.",
    });
  });

  await t.test("should fail validation if post ID is invalid", () => {
    const invalidComment = {
      post: "invalid-post-id",
      content: "Nice post!",
    };

    const result = commentSchema.safeParse(invalidComment);
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].message, "Invalid Post ID format!");
  });

  await t.test("should fail validation if comment content is empty", () => {
    const invalidComment = {
      post: "60c72b2f9b1d8b2bad000001",
      content: "   ",
    };

    const result = commentSchema.safeParse(invalidComment);
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].message, "Comment content cannot be empty!");
  });

  await t.test("should fail validation if comment content exceeds 500 characters", () => {
    const invalidComment = {
      post: "60c72b2f9b1d8b2bad000001",
      content: "a".repeat(501),
    };

    const result = commentSchema.safeParse(invalidComment);
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].message, "Comment content must be at most 500 characters!");
  });
});
