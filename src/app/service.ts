import { Tag, TagModel } from "../domain/entity";
import { CreateTagPayload, TagSearchParams } from "../domain/dto";
import { InvalidOperationError, NonExistentResourceError } from "../domain/error";
import logger from "../config/logger";

/**
 * This method will create a new tag object
 * @param payload Values to initialize new tag with
 * @returns The newly created tag object
 */
export const createTag = async (payload: CreateTagPayload): Promise<Tag> => {
    const exists = await findTagExists({ name: payload.name });
    if (exists) throw new InvalidOperationError(`Tag already exists with name: ${payload.name}`);
    const parent = await TagModel.findOne({ name: payload.parent }).select('name').lean();
    if (!parent) throw new NonExistentResourceError("Tag", payload.parent);
    const tag = await TagModel.create({
        name: payload.name,
        label: payload.label,
        parent: parent.name,
        ref: payload.ref,
    });
    tag.__v = undefined;
    logger.info({
        operation: "createTag",
        payload,
        resource: `tag:${tag.name}`
    });
    return tag;
}

/**
 * Returns all existing tags
 * @param params Parameters to locate tag by
 * @param offset Number of documents to skip
 * @param limit Number of documents to return
 * @returns Array of tag objects
 */
export const findTags = async (params: TagSearchParams, offset?: number, limit?: number): Promise<Tag[]> => {
    const off = offset ?? 0;
    const lim = limit ?? 10;
    const tags = await TagModel.find(params).skip(off).limit(lim).select('-__v').lean();
    logger.info({
        operation: "findTags",
        params,
        additionalParams: { offset, limit }
    });
    return tags;
}

/**
 * Returns a single tag by its name
 * @param params Parameters to locate tag by
 * @returns Tag object if it exists
 */
export const findTag = async (params: TagSearchParams): Promise<Tag> => {
    const tag = await TagModel.findOne(params).select('-__v').lean();
    if (!tag) throw new NonExistentResourceError("tag", JSON.stringify(params));
    logger.info({
        operation: "findTag",
        params,
        resource: `tag:${tag.name}`
    });
    return tag;
}

/**
 * This method will determine if a tag exists with the matching parameters
 * @param params Parameters to locate tag by
 * @returns True if a matching tag exists, otherwise false
 */
export const findTagExists = async (params: TagSearchParams): Promise<Boolean> => {
    const tag = await TagModel.findOne(params).select('name').lean();
    if (tag == undefined) return false;
    logger.info({
        operation: "findTagExists",
        params,
        resource: `tag:${tag.name}`
    });
    return true;
}

/**
 * This method will locate the ref attribute for each tag provided
 * @param tags Array of tag names to translate into refs
 * @returns Array of objects mapping name and ref
 */
export const findTagRefs = async (tags: string[]): Promise<{ name: string, ref: string }[]> => {
    const refs = await TagModel.find({ 'name': { $in: tags }}).select('name ref').lean();
    logger.info({
        operation: "findTagRefs",
        additionalParams: { tags }
    });
    return refs;
}

/**
 * This method will return the number of tags stored in the database
 * @returns Number of existing tags
 */
export const findTagCount = async (): Promise<Number> => {
    const count = await TagModel.countDocuments();
    logger.info({
        operation: "findTagCount",
    });
    return count;
}

/**
 * This method will update the label of the specified tag
 * @param params Parameters to locate tag by
 * @param label New label for tag
 * @returns True if update was successful, otherwise false
 */
export const updateTagLabel = async (params: TagSearchParams, label: string): Promise<Boolean> => {
    const tag = await TagModel.findOne(params).select('name label dateModified');
    if (!tag) throw new NonExistentResourceError("Tag", JSON.stringify(params));
    tag.label = label;
    tag.dateModified = new Date(Date.now());
    await tag.save();
    logger.info({
        operation: "updateTagLabel",
        params,
        additionalParams: { label },
        resource: `tag:${tag.name}`
    });
    return true;
}

/**
 * This method will update the parent attribute of the specified tag
 * @param params Parameters to locate tag by
 * @param parent New parent for tag
 * @returns True if update was successful, otherwise false
 */
export const updateTagParent = async (params: TagSearchParams, parent: string): Promise<Boolean> => {
    const tag = await TagModel.findOne(params).select('name parent dateModified');
    if (!tag) throw new NonExistentResourceError("Tag", JSON.stringify(params));
    tag.parent = parent;
    tag.dateModified = new Date(Date.now());
    await tag.save();
    logger.info({
        operation: "updateTagParent",
        params,
        additionalParams: { parent },
        resource: `tag:${tag.name}`
    });
    return true;
}

/**
 * This method will update the ref attribute of the specified tag
 * @param params Parameters to locate tag by
 * @param ref New ref for tag
 * @returns True if update was successful, otherwise false
 */
export const updateTagRef = async (params: TagSearchParams, ref: string): Promise<Boolean> => {
    const tag = await TagModel.findOne(params).select('name ref dateModified');
    if (!tag) throw new NonExistentResourceError("Tag", JSON.stringify(params));
    tag.ref = ref;
    tag.dateModified = new Date(Date.now());
    await tag.save();
    logger.info({
        operation: "updateTagRef",
        params,
        additionalParams: { ref },
        resource: `tag:${tag.name}`
    });
    return true;
}

/**
 * Delete a single tag by its identifier
 * @param params Parameters to locate tag by
 * @returns True if the deletion was successful, otherwise false
 */
export const deleteTag = async (params: TagSearchParams): Promise<Boolean> => {
    const tag = await TagModel.findOne(params).select('name');
    if (!tag) throw new NonExistentResourceError("tag", JSON.stringify(params));
    await tag.deleteOne();
    logger.info({
        operation: "deleteTag",
        params,
        resource: `tag:${tag.name}`
    });
    return true;
}
