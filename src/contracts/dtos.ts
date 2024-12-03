//ToDO GetVisitResponseDto - docu
export type GetVisitResponseDto = {
    url: string;
    visit_time: Date;
}

//ToDO GetVisitRequestDto - docu
export type GetVisitRequestDto = {
    organization_id: string;
    offset?: number;
    limit?: number
}


//ToDO PostVisitRequestDto - docu
export type PostVisitRequestDto = {
    url: string;
    visit_time: Date;
}
//ToDO BulkVisitRequestDto - docu
export type BulkVisitRequestDto = {
    visits: PostVisitRequestDto[];
    organization_id: string;
}