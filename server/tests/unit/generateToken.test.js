import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { generateToken, getCookieOptions } from "../../src/utils/generateToken.js";

test("JWT generateToken and getCookieOptions tests", async (t) => {
  const originalSecret = process.env.JWT_SECRET;
  const originalNodeEnv = process.env.NODE_ENV;

  t.afterEach(() => {
    process.env.JWT_SECRET = originalSecret;
    process.env.NODE_ENV = originalNodeEnv;
  });

  await t.test("generateToken should sign a valid JWT token", () => {
    process.env.JWT_SECRET = "test_jwt_secret_key_123";
    const payload = { id: "user123" };
    const token = generateToken(payload);

    assert.ok(token);
    const decoded = jwt.verify(token, "test_jwt_secret_key_123");
    assert.equal(decoded.id, "user123");
    assert.ok(decoded.exp);
  });

  await t.test("getCookieOptions should return non-secure configuration in development mode", () => {
    process.env.NODE_ENV = "development";
    const options = getCookieOptions();

    assert.deepEqual(options, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  });

  await t.test("getCookieOptions should return secure configuration in production mode", () => {
    process.env.NODE_ENV = "production";
    const options = getCookieOptions();

    assert.deepEqual(options, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  });
});
