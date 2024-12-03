"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformVisitRequestToVisitModel = void 0;
const transformVisitRequestToVisitModel = (visits) => {
    const visitModels = visits.map(vis => ({
        ...vis,
        time: new Date(vis.time)
    }));
    return visitModels;
};
exports.transformVisitRequestToVisitModel = transformVisitRequestToVisitModel;
//# sourceMappingURL=visit.transformer.js.map