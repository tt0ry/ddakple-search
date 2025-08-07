/**
 * 대회 명단 목록 API
 */

import { ListRequest, ListResponse } from "@/types/resultListType";
import RestService from "services/RestService";

const getList = async ({ name }: ListRequest): Promise<ListResponse> => {
    const url = `/list?name=${name}`;

    try {
        const { data } = await RestService.get(url);
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};

const getListInfo = async ({
    name,
    competitionId,
    category,
    tournamentType,
    source,
}): Promise<ListResponse> => {
    const url = `/matchResults?name=${name}&competitionId=${competitionId}&category=${category}&tournamentType=${tournamentType}&source=${source}`;

    try {
        const { data } = await RestService.get(url);
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    getList,
    getListInfo,
};
