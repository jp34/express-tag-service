"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_1 = require("../domain/error");
const service_1 = require("./service");
const router = (0, express_1.Router)();
router.post("/api/tags", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request.body.data;
        if (!payload)
            throw new error_1.InvalidInputError('data');
        const data = yield (0, service_1.createTag)(payload);
        response.status(200).json({ data });
        next();
    }
    catch (err) {
        next(err);
    }
}));
router.get("/api/tags", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let offset;
        let limit;
        if (request.query.offset)
            offset = +request.query.offset;
        if (request.query.limit)
            limit = +request.query.limit;
        const data = yield (0, service_1.findTags)({}, offset, limit);
        response.status(200).json({ data });
        next();
    }
    catch (err) {
        next(err);
    }
}));
router.get("/api/tags/:name", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.params.name)
            throw new error_1.InvalidInputError("Id");
        const data = yield (0, service_1.findTag)({ name: request.params.name });
        response.status(200).json({ data });
        next();
    }
    catch (err) {
        next(err);
    }
}));
router.put("/api/tags/:name", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = request.params.name;
        if (!name)
            throw new error_1.InvalidInputError("name");
        if (request.query.label)
            yield (0, service_1.updateTagLabel)({ name }, request.query.label.toString());
        if (request.query.parent)
            yield (0, service_1.updateTagParent)({ name }, request.query.parent.toString());
        if (request.query.ref)
            yield (0, service_1.updateTagRef)({ name }, request.query.ref.toString());
        response.status(200).json({ data: true });
        next();
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/api/tags/:name", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.params.name)
            throw new error_1.InvalidInputError("Id");
        const deleted = yield (0, service_1.deleteTag)({ name: request.params.name });
        response.status(200).json({ data: { deleted } });
        next();
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
