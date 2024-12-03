import { PostVisitRequestDto } from "src/contracts/dtos";
import { VisitModel } from "src/contracts/models";
export declare const transformVisitRequestToVisitModel: (visits: PostVisitRequestDto[]) => VisitModel[];
