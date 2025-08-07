import config from "./app/config.json";

/**
 * Environments
 */

const SHARE_MAP = {
    PROJECT_SYMBOL: "ddakple",
};

const ENV_MAP = {
    development: {
        API_URL: "http://api.ddakple.com",
        REDIRECT_URL: "",
    },
    production: {
        API_URL: "",
        REDIRECT_URL: "",
    },
};

export default {
    ...SHARE_MAP,
    ...(ENV_MAP[config.RN_ENV] || ENV_MAP.development),
};
