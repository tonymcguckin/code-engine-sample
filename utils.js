

  
const welcomeMessage = "Welcome to IBM Cloud DevOps using Code Engine and Github Actions!";
const portMessage = "Application Running on port";

const getWelcomeMessage = () => {
    return welcomeMessage;
};

const getPortMessage = () => {
    return portMessage;
};

exports.getWelcomeMessage = getWelcomeMessage;
exports.getPortMessage = getPortMessage;