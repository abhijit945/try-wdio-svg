import * as axe from "axe-core";
const wdioLogger = require("@wdio/logger").default;
const logger = wdioLogger("AXE-CORE");

const a11ySpecsList = ["wcag2a", "wcag2aa", "wcag21aa", "section508"];

const getAxeResult = () => {
    const result = browser.executeAsync(
        function(opts, done) {
            axe.run(document, opts, function(error, result) {
                done({ error, result });
            });
        },
        {
            restoreScroll: true,
            runOnly: a11ySpecsList
        }
    );
    logger.error(result.result.violations);
    return result;
};

export { getAxeResult };
