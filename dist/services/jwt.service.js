"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJwt = decodeJwt;
const jwt = require("jsonwebtoken");
function decodeJwt(token) {
    try {
        const decoded = jwt.decode(token);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
//# sourceMappingURL=jwt.service.js.map