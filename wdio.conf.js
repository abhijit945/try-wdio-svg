/* eslint-disable no-unused-vars */
const { join } = require("path");
const { TimelineService } = require("wdio-timeline-reporter/timeline-service");
const middleware = require("webpack-dev-middleware");
const compiler = require("webpack")(require("./webpack.config.js"));
const wdioLogger = require("@wdio/logger").default;
const logger = wdioLogger("wdio-test");

exports.config = {
    host: "selenium",
    port: 4444,
    specs: ["./src/test/integration/**/*test.js"],
    exclude: [],
    maxInstances: 10,
    capabilities: [
        {
            browserName: "chrome",
            "goog:chromeOptions": {
                args: ["--headless", "--disable-gpu", "--window-size=1280,800"]
            }
        }
    ],
    sync: true,
    coloredLogs: true,
    deprecationWarnings: true,
    logLevel: "error",
    bail: 0,
    baseUrl: "http://localhost:9991",
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: [
        ["static-server"],
        [
            "image-comparison",
            {
                actualFolder: join(
                    process.cwd(),
                    "./src/test/integration/screenshots/actual/"
                ),
                diffFolder: join(
                    process.cwd(),
                    "./src/test/integration/screenshots/diff/"
                ),
                baselineFolder: join(
                    process.cwd(),
                    "./src/test/integration/screenshots/baseline/"
                ),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: join(process.cwd(), ".tmp/"),
                savePerInstance: true,
                autoSaveBaseline: true,
                blockOutStatusBar: true,
                blockOutToolBar: true
            }
        ],
        [TimelineService]
    ],
    staticServerPort: 9991,
    staticServerFolders: [
        { mount: "/", path: __dirname },
        { mount: "/", path: "./main.js" }
    ],
    staticServerMiddleware: [
        {
            mount: "/",
            middleware: middleware(compiler, {
                mode: "development",
                logLevel: "error"
            })
        }
    ],
    framework: "jasmine",
    reporters: [
        "dot",
        "spec",
        ["timeline", { outputDir: "./.coverage/timeline" }]
    ],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000
    },
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function(config, capabilities) {
        logger.info("Starting Integration tests.");
        logger.info(capabilities);
    },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession: function(config, capabilities, specs) {
        require("@babel/register");
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: function(capabilities, specs) {
        logger.info(specs);
    },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onComplete: function(exitCode, config, capabilities) {
        logger.info(exitCode);
        logger.info("All done.");
    }
};
