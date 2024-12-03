export type GetVisitResponseDto = {
    url: string;
    visit_time: Date;
};
export type GetVisitRequestDto = {
    organization_id: string;
    offset?: number;
    limit?: number;
};
export type PostVisitRequestDto = {
    url: string;
    visit_time: Date;
};
export type BulkVisitRequestDto = {
    visits: PostVisitRequestDto[];
    organization_id: string;
};
