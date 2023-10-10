import { Router, Request, Response, NextFunction } from "express";
import { CreateTagPayload } from "../domain/dto";
import { InvalidInputError } from "../domain/error";
import {
    createTag,
    findTags,
    findTag,
    deleteTag,
    updateTagLabel,
    updateTagParent,
    updateTagRef
} from "./service";

const router = Router();

router.post("/api/tags", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const payload: CreateTagPayload = request.body.data;
        if (!payload) throw new InvalidInputError('data');
        const data = await createTag(payload);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.get("/api/tags", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let offset;
        let limit;
        if (request.query.offset) offset = +request.query.offset;
        if (request.query.limit) limit = +request.query.limit;
        const data = await findTags({}, offset, limit);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.get("/api/tags/:name", async (request: Request, response: Response, next: NextFunction) => {
    try {
        if (!request.params.name) throw new InvalidInputError("param:name");
        const data = await findTag({ name: request.params.name });
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.put("/api/tags/:name", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const name: string = request.params.name;
        if (!name) throw new InvalidInputError("name");
        if (request.query.label) await updateTagLabel({ name }, request.query.label.toString());
        if (request.query.parent) await updateTagParent({ name }, request.query.parent.toString());
        if (request.query.ref) await updateTagRef({ name }, request.query.ref.toString());
        response.status(200).json({ data: true });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.delete("/api/tags/:name", async (request: Request, response: Response, next: NextFunction) => {
    try {
        if (!request.params.name) throw new InvalidInputError("Id");
        const deleted = await deleteTag({ name: request.params.name });
        response.status(200).json({ data: { deleted }});
        next();
    } catch (err: any) {
        next(err);
    }
});

export default router;