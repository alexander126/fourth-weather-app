import {
  formatForecastFullDate,
  formatForecastShortDay,
  formatForecastTime,
} from "@/utils/forecast-date";

describe("forecast date formatting", () => {
  test("formats shifted forecast times without applying the device timezone twice", () => {
    const shiftedDate = new Date(Date.UTC(2026, 2, 16, 2, 0, 0));

    expect(formatForecastTime(shiftedDate)).toBe("2:00 AM");
  });

  test("formats shifted forecast dates using the shifted day itself", () => {
    const shiftedDate = new Date(Date.UTC(2026, 2, 17, 0, 0, 0));

    expect(formatForecastFullDate(shiftedDate)).toBe("Tuesday, Mar 17");
    expect(formatForecastShortDay(shiftedDate)).toBe("Tue");
  });
});
