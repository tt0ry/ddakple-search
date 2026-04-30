import config from "./app/config.json";

/**
 * Environments
 */

const SHARE_MAP = {
    PROJECT_SYMBOL: "ddakple",
};

const ENV_MAP = {
    development: {
        API_URL: "https://api.ddakple.com",
        REDIRECT_URL: "",
        API_KEY: "xK9#mP2qL8vN5wR4tH7yJ3bF6cD1eA0z",
    },
    production: {
        API_URL: "",
        REDIRECT_URL: "",
        API_KEY: "xK9#mP2qL8vN5wR4tH7yJ3bF6cD1eA0z",
    },
};

export default {
    ...SHARE_MAP,
    ...(ENV_MAP[config.RN_ENV] || ENV_MAP.development),
};
