import test from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "../../src/validators/contact.validator.js";

test("Contact Schema Validator Tests", async (t) => {
  await t.test("should successfully validate a correct contact submission", () => {
    const validContact = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Inquiry about services",
      message: "Hello, I would like to know more about the features offered by your platform.",
    };

    const result = contactSchema.safeParse(validContact);
    assert.equal(result.success, true);
    assert.deepEqual(result.data, {
      name: "John Doe",
      email: "john@example.com",
      subject: "Inquiry about services",
      message: "Hello, I would like to know more about the features offered by your platform.",
    });
  });

  await t.test("should fail validation if name is too short", () => {
    const invalidContact = {
      name: "J",
      email: "john@example.com",
      subject: "Inquiry about services",
      message: "Hello, I would like to know more about the features offered by your platform.",
    };

    const result = contactSchema.safeParse(invalidContact);
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].message, "Name must be at least 2 characters!");
  });

  await t.test("should fail validation if email is invalid", () => {
    const invalidContact = {
      name: "John Doe",
      email: "invalid-email",
      subject: "Inquiry about services",
      message: "Hello, I would like to know more about the features offered by your platform.",
    };

    const result = contactSchema.safeParse(invalidContact);
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].message, "Invalid email format!");
  });

  await t.test("should fail validation if subject is too short", () => {
    const invalidContact = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Hi",
      message: "Hello, I would like to know more about the features offered by your platform.",
    };

    const result = contactSchema.safeParse(invalidContact);
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].message, "Subject must be at least 3 characters!");
  });

  await t.test("should fail validation if message is too short", () => {
    const invalidContact = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Inquiry about services",
      message: "Short",
    };

    const result = contactSchema.safeParse(invalidContact);
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].message, "Message must be at least 10 characters!");
  });
});
