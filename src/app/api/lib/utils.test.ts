import { validateSignupBody } from "./utils"

describe("validateSignupBody fn", () => {
  test("signup body contains valid email and password", () => {
    const result = validateSignupBody({
      email: "john@gmail.com", password: "anotherp"
    })
    expect(result.status).toBe("success");
  })
  test("signup body with invalid email returns has result.status as 'error' ", () => {
    const result = validateSignupBody({
      email: "", password: "anotherp"
    })
    expect(result.status).toBe("error")
  })
})

