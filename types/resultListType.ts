export interface List {
    id: number;
    category: string;
    competitionName: string;
    competitionYear: number;
    level: string;
    ranking: string;
    region: string;
    source: string;
    teamName: string;
    user1: string;
    user2: string;
}

export interface ListRequest {
    name: string;
}

export interface ListResponse {
    data: List[];
}

export interface ListInfo {
    courtNum: string;
    date: string;
    group1Score: string;
    group1User1: string;
    group1User1TeamName: string;
    group1User2: string;
    group1User2TeamName: string;
    group2Score: string;
    group2User1: string;
    group2User1TeamName: string;
    group2User2: string;
    group2User2TeamName: string;
    num: string;
    round: string;
    time: string;
}
