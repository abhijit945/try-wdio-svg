describe("Line Graph", () => {
    beforeEach(() => {
        browser.url("/");
    });

    it("should save some screenshots", () => {
        expect(
            browser.checkElement($("#root"), ".carbon-graph-container")
        ).toBe(0);
    });
});
