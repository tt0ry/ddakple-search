import axios, {
    AxiosRequestConfig,
    AxiosError,
    AxiosInstance,
    AxiosResponse,
} from "axios";
import env from "../environments";

interface IRestService {
    get: (
        url: string,
        payload?: any,
        isSecureRequest?: boolean
    ) => Promise<any>;
    post: (
        url: string,
        payload?: any,
        isSecureReqest?: boolean
    ) => Promise<any>;
    put: (url: string, payload?: any, isSecureReqest?: boolean) => Promise<any>;
    patch: (
        url: string,
        payload?: any,
        isSecureReqest?: boolean
    ) => Promise<any>;
    delete: (
        url: string,
        payload?: any,
        isSecureReqest?: boolean
    ) => Promise<any>;
    request: (config: AxiosRequestConfig) => Promise<any>;
}

const axiosConfig = {
    baseURL: env.API_URL,
    validateStatus: (status) => status < 400,
};

let isOnRefreshing: boolean;
let requestQueue: any[];
let api: AxiosInstance;

isOnRefreshing = false;
requestQueue = [];
api = axios.create({
    baseURL: env.API_URL,
    validateStatus: (status: number): boolean => status < 400,
});

const RestService = {
    get: null,
    post: null,
    put: null,
    patch: null,
    delete: null,
    request: null,
};

/**
 * 요청 정보 반환 함수
 * @param customConfig 요청정보에 추가적으로 담을 옵션
 */
const getRequestConfig = async (
    isSecureRequest,
    customConfig?: AxiosRequestConfig,
    data?: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
    let config: AxiosRequestConfig = {};
    try {
        if (customConfig) {
            config = Object.assign(config, customConfig);
        }

        if (data) {
            config.data = {
                data,
            };
        }

        return config;
    } catch (error) {
        return config;
    }
};

/**
 *
 * @param url 요청 보낼 주소
 * @param payload 요청시 담을 데이터(HTTP Body)
 */
RestService.get = async (
    url: string,
    payload: any = null,
    isSecureRequest: boolean = true
): Promise<any> => {
    const config: AxiosRequestConfig = await getRequestConfig(isSecureRequest, {
        data: payload,
    });
    return api.get(url, config);
};

/**
 * POST 요청
 * @param url 요청을 보낼 주소
 * @param payload 요청시 담을 데이터(HTTP Body)
 */
RestService.post = async (
    url: string,
    payload: any = null,
    isSecureRequest: boolean = true
): Promise<any> => {
    const config: AxiosRequestConfig = await getRequestConfig(isSecureRequest);
    return api.post(url, payload, config);
};

/**
 * PUT 요청
 * @param url 요청을 보낼 주소
 * @param payload 요청시 담을 데이터(HTTP Body)
 */
RestService.put = async (
    url: string,
    payload: any = null,
    isSecureRequest: boolean = true
): Promise<any> => {
    const config = await getRequestConfig(isSecureRequest);
    return api.put(url, payload, config);
};

/**
 * PATCH 요청
 * @param url 요청을 보낼 주소
 * @param payload 요청시 담을 데이터(HTTP Body)
 */
RestService.patch = async (
    url: string,
    payload: any = null,
    isSecureRequest: boolean = true
): Promise<any> => {
    const config = await getRequestConfig(isSecureRequest);
    return api.patch(url, payload, config);
};

/**
 * DELETE 요청
 * @param url 요청을 보낼 주소
 * @param isSecureRequest 보안요청 여부
 */
RestService.delete = async (
    url: string,
    data?: any,
    isSecureRequest: boolean = true
): Promise<any> => {
    const config = await getRequestConfig(isSecureRequest, { data: data });
    return api.delete(url, config);
};

export default RestService as IRestService;
