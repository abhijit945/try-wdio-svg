import * as axe from "axe-core";
import { getAxeResult } from "./helpers";

describe("Line Graph", () => {
    beforeEach(() => {
        browser.url("/");
        browser.execute(axe.source);
    });

    it("should save some screenshots", () => {
        const axeResult = getAxeResult();
        expect(
            browser.checkElement($("#root"), ".carbon-graph-container")
        ).toBe(0);
        // expect(axeResult.result.violations.length).toBe(0);
    });
});
