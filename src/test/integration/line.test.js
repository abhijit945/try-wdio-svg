
describe("Line Graph", () => {
    beforeEach(() => {
        browser.url("/");
    });

    it("should save some screenshots", () => {
        browser
            .checkElement(
                $("#root"),
                ".carbon-graph-container"
            )
            .toEqual(0);
    });
});
