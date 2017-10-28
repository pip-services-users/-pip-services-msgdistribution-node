let MessageDistributionProcess = require('../obj/src/container/MessageDistributionProcess').MessageDistributionProcess;

try {
    new MessageDistributionProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
