import { generateRangedDateStrings, getDateStringFromDateTimeString, validateSignupBody } from "./utils"

// describe("validateSignupBody fn", () => {
//   test("signup body contains valid email and password", () => {
//     const result = validateSignupBody({
//       email: "john@gmail.com", password: "anotherp"
//     })
//     expect(result.status).toBe("success");
//   })
//   // test("signup body with invalid email returns has result.status as 'error' ", () => {
//   //   const result = validateSignupBody({
//   //     email: "", password: "anotherp"
//   //   })
//   //   expect(result.status).toBe("error")
//   // })
// })


// describe("generateDays fn", () => {
//   test("date values between from and to date strings are generated", () => {
//     const result = generateRangedDateStrings("2024-05-08", "2024-05-12");
//     console.log("dates: ", result);
//   })
//
//   test("date values that cause overflowing to new month works properly", () => {
//     const result = generateRangedDateStrings("2024-12-30", "2025-01-03");
//     console.log("dates2: ", result);
//   })
// })


describe("getDateStringFromDateTimeString", () => {
  test("split happens on a date string without time", () => {
    const res = getDateStringFromDateTimeString("2024-05-02T14:05:51.570Z")

    expect(res).toBe("2024-05-02")
  })
})
