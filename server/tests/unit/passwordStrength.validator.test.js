import test from "node:test";
import assert from "node:assert/strict";
import { registerSchema } from "../../src/validators/user.validator.js";

test("Password Strength Complexity Schema Tests", async (t) => {
  const baseUserData = {
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    phoneNumber: "+919876543210",
    username: "johndoe",
    bio: "Developer",
    description: "I love coding",
  };

  await t.test("should successfully validate when password meets all strength criteria", () => {
    const validUser = {
      ...baseUserData,
      password: "SafePassword123",
    };

    const result = registerSchema.safeParse(validUser);
    assert.equal(result.success, true);
  });

  await t.test("should fail validation when password is under 6 characters", () => {
    const invalidUser = {
      ...baseUserData,
      password: "P1a",
    };

    const result = registerSchema.safeParse(invalidUser);
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].message, "Password must be at least 6 characters!");
  });

  await t.test("should fail validation when password lacks an uppercase letter", () => {
    const invalidUser = {
      ...baseUserData,
      password: "safepassword123",
    };

    const result = registerSchema.safeParse(invalidUser);
    assert.equal(result.success, false);
    assert.equal(
      result.error.issues[0].message,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number!"
    );
  });

  await t.test("should fail validation when password lacks a lowercase letter", () => {
    const invalidUser = {
      ...baseUserData,
      password: "SAFEPASSWORD123",
    };

    const result = registerSchema.safeParse(invalidUser);
    assert.equal(result.success, false);
    assert.equal(
      result.error.issues[0].message,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number!"
    );
  });

  await t.test("should fail validation when password lacks a numeric digit", () => {
    const invalidUser = {
      ...baseUserData,
      password: "SafePassword",
    };

    const result = registerSchema.safeParse(invalidUser);
    assert.equal(result.success, false);
    assert.equal(
      result.error.issues[0].message,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number!"
    );
  });
});
