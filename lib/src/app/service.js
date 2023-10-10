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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.updateTagRef = exports.updateTagParent = exports.updateTagLabel = exports.findTagCount = exports.findTagRefs = exports.findTagExists = exports.findTag = exports.findTags = exports.createTag = void 0;
const entity_1 = require("../domain/entity");
const error_1 = require("../domain/error");
const logger_1 = __importDefault(require("../config/logger"));
/**
 * This method will create a new tag object
 * @param payload Values to initialize new tag with
 * @returns The newly created tag object
 */
const createTag = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield (0, exports.findTagExists)({ name: payload.name });
    if (exists)
        throw new error_1.InvalidOperationError(`Tag already exists with name: ${payload.name}`);
    const parent = yield entity_1.TagModel.findOne({ name: payload.parent }).select('name').lean();
    if (!parent)
        throw new error_1.NonExistentResourceError("Tag", payload.parent);
    const tag = yield entity_1.TagModel.create({
        name: payload.name,
        label: payload.label,
        parent: parent.name,
        ref: payload.ref,
    });
    tag.__v = undefined;
    logger_1.default.info({
        operation: "createTag",
        payload,
        resource: `tag:${tag.name}`
    });
    return tag;
});
exports.createTag = createTag;
/**
 * Returns all existing tags
 * @param params Parameters to locate tag by
 * @param offset Number of documents to skip
 * @param limit Number of documents to return
 * @returns Array of tag objects
 */
const findTags = (params, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const off = offset !== null && offset !== void 0 ? offset : 0;
    const lim = limit !== null && limit !== void 0 ? limit : 10;
    const tags = yield entity_1.TagModel.find(params).skip(off).limit(lim).select('-__v').lean();
    logger_1.default.info({
        operation: "findTags",
        params,
        additionalParams: { offset, limit }
    });
    return tags;
});
exports.findTags = findTags;
/**
 * Returns a single tag by its name
 * @param params Parameters to locate tag by
 * @returns Tag object if it exists
 */
const findTag = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const tag = yield entity_1.TagModel.findOne(params).select('-__v').lean();
    if (!tag)
        throw new error_1.NonExistentResourceError("tag", JSON.stringify(params));
    logger_1.default.info({
        operation: "findTag",
        params,
        resource: `tag:${tag.name}`
    });
    return tag;
});
exports.findTag = findTag;
/**
 * This method will determine if a tag exists with the matching parameters
 * @param params Parameters to locate tag by
 * @returns True if a matching tag exists, otherwise false
 */
const findTagExists = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const tag = yield entity_1.TagModel.findOne(params).select('name').lean();
    if (tag == undefined)
        return false;
    logger_1.default.info({
        operation: "findTagExists",
        params,
        resource: `tag:${tag.name}`
    });
    return true;
});
exports.findTagExists = findTagExists;
/**
 * This method will locate the ref attribute for each tag provided
 * @param tags Array of tag names to translate into refs
 * @returns Array of objects mapping name and ref
 */
const findTagRefs = (tags) => __awaiter(void 0, void 0, void 0, function* () {
    const refs = yield entity_1.TagModel.find({ 'name': { $in: tags } }).select('name ref').lean();
    logger_1.default.info({
        operation: "findTagRefs",
        additionalParams: { tags }
    });
    return refs;
});
exports.findTagRefs = findTagRefs;
/**
 * This method will return the number of tags stored in the database
 * @returns Number of existing tags
 */
const findTagCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield entity_1.TagModel.countDocuments();
    logger_1.default.info({
        operation: "findTagCount",
    });
    return count;
});
exports.findTagCount = findTagCount;
/**
 * This method will update the label of the specified tag
 * @param params Parameters to locate tag by
 * @param label New label for tag
 * @returns True if update was successful, otherwise false
 */
const updateTagLabel = (params, label) => __awaiter(void 0, void 0, void 0, function* () {
    const tag = yield entity_1.TagModel.findOne(params).select('name label dateModified');
    if (!tag)
        throw new error_1.NonExistentResourceError("Tag", JSON.stringify(params));
    tag.label = label;
    tag.dateModified = new Date(Date.now());
    yield tag.save();
    logger_1.default.info({
        operation: "updateTagLabel",
        params,
        additionalParams: { label },
        resource: `tag:${tag.name}`
    });
    return true;
});
exports.updateTagLabel = updateTagLabel;
/**
 * This method will update the parent attribute of the specified tag
 * @param params Parameters to locate tag by
 * @param parent New parent for tag
 * @returns True if update was successful, otherwise false
 */
const updateTagParent = (params, parent) => __awaiter(void 0, void 0, void 0, function* () {
    const tag = yield entity_1.TagModel.findOne(params).select('name parent dateModified');
    if (!tag)
        throw new error_1.NonExistentResourceError("Tag", JSON.stringify(params));
    tag.parent = parent;
    tag.dateModified = new Date(Date.now());
    yield tag.save();
    logger_1.default.info({
        operation: "updateTagParent",
        params,
        additionalParams: { parent },
        resource: `tag:${tag.name}`
    });
    return true;
});
exports.updateTagParent = updateTagParent;
/**
 * This method will update the ref attribute of the specified tag
 * @param params Parameters to locate tag by
 * @param ref New ref for tag
 * @returns True if update was successful, otherwise false
 */
const updateTagRef = (params, ref) => __awaiter(void 0, void 0, void 0, function* () {
    const tag = yield entity_1.TagModel.findOne(params).select('name ref dateModified');
    if (!tag)
        throw new error_1.NonExistentResourceError("Tag", JSON.stringify(params));
    tag.ref = ref;
    tag.dateModified = new Date(Date.now());
    yield tag.save();
    logger_1.default.info({
        operation: "updateTagRef",
        params,
        additionalParams: { ref },
        resource: `tag:${tag.name}`
    });
    return true;
});
exports.updateTagRef = updateTagRef;
/**
 * Delete a single tag by its identifier
 * @param params Parameters to locate tag by
 * @returns True if the deletion was successful, otherwise false
 */
const deleteTag = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const tag = yield entity_1.TagModel.findOne(params).select('name');
    if (!tag)
        throw new error_1.NonExistentResourceError("tag", JSON.stringify(params));
    yield tag.deleteOne();
    logger_1.default.info({
        operation: "deleteTag",
        params,
        resource: `tag:${tag.name}`
    });
    return true;
});
exports.deleteTag = deleteTag;
